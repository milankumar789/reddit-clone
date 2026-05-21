import { useEffect, useState } from "react";
import API from "../services/api";
import { getCurrentUser } from "../services/auth";

import {
  FaArrowUp,
FaArrowDown,
FaCommentAlt,
FaUserCircle,
FaEdit,
FaTrash,
FaHeart,
FaReply,
FaSave,
} from "react-icons/fa";

import { formatDistanceToNow } from "date-fns";

import toast from "react-hot-toast";

export default function PostCard({ post, fetchPosts }) {

  const user = getCurrentUser();

  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");

  const [editingPost, setEditingPost] = useState(false);

const [editedTitle, setEditedTitle] = useState(post.title);

const [editedContent, setEditedContent] = useState(post.content);

const [editingCommentId, setEditingCommentId] = useState(null);

const [editedComment, setEditedComment] = useState("");

const [likedComments, setLikedComments] = useState([]);

const [replyingTo, setReplyingTo] = useState(null);

const [replyText, setReplyText] = useState("");

const deletePost = async () => {

  if (!window.confirm("Delete this post?")) {
    return;
  }

  await API.delete(`/posts/${post.id}`);

  toast.success("Post deleted");

  fetchPosts();
};

const updatePost = async () => {

  await API.put(`/posts/${post.id}`, {
    ...post,
    title: editedTitle,
    content: editedContent,
  });

  toast.success("Post updated");

  setEditingPost(false);

  fetchPosts();
};

const deleteComment = async (id) => {

  await API.delete(`/comments/${id}`);

  toast.success("Comment deleted");

  fetchComments();
};

const updateComment = async (id) => {

  await API.put(`/comments/${id}`, {
    content: editedComment,
  });

  toast.success("Comment updated");

  setEditingCommentId(null);

  fetchComments();
};

const likeComment = (id) => {

  if (likedComments.includes(id)) {
    return;
  }

  setLikedComments([...likedComments, id]);

  toast.success("Comment liked");
};

const replyToComment = async () => {

  if (!replyText) return;

  await API.post("/comments", {
    content: `Reply: ${replyText}`,
    postId: post.id,
    userId: 1,
  });

  toast.success("Reply added");

  setReplyText("");

  setReplyingTo(null);

  fetchComments();
};



  useEffect(() => {

    fetchComments();

  }, []);

  const fetchComments = async () => {

    const res = await API.get(`/comments/post/${post.id}`);

    setComments(res.data);
  };

  const addComment = async () => {

    if (!comment) {
      toast.error("Comment cannot be empty");
      return;
    }

    await API.post("/comments", {
      content: comment,
      postId: post.id,
      userId: 1,
    });

    toast.success("Comment added");

    setComment("");

    fetchComments();
  };

  const vote = async (type) => {

    await API.post("/votes", {
      postId: post.id,
      userId: 1,
      type,
    });

    fetchPosts();
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden">

      <div className="flex">

        <div className="bg-gray-50 border-r p-4 flex flex-col items-center gap-3 min-w-[70px]">

          <button
            onClick={() => vote("UPVOTE")}
            className="text-gray-400 hover:text-orange-500"
          >
            <FaArrowUp size={22} />
          </button>

          <span className="font-black text-lg">
            {post.voteCount}
          </span>

          <button
            onClick={() => vote("DOWNVOTE")}
            className="text-gray-400 hover:text-blue-500"
          >
            <FaArrowDown size={22} />
          </button>

        </div>

        <div className="flex-1 p-5">

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">

            <img
       src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.sub || "User"}`}
       alt="avatar"
       className="w-8 h-8 rounded-full"
       />

            <span className="font-semibold">
             Posted by {user?.sub || "developer"}
            </span>

            <span>•</span>

            <span>
              {formatDistanceToNow(
                new Date(),
                { addSuffix: true }
              )}
            </span>

          </div>

          <div className="flex justify-between items-start gap-4">

  <div className="flex-1">

    {editingPost ? (

      <div className="space-y-3">

        <input
          className="w-full border rounded-xl p-3"
          value={editedTitle}
          onChange={(e) =>
            setEditedTitle(e.target.value)
          }
        />

        <textarea
          className="w-full border rounded-xl p-3 h-28"
          value={editedContent}
          onChange={(e) =>
            setEditedContent(e.target.value)
          }
        />

        <button
          onClick={updatePost}
          className="bg-green-500 text-white px-5 py-2 rounded-xl flex items-center gap-2"
        >

          <FaSave />

          Save

        </button>

      </div>

    ) : (

      <>

        <h2 className="text-2xl font-black text-gray-800">
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

      </>

    )}

  </div>

  <div className="flex gap-3">

    <button
      onClick={() => setEditingPost(true)}
      className="text-blue-500"
    >
      <FaEdit size={20} />
    </button>

    <button
      onClick={deletePost}
      className="text-red-500"
    >
      <FaTrash size={20} />
    </button>

  </div>

</div>

          <p className="mt-4 text-gray-700 leading-7">
            {post.content}
          </p>

          <div className="flex items-center gap-3 mt-6 text-gray-500">

            <FaCommentAlt />

            <span className="font-semibold">
              {comments.length} comments
            </span>

          </div>

          <div className="mt-6 border-t pt-5">

            <h3 className="font-bold text-lg mb-4">
              Discussion
            </h3>

            <div className="space-y-3 mb-5">

              {comments.map((c) => (

  <div
    key={c.id}
    className="bg-gray-50 border rounded-2xl p-4"
  >

    <div className="flex justify-between items-start">

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">

        <FaUserCircle />

        developer

      </div>

      <div className="flex gap-3">

        <button
          onClick={() => {
            setEditingCommentId(c.id);
            setEditedComment(c.content);
          }}
          className="text-blue-500"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => deleteComment(c.id)}
          className="text-red-500"
        >
          <FaTrash />
        </button>

      </div>

    </div>

    {editingCommentId === c.id ? (

      <div className="space-y-3">

        <textarea
          className="w-full border rounded-xl p-3"
          value={editedComment}
          onChange={(e) =>
            setEditedComment(e.target.value)
          }
        />

        <button
          onClick={() => updateComment(c.id)}
          className="bg-green-500 text-white px-4 py-2 rounded-xl"
        >
          Save
        </button>

      </div>

    ) : (

      <p className="text-gray-700 leading-6">
        {c.content}
      </p>

    )}

    <div className="flex gap-5 mt-4 text-sm">

      <button
        onClick={() => likeComment(c.id)}
        className="flex items-center gap-2 text-pink-500"
      >

        <FaHeart />

        {likedComments.includes(c.id)
          ? "Liked"
          : "Like"}

      </button>

      <button
        onClick={() => setReplyingTo(c.id)}
        className="flex items-center gap-2 text-blue-500"
      >

        <FaReply />

        Reply

      </button>

    </div>

    {replyingTo === c.id && (

      <div className="mt-4 flex gap-3">

        <input
          className="flex-1 border rounded-xl p-3"
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) =>
            setReplyText(e.target.value)
          }
        />

        <button
          onClick={replyToComment}
          className="bg-orange-500 text-white px-5 rounded-xl"
        >
          Reply
        </button>

      </div>

    )}

  </div>

))}

            </div>

            <div className="flex gap-3">

              <input
                className="flex-1 border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
              />

              <button
                onClick={addComment}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-2xl font-bold"
              >
                Comment
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}