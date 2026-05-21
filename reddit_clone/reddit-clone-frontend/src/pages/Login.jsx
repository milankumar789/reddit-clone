import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FaRedditAlien } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {

    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful");

      navigate("/");

    } catch {

      toast.error("Invalid credentials");

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
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-3">
            Login to continue
          </p>

        </div>

        <div className="space-y-4">

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
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        <p className="text-center mt-6 text-gray-600">

          Don't have an account?

          <Link
            to="/signup"
            className="text-orange-500 font-bold ml-2"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}