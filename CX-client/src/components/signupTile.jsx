import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "../context/authContext";

const SignupTile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAuthType } = useAuth();

  const handleEmailChange = (e) => {
    let value = e.target.value.replace("@juetguna.in", ""); // Prevent duplicate domain
    setEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullEmail = email + "@juetguna.in";

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Signing up with:", {
      username,
      email: fullEmail,
      password,
    });

    // Add your signup logic here
  };

  return (
    <div
      className="relative z-10 p-8 rounded-2xl max-w-md w-full 
      bg-gradient-to-br from-[#0D111A]/80 to-[#070B13]/80 
      backdrop-blur-lg border border-cyan-500/30
      shadow-[0_0_20px_rgba(0,255,255,0.2)]"
    >
      {/* Glowing Codexa Title */}
      <h1 className="text-5xl font-bold text-center mb-8 mt-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">
        codeXa
      </h1>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full border border-gray-600 rounded-md px-3 py-2 
            placeholder-gray-400 text-gray-200 bg-[#0D111A]/50 
            focus:outline-none focus:ring-1 focus:ring-cyan-400"
        />

        {/* Email + Fixed Domain */}
        <div className="flex">
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="flex-1 border border-gray-600 rounded-l-md px-3 py-2 
              placeholder-gray-400 text-gray-200 bg-[#0D111A]/50 
              focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <span className="bg-[#061224]/50 border border-l-0 border-gray-600 rounded-r-md px-3 py-2 text-gray-400 text-sm">
            @juetguna.in
          </span>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-600 rounded-md px-3 py-2 pr-10 
              placeholder-gray-400 text-gray-200 bg-[#0D111A]/50
              focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeSlashIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full border border-gray-600 rounded-md px-3 py-2 pr-10 
              placeholder-gray-400 text-gray-200 bg-[#0D111A]/50
              focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeSlashIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 
            text-black font-semibold transition-all duration-200
            shadow-[0_0_10px_rgba(0,255,255,0.5)] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
        >
          Sign Up
        </button>
      </form>

      {/* Switch to Login */}
      <div className="flex justify-center mt-4 text-sm">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setAuthType("login");
          }}
          className="text-cyan-400 hover:underline"
        >
          Already have an account? Log In
        </a>
      </div>
    </div>
  );
};

export default SignupTile;
