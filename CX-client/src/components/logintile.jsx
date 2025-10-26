import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState} from "react";
import { useAuth } from "../context/authContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

const LoginTile = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthType } = useAuth();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const res = await fetch("http://localhost:4000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log("Google Login Response:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/"); // redirect to dashboard
        setAuthType("none");
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } else {
        alert(data.message || "Login failed ❌");
      }
    } catch (err) {
      console.error("Google login error:", err);
      alert("Something went wrong with Google login.");
    }
  };

  const handleEmailChange = (e) => {
    let value = e.target.value.replace("@juetguna.in", ""); // Prevent duplicate domain
    setEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullEmail = email + "@juetguna.in";
    console.log("Logging in with:", fullEmail);
    // Add your login logic here
  };

  return (
    <div
      className="relative z-10 p-8 rounded-2xl  max-w-md w-full 
      bg-gradient-to-br from-[#0D111A]/80 to-[#070B13]/80 
      backdrop-blur-lg border border-cyan-500/30
      shadow-[0_0_20px_rgba(0,255,255,0.2)]"
    >
      {/* Glowing Codexa Title */}
      <h1 className="text-5xl font-bold text-center mb-10 mt-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]">
        codeXa
      </h1>

      {/* ✅ Google Sign-In Button */}
      {/* <GoogleOAuthProvider clientId="129972455963-ha4nbotvupuvbpiegksn9j9gondvpfgo.apps.googleusercontent.com">
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Sign-In failed")}
          />
        </div>
      </GoogleOAuthProvider> */}

      {/* Login Form (manual) */}
      <form onSubmit={handleSubmit} className="space-y-5">
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

        {/* Password with Eye Toggle */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
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

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 
            text-black font-semibold transition-all duration-200
            shadow-[0_0_10px_rgba(0,255,255,0.5)] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
        >
          Sign In
        </button>
      </form>
      
      {/* Forgot / Sign Up */}
      <div className="flex justify-between mt-4 text-sm">
        <a href="#" className="text-cyan-400 hover:underline">
          Forgot Password?
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setAuthType("signup");
          }}
          className="text-cyan-400 hover:underline"
        >
          Sign Up
        </a>
      </div>
      <GoogleOAuthProvider clientId="129972455963-ha4nbotvupuvbpiegksn9j9gondvpfgo.apps.googleusercontent.com">
        <div className="flex justify-center m-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Sign-In failed")}
            theme="filled_black"
            size="large"
            shape="pill"
            width="100%"
          />
        </div>
      </GoogleOAuthProvider>

    </div>
  );
};

export default LoginTile;