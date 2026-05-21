import toast from "react-hot-toast";
import { useState } from "react";
import API from "../services/api";

export default function Sidebar({
  setSearch,
  communities,
  setCommunities,
}) {
  const [showModal, setShowModal] = useState(false);
  const [communityName, setCommunityName] = useState("");

  const followTopic = (topic) => {
    toast.success(`Following ${topic}`);
  };

  const openCommunity = (communityName) => {
    setSearch(communityName);
    toast.success(`Opened r/${communityName}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const createCommunity = async () => {
    if (!communityName) {
      toast.error("Enter community name");
      return;
    }

    try {
      // generate slug from name
      const slug = communityName.toLowerCase().replaceAll(" ", "-");

      const res = await API.post("/communities", {
        name: communityName,
        slug: slug,
        description: `${communityName} community`,
      });

      // add new community to state
      setCommunities([...communities, res.data]);

      toast.success("Community created");
      setCommunityName("");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to create community");
    }
  };

  return (
    <div className="space-y-5">
      {/* Developer Info */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="bg-orange-500 h-20"></div>
        <div className="p-5">
          <h2 className="text-2xl font-black">Developer Community</h2>
          <p className="text-gray-600 mt-3 leading-7">
            A full-stack Reddit-style social media platform built with Java Spring Boot, PostgreSQL,
            React, JWT authentication, and Tailwind CSS.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-bold"
          >
            Create Community
          </button>
        </div>
      </div>

      {/* Technologies */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <h3 className="font-black text-xl mb-4">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {["Java", "Spring Boot", "PostgreSQL", "React", "JWT", "Tailwind"].map((tech) => (
            <span key={tech} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Communities */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <h3 className="font-black text-xl mb-5">Communities</h3>
        <div className="space-y-3">
          {communities.map((community) => (
            <button
              key={community.id}
              onClick={() => openCommunity(community.name)}
              className="w-full text-left bg-gray-100 hover:bg-orange-100 px-4 py-3 rounded-xl font-semibold transition"
            >
              r/{community.name}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <h3 className="font-black text-xl mb-5">Trending Topics</h3>
        <div className="space-y-4">
          {["Spring Boot", "React", "Java", "PostgreSQL", "JWT Authentication"].map((topic, index) => (
            <div
              key={topic}
              onClick={() => openCommunity(topic)}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition"
            >
              <div>
                <p className="text-sm text-gray-500">Trending #{index + 1}</p>
                <h4 className="font-bold">{topic}</h4>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  followTopic(topic);
                }}
                className="text-orange-500 font-bold"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Community Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-3xl font-black mb-6">Create Community</h2>
            <input
              className="w-full border rounded-2xl p-4 mb-5"
              placeholder="Community name"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={createCommunity}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-bold"
              >
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 py-3 rounded-2xl font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}