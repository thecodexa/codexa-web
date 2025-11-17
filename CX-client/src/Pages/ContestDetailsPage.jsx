import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";

export default function ContestDetailsPage() {
  const { contestId } = useParams();
  const { user } = useContext(UserContext);
  const [contest, setContest] = useState(null);
  const [status, setStatus] = useState("loading"); // "upcoming", "ongoing", "past"
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await fetch(`http://localhost:4000/contests/${contestId}`);
        const data = await res.json();

        setContest(data);

        // determine contest status
        const now = new Date();
        const start = new Date(data.start_time);
        const end = new Date(data.end_time);

        if (now < start) setStatus("upcoming");
        else if (now >= start && now <= end) setStatus("ongoing");
        else setStatus("past");
      } catch (error) {
        console.error("Failed to load contest:", error);
      }
    };

    fetchContest();
  }, [contestId]);

  useEffect(() => {
    const checkRegistration = async () => {
      if (!user?.user_id) return;

      try {
        const res = await fetch(
          `http://localhost:4000/contests/${contestId}/is-registered/${user.user_id}`
        );
        const data = await res.json();

        setIsRegistered(data.registered);
        setRegistrationStatus(data.status);
      } catch (err) {
        console.error("Failed to check registration:", err);
      }
    };

    checkRegistration();
  }, [user, contestId]);

  const handleRegister = async () => {
    if (!user?.user_id || isRegistering) return;

    setIsRegistering(true);
    try {
      const res = await fetch(
        `http://localhost:4000/contests/${contestId}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.user_id }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setIsRegistered(true);
        setRegistrationStatus("registered");
        if (data.already_registered) {
          toast.info("You were already registered");
        } else {
          toast.success("You have successfully registered!");
        }
        return true;
      } else {
        alert(data.error || "Failed to register");
      }
    } catch (err) {
      console.error("Register request failed:", err);
      alert("Server error — try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const handleAction = () => {
    if (status === "ongoing") {
      navigate(`/contest/${contestId}/problems`);
    } else if (status === "past") {
      alert("Results will be displayed soon!");
    } else {
      alert("You’re registered! Contest hasn’t started yet.");
    }
  };

  if (!contest)
    return (
      <div className="bg-[#0D111A] min-h-screen flex items-center justify-center text-gray-300 text-lg">
        Loading contest details...
      </div>
    );

  return (
    <div className="bg-[#0D111A] min-h-screen text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 bg-[#0C121E] p-8 rounded-2xl border border-gray-800 shadow-[0_0_25px_rgba(0,255,255,0.05)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-cyan-400">{contest.title}</h1>
          <span
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              status === "ongoing"
                ? "bg-green-700 text-white"
                : status === "upcoming"
                ? "bg-blue-700 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-4 text-gray-300 mb-6">
          <p className="text-lg">{contest.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p>
                <span className="font-semibold text-gray-200">Start:</span>{" "}
                {formatDate(contest.start_time)}
              </p>
              <p>
                <span className="font-semibold text-gray-200">End:</span>{" "}
                {formatDate(contest.end_time)}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold text-gray-200">
                  Total Marks:
                </span>{" "}
                {contest.total_marks}
              </p>
              <p>
                <span className="font-semibold text-gray-200">Created by:</span>{" "}
                {contest.created_by.first_name || `User ${contest.created_by}`}{" "}
                {contest.created_by.last_name || `User ${contest.created_by}`}
              </p>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-cyan-400">
            Contest Rules
          </h2>
          <p className="bg-[#111827] p-4 rounded-lg text-gray-300 whitespace-pre-line border border-gray-800">
            {contest.rules || "No specific rules provided."}
          </p>
        </div>

        {/* Problem List */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
            Problems
          </h2>
          {contest.questions && contest.questions.length > 0 ? (
            <div className="space-y-3">
              {contest.questions.map((q, index) => (
                <div
                  key={index}
                  className="bg-[#111827] border border-gray-800 rounded-lg px-5 py-3 flex justify-between items-center hover:border-cyan-500 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-100">
                      {index + 1}. {q.title}
                    </p>
                    <p className="text-sm text-gray-400">{q.difficulty}</p>
                  </div>
                  <span className="text-cyan-400 font-medium">
                    {q.max_score} pts
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No problems added yet.</p>
          )}
        </div>

        {/* Action Button */}
        <div className="text-right">
          {/* UPCOMING: register or show registered */}
          {status === "upcoming" && !isRegistered && (
            <button
              onClick={handleRegister}
              className="px-6 py-2.5 rounded-lg font-medium bg-blue-600 hover:bg-blue-500"
            >
              Register
            </button>
          )}

          {status === "upcoming" && isRegistered && (
            <button className="px-6 py-2.5 rounded-lg font-medium bg-gray-500">
              Registered ✔
            </button>
          )}

          {/* ONGOING */}
          {status === "ongoing" && (
            <button
              onClick={async () => {
                if (!isRegistered) {
                  const ok = await handleRegister(); // <-- wait for registration to finish
                  if (!ok) return; // if registration failed, stop navigation
                }
                navigate(
                  `/contest/${contestId}/problem/${contest.questions[0].problem_id}`
                );
              }}
              className="px-6 py-2.5 rounded-lg font-medium bg-green-600 hover:bg-green-500"
            >
              Start Solving
            </button>
          )}

          {/* PAST */}
          {status === "past" && isRegistered && (
            <button className="px-6 py-2.5 rounded-lg font-medium bg-gray-700">
              View Results
            </button>
          )}

          {status === "past" && !isRegistered && (
            <button className="px-6 py-2.5 rounded-lg font-medium bg-gray-700">
              Solve Virtual
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
