import { useState, useContext } from "react";
import { Edit, User, Mail, Award } from "lucide-react";
import Navbar from "../components/navbar";
import { UserContext } from "../context/userContext";
import { formatName } from "../utils/formatname";

const ProfilePage = () => {
  const { setUser, user, logout } = useContext(UserContext);
  console.log("🧠 Current user from context:", user);
  const [us] = useState({
    name: "Vishu Hajela",
    username: "vishu123",
    email: "vishu@example.com",
    bio: "Loves solving DSA problems and building cool projects",
    skills: ["C++", "DSA", "React"],
    joined: "April 2025",
    solved: 250,
    contests: 14,
  });

  const [showModal, setShowModal] = useState(false);
  const [instituteCode, setInstituteCode] = useState("");

  const handleApply = async () => {
    if (!instituteCode.trim()) {
      alert("Please enter your institute code.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/teach/apply-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instituteCode, userId: user.user_id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Request failed");
        return;
      }
      const updatedUser = { ...user, role: "teacher" };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Your account has been upgraded to teacher!");
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    } finally {
      setShowModal(false);
      setInstituteCode("");
    }
  };

  return (
    <div className="bg-[#0D111A] min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Profile Section */}
      <div className="p-6">
        {/* Profile Header */}
        <div className="bg-[#070B13] shadow-lg rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold">
              V
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {formatName(user.first_name, user.last_name)}
              </h1>
              <p className="text-gray-400">@{user.user_name}</p>
              <p className="text-sm text-gray-300">
                Loves solving DSA problems and building cool projects
              </p>
            </div>

            {/* Edit Button */}
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl flex items-center gap-2">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* User Info */}
          <div className="bg-[#070B13] shadow-lg rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-2">User Info</h2>
            <p className="flex items-center gap-2 text-gray-300">
              <User className="w-4 h-4" />
              {formatName(user.first_name, user.last_name)}
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
            <p className="text-gray-400 text-sm">Joined April 2025</p>
          </div>

          {/* Stats */}
          <div className="bg-[#070B13] shadow-lg rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-2">Stats</h2>
            <p className="flex items-center gap-2 text-gray-300">
              <Award className="w-4 h-4" /> Problems Solved:{" "}
              <span className="font-semibold">250</span>
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              🏆 Contests Participated:{" "}
              <span className="font-semibold">{user.role}</span>
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-[#070B13] shadow-lg rounded-2xl mt-6 p-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {us.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-600 px-4 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        {/* Footer */}
        <footer className="bg-[#070B13] shadow-inner w-full px-8 py-4 flex justify-between items-center fixed bottom-0 left-0 z-40">
          <button
            onClick={() => {
              if (user.role !== "teacher") setShowModal(true);
            }}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition
  ${
    user.role === "teacher"
      ? "bg-gray-600 text-gray-300 cursor-default"
      : "bg-green-600 hover:bg-green-700"
  }`}
          >
            {user.role === "teacher" ? "You are a Teacher" : "Apply as Teacher"}
          </button>

          <button
            onClick={() => logout()}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-sm font-medium"
          >
            Logout
          </button>
        </footer>

        {/* Apply as Teacher Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-[#070B13] rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-4 text-center">
                Apply as Teacher
              </h2>
              <p className="text-gray-400 text-sm mb-4 text-center">
                Enter your institute’s unique code to verify your teacher
                status.
              </p>

              <input
                type="text"
                placeholder="Enter Institute Code"
                value={instituteCode}
                onChange={(e) => setInstituteCode(e.target.value)}
                className="w-full bg-[#0D111A] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
