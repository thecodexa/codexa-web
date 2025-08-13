import React, { useState } from "react";
import Navbar from "../components/navbar";

const data = {
  ongoing: [
    {
      id: 1,
      title: "Weekly Coding Challenge",
      date: "Aug 15, 2025 08:00",
      action: "Join Now",
    },
    {
      id: 2,
      title: "DSA Hour Sprint",
      date: "Aug 16, 2025 18:00",
      action: "Join Now",
    },
    {
      id: 3,
      title: "Quick Algo Warmup",
      date: "Aug 16, 2025 20:00",
      action: "Join Now",
    },
    {
      id: 12,
      title: "Quick Algo Warmup",
      date: "Aug 16, 2025 20:00",
      action: "Join Now",
    },
    {
      id: 13,
      title: "Quick Algo Warmup",
      date: "Aug 16, 2025 20:00",
      action: "Join Now",
    },
  ],
  upcoming: [
    {
      id: 4,
      title: "Data Structures Quiz",
      date: "Aug 20, 2025 08:00",
      action: "Register",
    },
    {
      id: 5,
      title: "Algorithm Design Contest",
      date: "Aug 27, 2025 08:00",
      action: "Register",
    },
    {
      id: 6,
      title: "Frontend Mini-Challenge",
      date: "Sep 02, 2025 19:00",
      action: "Register",
    },
  ],
  past: [
    {
      id: 7,
      title: "Weekly Contest 459",
      date: "Jul 20, 2025 08:00",
      action: "View Results",
    },
    {
      id: 8,
      title: "Biweekly Contest 161",
      date: "Jul 19, 2025 20:00",
      action: "View Results",
    },
  ],
};

const leaderboard = [
  { id: 1, name: "Cracker Man", points: 1200, attended: 26 },
  { id: 2, name: "Tanmay", points: 1100, attended: 20 },
  { id: 3, name: "Shailu", points: 980, attended: 18 },
  { id: 4, name: "Ayushmaan", points: 920, attended: 15 },
  { id: 5, name: "Aravind", points: 890, attended: 14 },
  { id: 6, name: "Kusu", points: 860, attended: 12 },
];

export default function ContestsPage() {
  const [tab, setTab] = useState("ongoing");

  return (
    <div className="fixed w-screen h-screen bg-[#0D111A] p-5 text-white">
      <div className="h-full w-full bg-[#070B13] rounded-lg shadow-lg flex flex-col">
        <Navbar />
        <div className="w-3/4 p-6">
          <h1 className="text-5xl font-semibold pl-4">Contests</h1>

          <div className="flex gap-3 mt-4 mb-2 p-4">
            {["ongoing", "upcoming", "past"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-8 py-2 rounded-md font-medium transition ${
                  tab === t
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto pl-6 pb-6 w-3/4 [scrollbar-gutter:stable]">
          <div className="space-y-4 pr-3">
            {data[tab].map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between bg-gray-900 rounded-xl p-4 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-10 bg-gradient-to-tr from-[#0b1220] to-[#0f172a] rounded-md flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 6v6l4 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <p className="text-sm text-gray-400">{c.date}</p>
                  </div>
                </div>

                <div>
                  {c.action === "Join Now" && (
                    <button className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 font-medium">
                      {c.action}
                    </button>
                  )}
                  {c.action === "Register" && (
                    <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 font-medium">
                      {c.action}
                    </button>
                  )}
                  {c.action === "View Results" && (
                    <button className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 font-medium">
                      {c.action}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="h-6" />
          </div>
        </div>
      </div>
    </div>

    //  <div className="h-screen flex flex-col bg-[#0f172a] text-white">
    //    <Navbar />

    //    <div className="flex-1 flex overflow-hidden">
    //      {/* Left: Contests (3/4) */}
    //      <div className="w-3/4 p-6 flex flex-col">
    //        {/* Page header (subtle, aligned left) */}
    //        <h1 className="text-3xl font-semibold mb-4">Contests</h1>

    //        {/* Tabs */}
    //        <div className="flex gap-3 mb-4">
    //          {["ongoing", "upcoming", "past"].map((t) => (
    //            <button
    //              key={t}
    //              onClick={() => setTab(t)}
    //              className={`px-4 py-2 rounded-md font-medium transition ${
    //                tab === t
    //                  ? "bg-blue-600 text-white"
    //                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
    //              }`}
    //            >
    //              {t.charAt(0).toUpperCase() + t.slice(1)}
    //            </button>
    //          ))}
    //        </div>

    //        {/* Scrollable list area */}
    //        <div className="flex-1 overflow-y-auto space-y-4 pr-3">
    //          {data[tab].map((c) => (
    //            <div
    //              key={c.id}
    //              className="flex items-center justify-between bg-gray-900 rounded-xl p-4 shadow-sm hover:shadow-lg transition"
    //            >
    //              <div className="flex items-center gap-4">
    //                {/* optional small icon block to match your theme */}
    //                <div className="w-14 h-10 bg-gradient-to-tr from-[#0b1220] to-[#0f172a] rounded-md flex items-center justify-center">
    //                  <svg
    //                    className="w-6 h-6 text-gray-400"
    //                    fill="none"
    //                    stroke="currentColor"
    //                    viewBox="0 0 24 24"
    //                  >
    //                    <path
    //                      strokeLinecap="round"
    //                      strokeLinejoin="round"
    //                      strokeWidth="1.5"
    //                      d="M12 6v6l4 2"
    //                    />
    //                  </svg>
    //                </div>

    //                <div>
    //                  <h3 className="text-lg font-semibold">{c.title}</h3>
    //                  <p className="text-sm text-gray-400">{c.date}</p>
    //                </div>
    //              </div>

    //              <div>
    //                {c.action === "Join Now" && (
    //                  <button className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 font-medium">
    //                    {c.action}
    //                  </button>
    //                )}
    //                {c.action === "Register" && (
    //                  <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 font-medium">
    //                    {c.action}
    //                  </button>
    //                )}
    //                {c.action === "View Results" && (
    //                  <button className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 font-medium">
    //                    {c.action}
    //                  </button>
    //                )}
    //              </div>
    //            </div>
    //          ))}

    //          {/* optional: keep a bottom spacer so last item isn't flush to edge */}
    //          <div className="h-6" />
    //        </div>
    //      </div>

    //      {/* Right: Leaderboard (1/4) - fixed in place while left scrolls */}
    //      <aside className="w-1/4 bg-gray-900 p-6 flex flex-col">
    //        <h2 className="text-xl font-bold mb-4">Leaderboard</h2>

    //        {/* leaderboard list scrolls independently */}
    //        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
    //          {leaderboard.map((p, i) => (
    //            <div
    //              key={p.id}
    //              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
    //            >
    //              <div className="flex items-center gap-3">
    //                <div className="text-lg font-semibold w-6">{i + 1}</div>
    //                <div className="font-medium">{p.name}</div>
    //              </div>
    //              <div className="text-sm text-gray-300">{p.points} pts</div>
    //            </div>
    //          ))}
    //        </div>
    //      </aside>
    //    </div>
    //  </div>
  );
}
