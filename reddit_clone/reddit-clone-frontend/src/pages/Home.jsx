import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";

import toast from "react-hot-toast";

export default function Home() {

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [communities, setCommunities] = useState([]);

  const [form, setForm] = useState({
    title: "",
    content: "",
    imageUrl: "",
    communityId: null,
  });

  useEffect(() => {

    fetchPosts();

    fetchCommunities();

  }, []);

  const fetchPosts = async () => {

    try {

      setLoading(true);

      const res = await API.get("/posts");

      setPosts(res.data.reverse());

    } catch (err) {

      console.log(err);

      toast.error("Failed to load posts");

    } finally {

      setLoading(false);
    }
  };

  const fetchCommunities = async () => {

    try {

      const res = await API.get("/communities");

      setCommunities(res.data);

      if (res.data.length > 0) {

        setForm((prev) => ({
          ...prev,
          communityId: res.data[0].id,
        }));
      }

    } catch (err) {

      console.log(err);

      toast.error("Failed to load communities");
    }
  };

  const createPost = async () => {

    if (!form.title || !form.content) {

      toast.error("Please fill all fields");

      return;
    }

    if (!form.communityId) {

      toast.error("Please select community");

      return;
    }

    try {

      await API.post("/posts", {
        title: form.title,
        content: form.content,
        imageUrl: form.imageUrl,
        communityId: Number(form.communityId),
        userId: 1,
      });

      toast.success("Post created");

      setForm({
        title: "",
        content: "",
        imageUrl: "",
        communityId: form.communityId,
      });

      fetchPosts();

    } catch (err) {

      console.log(err);

      toast.error("Failed to create post");
    }
  };

  const filteredPosts = posts.filter((post) => {

    const query = search.toLowerCase();

    return (
      post.title?.toLowerCase().includes(query) ||
      post.content?.toLowerCase().includes(query) ||
      post.community?.name?.toLowerCase().includes(query)
    );
  });

  if (loading) {

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

        <div className="w-20 h-20 border-8 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>

        <h2 className="text-3xl font-black text-orange-500 mt-8">
          Reddit Clone
        </h2>

        <p className="text-gray-500 mt-3">
          Loading your community...
        </p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 py-6">

        <div className="lg:col-span-2 space-y-5">

          {/* HERO */}

          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-xl">

            <h1 className="text-5xl font-black leading-tight">
              Welcome to Reddit Clone
            </h1>

            <p className="mt-4 text-lg text-orange-100 max-w-2xl leading-8">
              A modern full-stack social media platform built using
              Java Spring Boot, PostgreSQL, React, JWT authentication,
              and Tailwind CSS.
            </p>

            <div className="flex gap-4 mt-6 flex-wrap">

              <div className="bg-white/20 backdrop-blur px-5 py-3 rounded-2xl">
               Full Stack
              </div>

              <div className="bg-white/20 backdrop-blur px-5 py-3 rounded-2xl">
               JWT Auth
              </div>

              <div className="bg-white/20 backdrop-blur px-5 py-3 rounded-2xl">
               React + Spring Boot
              </div>

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-white rounded-2xl shadow-sm border p-6">

              <h2 className="text-gray-500 font-semibold">
                Total Posts
              </h2>

              <p className="text-4xl font-black mt-3 text-orange-500">
                {posts.length}
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">

              <h2 className="text-gray-500 font-semibold">
                Communities
              </h2>

              <p className="text-4xl font-black mt-3 text-blue-500">
                {communities.length}
              </p>

            </div>

            

          </div>

          {/* CREATE POST */}

          <div className="bg-white rounded-2xl border shadow-sm p-5">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-3xl font-black">
                  Create Post
                </h2>

                <p className="text-gray-500 mt-1">
                  Share your thoughts with the community
                </p>

              </div>

              

            </div>

            {/* COMMUNITY */}

            <select
              className="w-full border rounded-2xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={form.communityId || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  communityId: Number(e.target.value),
                })
              }
            >

              {communities.map((community) => (

                <option
                  key={community.id}
                  value={community.id}
                >
                  {community.name}
                </option>

              ))}

            </select>

            {/* TITLE */}

            <input
              id="create-post"
              className="w-full border rounded-2xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Post title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            {/* IMAGE URL */}

            <input
              className="w-full border rounded-2xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Paste image URL (optional)"
              value={form.imageUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  imageUrl: e.target.value,
                })
              }
            />

            {/* CONTENT */}

            <textarea
              className="w-full border rounded-2xl p-4 mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="What's on your mind?"
              value={form.content}
              onChange={(e) =>
                setForm({
                  ...form,
                  content: e.target.value,
                })
              }
            />

            {/* PREVIEW IMAGE */}

            {form.imageUrl && (

              <img
                src={form.imageUrl}
                alt=""
                className="w-full rounded-2xl mb-4 max-h-[400px] object-cover"
              />

            )}

            <button
              onClick={createPost}
              className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-2xl font-black"
            >
              Create Post
            </button>

          </div>

          {/* EMPTY STATE */}

          {filteredPosts.length === 0 && (

            <div className="bg-white rounded-2xl border shadow-sm p-10 text-center">

              <h2 className="text-2xl font-black text-gray-700">
                No Posts Found
              </h2>

              <p className="text-gray-500 mt-3">
                Be the first to create a post.
              </p>

            </div>

          )}

          {/* POSTS */}

          <div className="space-y-5">

            {filteredPosts.map((post) => (

              <PostCard
                key={post.id}
                post={post}
                fetchPosts={fetchPosts}
              />

            ))}

          </div>

        </div>

        {/* SIDEBAR */}

        <div>

          <Sidebar
            setSearch={setSearch}
            communities={communities}
            setCommunities={setCommunities}
          />

        </div>

      </div>

      {/* FLOATING BUTTON */}

      <button
        onClick={() => {
          document
            .getElementById("create-post")
            ?.scrollIntoView({
              behavior: "smooth",
            });
        }}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white w-16 h-16 rounded-full shadow-2xl text-3xl font-black"
      >
        +
      </button>

    </div>
  );
}