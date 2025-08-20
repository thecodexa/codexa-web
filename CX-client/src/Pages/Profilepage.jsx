import { useState } from "react";
import { Edit, User, Mail, Award } from "lucide-react";

const ProfilePage = () => {
  const [user] = useState({
    name: "Vishu Hajela",
    username: "vishu123",
    email: "vishu@example.com",
    bio: "Loves solving DSA problems and building cool projects",
    skills: ["C++", "DSA", "React"],
    joined: "April 2025",
    solved: 250,
    contests: 14,
  });

  return (
    <div className="bg-[#0D111A] min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex sticky top-0 z-50 justify-between items-center p-6 bg-[#070B13] shadow-md">
        <h1 className="text-white text-2xl font-bold">codeXa</h1>
      </nav>

      {/* Profile Section */}
      <div className="p-6">
        {/* Profile Header */}
        <div className="bg-[#070B13] shadow-lg rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold">
              {user.name[0]}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-400">@{user.username}</p>
              <p className="text-sm text-gray-300">{user.bio}</p>
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
              <User className="w-4 h-4" /> {user.name}
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
            <p className="text-gray-400 text-sm">Joined {user.joined}</p>
          </div>

          {/* Stats */}
          <div className="bg-[#070B13] shadow-lg rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-2">Stats</h2>
            <p className="flex items-center gap-2 text-gray-300">
              <Award className="w-4 h-4" /> Problems Solved:{" "}
              <span className="font-semibold">{user.solved}</span>
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              🏆 Contests Participated:{" "}
              <span className="font-semibold">{user.contests}</span>
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-[#070B13] shadow-lg rounded-2xl mt-6 p-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {user.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-600 px-4 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
