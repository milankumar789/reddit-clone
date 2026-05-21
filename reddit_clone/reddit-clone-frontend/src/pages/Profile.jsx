import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

export default function Profile() {

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchMyPosts();

  }, []);

  const fetchMyPosts = async () => {

    try {

      const res = await API.get("/posts");

      // hardcoded current user id = 1
      const myPosts = res.data.filter(
        (post) => post.author?.id === 1
      );

      setPosts(myPosts.reverse());

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="text-3xl font-black text-orange-500">
          Loading Profile...
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* COVER */}

        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-52 rounded-3xl shadow-xl"></div>

        {/* PROFILE CARD */}

        <div className="bg-white rounded-3xl shadow-sm border p-8 -mt-20 relative">

          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {/* AVATAR */}

            <div className="w-32 h-32 rounded-full bg-orange-500 border-8 border-white flex items-center justify-center text-white text-5xl font-black shadow-lg">

              M

            </div>

            {/* USER INFO */}

            <div className="flex-1">

              <h1 className="text-4xl font-black">
                MILAN KUMAR
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Full Stack Developer
              </p>

              <p className="text-gray-600 mt-4 leading-7 max-w-2xl">
                Building modern full-stack applications using
                Java Spring Boot, React, PostgreSQL,
                JWT Authentication, and Tailwind CSS.
              </p>

              <div className="flex gap-8 mt-6">

                <div>

                  <h2 className="text-3xl font-black text-orange-500">
                    {posts.length}
                  </h2>

                  <p className="text-gray-500">
                    Posts
                  </p>

                </div>

                <div>

                  <h2 className="text-3xl font-black text-blue-500">
                    12
                  </h2>

                  <p className="text-gray-500">
                    Communities
                  </p>

                </div>

                

              </div>

            </div>

          </div>

        </div>

        {/* POSTS */}

        <div className="mt-8 space-y-5">

          <h2 className="text-3xl font-black">
            My Posts
          </h2>

          {posts.length === 0 && (

            <div className="bg-white rounded-2xl p-10 border text-center">

              <h2 className="text-2xl font-black text-gray-700">
                No Posts Yet
              </h2>

            </div>

          )}

          {posts.map((post) => (

            <div
              key={post.id}
              className="bg-white rounded-2xl border shadow-sm p-6"
            >

              <div className="flex items-center gap-3 mb-4">

                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">

                  r/{post.community?.name || "Community"}

                </span>

                <span className="text-gray-400 text-sm">

                  {new Date(post.createdAt).toLocaleDateString()}

                </span>

              </div>

              <h2 className="text-3xl font-black">
                {post.title}
              </h2>

              <p className="mt-4 text-gray-700 leading-7">
                {post.content}
              </p>

              {post.imageUrl && (

                <img
                  src={post.imageUrl}
                  alt=""
                  className="w-full rounded-2xl mt-5 max-h-[500px] object-cover"
                />

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}