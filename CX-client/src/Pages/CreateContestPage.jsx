import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import { UserContext } from "../context/userContext";

export default function CreateContestPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Get back updated contest if returned from question page
  const returnedContest = location.state?.contest;

  const [contest, setContest] = useState(
    returnedContest || {
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      rules: "",
      total_marks: 0,
      created_by: user?.user_id || null,
      questions: [],
    }
  );

  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
    const savedDraft = localStorage.getItem("contest_draft");
    if (savedDraft && !returnedContest) {
      const parsed = JSON.parse(savedDraft);
      setContest(parsed);
      setTotalMarks(parsed.total_marks || 0);
      console.log("📂 Loaded saved draft from localStorage.");
    }
  }, []);

  useEffect(() => {
    const total = contest.questions.reduce(
      (sum, q) => sum + (q.max_score || 0),
      0
    );
    setTotalMarks(total);
    if (contest.total_marks !== total) {
      setContest((prev) => ({ ...prev, total_marks: total }));
    }
  }, [contest.questions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePublish = async () => {
    try {
      const contestData = {
        title: contest.title,
        description: contest.description,
        rules: contest.rules,
        start_time: contest.start_time,
        end_time: contest.end_time,
        created_by: contest.created_by,
        total_marks: contest.total_marks,
        questions: contest.questions.map((q) => ({
          title: q.title,
          description: q.description,
          difficulty: q.difficulty,
          max_score: q.max_score,
          starter_code: q.starter_code,
          full_solution: q.full_solution,
          test_harness: q.test_harness,
          test_cases: q.test_cases,
          evaluation_cases: q.evaluation_cases,
        })),
      };

      const response = await fetch("http://localhost:4000/contests/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contestData),
      });

      const data = await response.json();

      // Handle backend response
      if (response.ok) {
        alert(
          `✅ Contest created successfully! Contest ID: ${data.contest_id}`
        );
        console.log("Contest created:", data);
        localStorage.removeItem("contest_draft");
        // Optional: reset form or redirect
        navigate(`/contests/${data.contest_id}`);
      } else {
        console.error("Backend error:", data);
        alert(`❌ Error: ${data.error || "Failed to create contest."}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("⚠️ Server error — check console for details.");
    }
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem("contest_draft", JSON.stringify(contest));
      alert("💾 Draft saved locally!");
    } catch (error) {
      console.error("Failed to save draft:", error);
      alert("⚠️ Failed to save draft.");
    }
  };

  const handleAddQuestion = () => {
    navigate("/create-question", { state: { contest } });
  };

  return (
    <div className="bg-[#0D111A] min-h-screen text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto bg-[#0C121E] mt-10 p-8 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.05)] border border-gray-800">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">
          Create a New Contest
        </h1>

        {/* Contest Info Section */}
        <div className="space-y-6 mb-10">
          <div>
            <label className="block text-gray-300 mb-2 text-lg font-medium">
              Contest Title
            </label>
            <input
              type="text"
              name="title"
              value={contest.title}
              onChange={handleChange}
              placeholder="Enter contest title"
              className="w-full bg-[#111827] rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-lg font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={contest.description}
              onChange={handleChange}
              placeholder="Briefly describe your contest..."
              rows="4"
              className="w-full bg-[#111827] rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
            />
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2 text-lg font-medium">
                Start Time
              </label>
              <input
                type="datetime-local"
                name="start_time"
                value={contest.start_time}
                onChange={handleChange}
                className="w-full bg-[#111827] rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2 text-lg font-medium">
                End Time
              </label>
              <input
                type="datetime-local"
                name="end_time"
                value={contest.end_time}
                onChange={handleChange}
                className="w-full bg-[#111827] rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Rules */}
          <div>
            <label className="block text-gray-300 mb-2 text-lg font-medium">
              Instructions / Rules
            </label>
            <textarea
              name="rules"
              value={contest.rules}
              onChange={handleChange}
              placeholder="Add any rules, format, or instructions here..."
              rows="3"
              className="w-full bg-[#111827] rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Questions Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Questions</h2>
            <span className="text-gray-400 text-lg">
              Total Marks:{" "}
              <span className="text-cyan-400 font-bold">
                {contest.total_marks}
              </span>
            </span>
          </div>

          {contest.questions.length === 0 ? (
            <p className="text-gray-400 italic mb-4">No questions added yet.</p>
          ) : (
            <div className="space-y-3 mb-4">
              {contest.questions.map((q, index) => (
                <div
                  key={index}
                  className="bg-[#111827] border border-gray-800 px-5 py-3 rounded-lg flex justify-between items-center hover:border-cyan-500 transition-all"
                >
                  <div>
                    <span className="font-semibold text-gray-100">
                      {q.title}
                    </span>{" "}
                    <span className="text-sm text-gray-400">
                      ({q.max_score} marks)
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setContest((prev) => ({
                        ...prev,
                        questions: prev.questions.filter((_, i) => i !== index),
                      }))
                    }
                    className="text-red-400 hover:text-red-300 transition-all"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Question Button */}
          <button
            onClick={handleAddQuestion}
            className="bg-cyan-600 hover:bg-cyan-500 px-5 py-2.5 rounded-lg font-medium text-white shadow-md hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all"
          >
            + Add Question
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 border-t border-gray-800 pt-6">
          <button
            onClick={handleSaveDraft}
            className="bg-gray-700 hover:bg-gray-600 px-5 py-2.5 rounded-lg font-medium transition-all"
          >
            Save Draft
          </button>
          <button
            onClick={() => alert("Preview Contest (Coming Soon)")}
            className="bg-blue-700 hover:bg-blue-600 px-5 py-2.5 rounded-lg font-medium text-white transition-all"
          >
            Preview
          </button>
          <button
            onClick={handlePublish}
            className="bg-green-600 hover:bg-green-500 px-5 py-2.5 rounded-lg font-medium text-white transition-all"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
