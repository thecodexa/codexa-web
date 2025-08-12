import React, { useState, useEffect, useRef } from "react";

export default function QuestionsDropdown({ questions }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {questions.map((q, i) => (
            <a
              key={i}
              href="#"
              className="block px-4 py-3 text-gray-200 hover:bg-gray-700 border-b border-gray-700"
            >
              {q}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}