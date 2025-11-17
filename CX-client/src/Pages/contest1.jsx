import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/navbar";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ContestsPage1() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("ongoing");
  const [contests, setContests] = useState({
    ongoing: [],
    upcoming: [],
    past: [],
  });
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await fetch("http://localhost:4000/contests");
        const data = await res.json();

        const now = new Date();
        const categorized = { ongoing: [], upcoming: [], past: [] };

        data.forEach((contest) => {
          const start = new Date(contest.start_time);
          const end = new Date(contest.end_time);

          if (now < start) categorized.upcoming.push(contest);
          else if (now >= start && now <= end)
            categorized.ongoing.push(contest);
          else categorized.past.push(contest);
        });

        setContests(categorized);
      } catch (error) {
        console.error("Failed to fetch contests:", error);
      }
    };

    fetchContests();
  }, []);

  // Helper: format date for display
  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 🧠 Fix: Use the tab directly instead of re-comparing times
  const getActionLabel = (tab) => {
    if (tab === "upcoming") return "Register";
    if (tab === "ongoing") return "Join Now";
    return "View Results";
  };

  return (
    <div className="bg-[#0D111A] p-2">
      <div className="min-h-screen bg-[#070B13] rounded-lg shadow-black shadow-md">
        <Navbar />

        <div className="bg-[#070B13] px-10">
          {/* Header cards */}
          <div className="flex flex-col md:flex-row justify-evenly items-center p-4">
            <div className="bg-[#0C121E] rounded-lg shadow-lg w-full md:w-1/3 min-h-[260px] m-2">
              <img
                src="https://assets.leetcode.com/contest-config/contest/wc_card_img.png"
                alt="Contest"
                className="w-full h-auto rounded-t-lg"
              />
              <div className="p-4 text-gray-200 text-lg font-semibold text-center">
                Compete. Learn. Dominate.
              </div>
            </div>

            <div className="bg-[#0C121E] rounded-lg shadow-lg w-full md:w-1/3 min-h-[260px] m-2">
              <img
                src="https://assets.leetcode.com/contest-config/contest/wc_card_img.png"
                alt="Contest"
                className="w-full h-auto rounded-t-lg"
              />
              <div className="p-4 text-gray-200 text-lg font-semibold text-center">
                Sharpen your DSA skills every week!
              </div>
            </div>
          </div>

          {/* Contest list + leaderboards */}
          <div className="flex flex-col md:flex-row min-h-52 p-4 gap-x-2">
            {/* Contest List */}
            <div className="max-h-[80vh] w-full md:w-3/4 bg-[#0C121E] rounded-lg shadow-lg">
              {/* Tabs */}
              <div className="flex w-full items-center justify-between px-4 pr-8 py-2">
                <div className="flex gap-4">
                  {["ongoing", "upcoming", "past"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`w-32 p-2 rounded-md font-medium transition ${
                        tab === t
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>

                {user?.role === "teacher" && (
                  <Link
                    to="/create-contest"
                    className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-md text-white font-medium hover:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all"
                  >
                    Create Contest
                  </Link>
                )}
              </div>

              {/* Contest items */}
              <div className="overflow-y-auto px-4 py-2 space-y-4 max-h-[70vh]">
                {contests[tab].length === 0 ? (
                  <p className="text-gray-400 italic text-center mt-10">
                    No {tab} contests found.
                  </p>
                ) : (
                  contests[tab].map((c) => {
                    const action = getActionLabel(tab);
                    return (
                      <div
                        key={c.contest_id}
                        className="flex items-center justify-between bg-gray-900 rounded-xl px-4 py-2 shadow-sm hover:shadow-lg transition"
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
                            <p className="text-sm text-gray-400">
                              {formatDate(c.start_time)}
                            </p>
                          </div>
                        </div>

                        <div>
                          {action === "Join Now" && (
                            <button
                              onClick={() =>
                                navigate(`/contest/${c.contest_id}`)
                              }
                              className="w-28 px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 font-medium"
                            >
                              {action}
                            </button>
                          )}
                          {action === "Register" && (
                            <button
                              onClick={() =>
                                navigate(`/contest/${c.contest_id}`)
                              }
                              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 font-medium"
                            >
                              {action}
                            </button>
                          )}
                          {action === "View Results" && (
                            <button
                              onClick={() =>
                                navigate(`/results/${c.contest_id}`)
                              }
                              className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 font-medium"
                            >
                              {action}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Leaderboards */}
            <div className="flex flex-col h-[750px] md:w-1/4 bg-transparent gap-5">
              {/* Global Leaderboard */}
              <div className="flex flex-col h-1/2 w-full bg-gray-900 rounded-lg shadow-lg">
                <h2 className="text-white text-xl font-bold p-3">
                  Global Leaderboard
                </h2>
                <div className="flex flex-col overflow-y-scroll gap-y-3 px-2">
                  <div className="h-2" />
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-semibold w-6">{i + 1}</div>
                        <div className="text-gray-200 font-medium">
                          Player {i + 1}
                        </div>
                      </div>
                      <div className="text-sm text-gray-300">
                        {1000 - i * 50} pts
                      </div>
                    </div>
                  ))}
                  <div className="h-6" />
                </div>
              </div>

              {/* Virtual Leaderboard */}
              <div className="flex flex-col h-1/2 w-full bg-gray-900 rounded-lg shadow-lg">
                <h2 className="text-white text-xl font-bold p-3">
                  Virtual Leaderboard
                </h2>
                <div className="flex flex-col overflow-y-scroll gap-y-3 px-2">
                  <div className="h-2" />
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-semibold w-6">{i + 1}</div>
                        <div className="text-gray-200 font-medium">
                          Virtual {i + 1}
                        </div>
                      </div>
                      <div className="text-sm text-gray-300">
                        {900 - i * 40} pts
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
