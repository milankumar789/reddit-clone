import { Link, useNavigate } from "react-router-dom";

import {
  FaRedditAlien,
  FaSearch,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useEffect, useState } from "react";

export default function Navbar({
  search,
  setSearch,
}) {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add("dark");

    } else {

      document.documentElement.classList.remove("dark");
    }

  }, [darkMode]);

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-b dark:border-slate-700 sticky top-0 z-50 shadow-sm">

      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">

        <Link
          to="/"
          className="flex items-center gap-2"
        >
        
        
          <FaRedditAlien
            size={34}
            className="text-orange-500"
          />

          <span className="text-2xl font-black text-gray-800 dark:text-white">
            Reddit Clone
          </span>

        </Link>

        <div className="hidden md:flex items-center bg-gray-100 dark:bg-slate-800 px-4 py-2 rounded-full w-[350px]">

          <FaSearch className="text-gray-400" />

          <input
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="bg-transparent outline-none ml-3 w-full dark:text-white"
  placeholder="Search posts..."
/>

        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-gray-100 dark:bg-slate-800 dark:text-white"
          >

            {darkMode ? <FaSun /> : <FaMoon />}

          </button>

          <Link
  to="/profile"
  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-bold"
>
  Profile
</Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </div>
  );
}