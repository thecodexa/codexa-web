import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (e) => {
    let value = e.target.value.replace("@juetguna.in", ""); // Prevent duplicate domain
    setUsername(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = username + "@juetguna.in";
    console.log("Logging in with:", email);
    // Add your login logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D111A]">
      <div className="bg-[#070B13] shadow-md rounded-xl p-8  w-full max-w-md">
        {/* Placeholder Logo */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center">
            codeXa
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email with fixed domain */}
          <div className="flex">
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              className="flex-1 border border-gray-600 rounded-l-md px-3 py-2 placeholder-gray-500 text-gray-200 bg-[#0D111A] focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <span className="bg-[#061224] border border-l-0 border-gray-600 rounded-r-md px-3 py-2 text-gray-500 text-sm">
              @juetguna.in
            </span>
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-600 rounded-md px-3 py-2 pr-10 placeholder-gray-500 text-gray-200 bg-[#0D111A] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye Open Icon
                <EyeIcon className="h-5 w-5" />
              ) : (
                // Eye Closed Icon
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-gray-700 text-gray-200 py-2 rounded-md hover:bg-gray-600 transition-colors duration-150"
          >
            Sign In
          </button>
        </form>

        {/* Forgot / Signup */}
        <div className="flex justify-between mt-4 text-sm">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
          <a href="#" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};
export default Login;
