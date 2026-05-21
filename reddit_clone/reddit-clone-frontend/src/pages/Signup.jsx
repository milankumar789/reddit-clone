import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FaRedditAlien } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Signup() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {

    if (!form.username || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);

      toast.success("Account created");

      navigate("/");

    } catch {

      toast.error("Signup failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200 px-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 border">

        <div className="flex flex-col items-center mb-8">

          <FaRedditAlien
            size={70}
            className="text-orange-500"
          />

          <h1 className="text-4xl font-black mt-4 text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-3">
            Join the community
          </p>

        </div>

        <div className="space-y-4">

          <input
            className="w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            className="w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            disabled={loading}
            onClick={handleSignup}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </div>

        <p className="text-center mt-6 text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="text-orange-500 font-bold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}