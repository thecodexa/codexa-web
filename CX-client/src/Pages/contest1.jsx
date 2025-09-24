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

export default function ContestsPage1() {
  const [tab, setTab] = useState("ongoing");

  return (
    <div className="bg-[#0D111A] p-2 ">
      <div className="min-h-screen bg-[#070B13] rounded-lg shadow-black shadow-md">
        <Navbar />
        {/* page below the navbar */}
        <div className=" bg-[#070B13] px-10">
          {/* the contest image card area */}
          <div className="flex flex-col md:flex-row justify-evenly items-center p-4">
            {/* card1 */}
            <div className="bg-[#0C121E] rounded-lg shadow-lg w-full md:w-1/3 min-h-[240px] md:min-h-[280px] m-2">
              {/* image_section */}
              <div>
                <img
                  src="https://assets.leetcode.com/contest-config/contest/wc_card_img.png"
                  alt="Contest"
                  className="w-full h-auto rounded-lg "
                />
              </div>
              {/* title section */}
              <div className="flex items-center lc-md:min-h-[84px] min-h-[80px] px-4">
                Hello
              </div>
            </div>
            {/* card2 */}
            <div className="bg-[#0C121E] rounded-lg shadow-lg w-full md:w-1/3 min-h-[240px] md:min-h-[280px] m-2">
              {/* image_section */}
              <div className="w-full  rounded-t-lg">
                <img
                  src="https://assets.leetcode.com/contest-config/contest/wc_card_img.png"
                  alt="Contest"
                  className="w-full rounded-lg  "
                />
              </div>
              {/* title section */}
              <div className="flex items-center lc-md:min-h-[84px] min-h-[80px] px-4">
                Hello
              </div>
            </div>
          </div>
          {/* contest tabs and leaderboard area */}
          <div className="flex flex-col md:flex-row min-h-52 p-4 gap-x-2">
            {/* the list and tab section */}
            <div className="h-[780px] w-full md:w-3/4  bg-[#0C121E] rounded-lg shadow-lg">
              {/* tabs */}
              <div className="flex w-full gap-4 px-4 py-2">
                {["ongoing", "upcoming", "past"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`w-32  p-2 rounded-md font-medium transition ${
                      tab === t
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              {/* list */}
              <div className=" overflow-y-scroll px-4 py-2 space-y-4 ">
                {data[tab].map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between bg-gray-900 rounded-xl px-4 py-2  shadow-sm hover:shadow-lg transition"
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
                        <h3 className="text-2xl text-white font-semibold">
                          {c.title}
                        </h3>

                        <p className="text-sm text-gray-400">{c.date}</p>
                      </div>
                    </div>

                    <div>
                      {c.action === "Join Now" && (
                        <button className=" w-28 px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 font-medium">
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
              </div>
            </div>
            {/* the leaderboard section */}
            <div className="flex flex-col h-[750px] md:w-1/4 bg-transparent gap-5">
              {/* global leaderboard section */}
              <div className="flex flex-col h-1/2 w-full bg-gray-900 rounded-lg shadow-lg">
                <h2 className="text-white text-xl font-bold  p-3">
                  Global Leaderboard
                </h2>
                <div className="flex flex-col overflow-y-scroll gap-y-3 px-2">
                  <div className="h-2" />
                  {leaderboard.map((p, i) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-semibold w-6">{i + 1}</div>
                        <div className="text-gray-200 font-medium">
                          {p.name}
                        </div>
                      </div>
                      <div className="text-sm text-gray-300">
                        {p.points} pts
                      </div>
                    </div>
                  ))}
                  <div className="h-6" />
                </div>
              </div>
              {/* virtual leaderboard section */}
              <div className="flex flex-col h-1/2 w-full bg-gray-900 rounded-lg shadow-lg">
                <h2 className="text-white text-xl font-bold  p-3">
                  Virtual Leaderboard
                </h2>
                <div className="flex flex-col overflow-y-scroll gap-y-3 px-2">
                  <div className="h-2" />
                  {leaderboard.map((p, i) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-semibold w-6">{i + 1}</div>
                        <div className="text-gray-200 font-medium">
                          {p.name}
                        </div>
                      </div>
                      <div className="text-sm text-gray-300">
                        {p.points} pts
                      </div>
                    </div>
                  ))}
                  <div className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
