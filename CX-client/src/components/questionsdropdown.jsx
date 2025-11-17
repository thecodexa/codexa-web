import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function QuestionsDropdown({ questions, statusMap }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { contestId } = useParams();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToProblem = (problemId) => {
    navigate(`/contest/${contestId}/problem/${problemId}`);
    setIsOpen(false);
  };

  // Status → color
  const getColor = (status) => {
    switch (status) {
      case "accepted":
        return "text-green-400";
      case "partial":
        return "text-yellow-400";
      case "wrong":
        return "text-red-400";
      default:
        return "text-gray-400"; // not_attempted
    }
  };

  return (
    <div className="relative questions-dropdown" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-gray-800 px-3 py-2 rounded hover:bg-gray-700 flex items-center space-x-2"
      >
        <span>Questions</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Panel */}
      <div
        className={`absolute left-0 mt-2 w-80 bg-gray-800 rounded shadow-lg z-50 overflow-hidden transition-all duration-200 origin-top ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ maxHeight: "16rem" }}
      >
        <div className="overflow-y-auto max-h-64">
          {questions.map((q) => {
            const status = statusMap?.[q.id] || "not_attempted";
            const color = getColor(status);
            const isAccepted = status === "accepted";

            return (
              <button
                key={q.id}
                onClick={() => goToProblem(q.id)}
                className="w-full text-left block px-4 py-3 hover:bg-gray-700 border-b border-gray-700 flex justify-between items-center"
              >
                <span className={`font-medium ${color}`}>{q.title}</span>

                {/* ✔ Tick for Accepted */}
                {isAccepted && (
                  <span className="text-green-400 font-bold text-lg">✔</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
