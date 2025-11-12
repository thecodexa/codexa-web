import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import React, { useContext } from "react";
import HomeLayout from "../layouts/HomeLayout";
const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const { setAuthType } = useAuth();

  return (
    <nav className="flex sticky top-0 z-50 justify-between items-center p-4 bg-[#070B13] ">
      <Link to="/home" className="text-white text-4xl font-bold">
        codeXa
      </Link>
      <div className="space-x-6 text-gray-300">
        {/* { <a href="#">Features</a>} */}
        <Link to="/contests">Contests</Link>
        <Link to="/about">About</Link>
        {user ? (
          // <div className="flex items-center space-x-4">
          //   {/* Logout Button */}
          //   <button
          //     onClick={logout}
          //     className="bg-gray-800 px-4 py-1 rounded hover:bg-cyan-500 hover:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all"
          //   >
          //     Log Out
          //   </button>
          //   {/* Profile Icon / Name */}
          //   <Link to="/profile" className="text-white">
          //     {user.first_name}
          //   </Link>
          // </div>
          <Link
            to="/profile"
            className="w-8 h-8 rounded-full bg-gray-700 inline-flex items-center justify-center text-xl font-bold"
          >
            {user.first_name?.charAt(0).toUpperCase()}
          </Link>
        ) : (
          <button
            onClick={() => setAuthType("login")}
            className="bg-gray-800 px-4 py-1 rounded hover:bg-cyan-500 hover:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
