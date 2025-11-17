import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MonacoEditor from "react-monaco-editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import QuestionsDropdown from "../components/questionsdropdown";
import "../index.css";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProblemPage() {
  const { contestId, problemId } = useParams();

  const [contest, setContest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [problem, setProblem] = useState(null);

  // ⭐ NEW: code stored per-question
  const [codeMap, setCodeMap] = useState({});

  const [runResults, setRunResults] = useState([]);
  const [language, setLanguage] = useState("cpp");

  const { user } = useContext(UserContext);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const [submitResults, setSubmitResults] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [statusMap, setStatusMap] = useState({});

  const [timeLeft, setTimeLeft] = useState("");
  const [timerColor, setTimerColor] = useState("text-cyan-400");

  const navigate = useNavigate();
  const endedNavigatedRef = useRef(false);

  // ------------------------------------------
  // Fetch Contest + Questions
  // ------------------------------------------
  useEffect(() => {
    const loadContest = async () => {
      try {
        const res = await fetch(`http://localhost:4000/contests/${contestId}`);
        const data = await res.json();
        setContest(data);
        setQuestions(data?.questions || []);
      } catch (e) {
        console.error("❌ Failed to fetch contest:", e);
      }
    };

    loadContest();
  }, [contestId]);

  useEffect(() => {
    if (!contest) return;

    updateTimer(); // run immediately
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  const updateTimer = () => {
    if (!contest || !contest.end_time) return;

    const end = new Date(contest.end_time).getTime();
    const now = Date.now();
    const diff = end - now;

    if (diff <= 0) {
      setTimeLeft("Contest Ended");
      setTimerColor("!text-red-500 font-bold");

      if (!endedNavigatedRef.current) {
        endedNavigatedRef.current = true;
        setTimeout(() => {
          navigate(`/results/${contestId}`);
        }, 1500);
      }
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft(
      `${hours.toString().padStart(2, "0")}:` +
        `${minutes.toString().padStart(2, "0")}:` +
        `${seconds.toString().padStart(2, "0")}`
    );

    if (diff <= 5 * 60 * 1000) {
      setTimerColor("!text-red-500 font-bold animate-pulse");
    } else {
      setTimerColor("!text-cyan-400");
    }
  };

  // ------------------------------------------
  // Fetch Current Problem
  // ------------------------------------------
  useEffect(() => {
    if (!problemId) return;

    setRunResults([]);

    const loadProblem = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/problems/id/${problemId}`
        );
        const data = await res.json();

        setProblem(data);

        // ⭐ NEW: Initialize code for new problem
        setCodeMap((prev) => {
          if (prev[problemId]) return prev;
          return {
            ...prev,
            [problemId]: data.starter_code || "",
          };
        });
      } catch (e) {
        console.error("❌ Failed to load problem:", e);
      }
    };

    loadProblem();
  }, [problemId]);

  const handleFinishContest = () => {
    const confirmEnd = window.confirm(
      "Are you sure you want to finish the contest? You won't be able to re-enter."
    );

    if (!confirmEnd) return;

    navigate(`/results/${contestId}`);
  };

  // ------------------------------------------
  // Load Statuses (Used in Dropdown)
  // ------------------------------------------
  const refreshStatuses = async () => {
    if (!questions.length || !user) return;

    const statuses = {};

    for (let q of questions) {
      const res = await fetch(
        `http://localhost:4000/problems/status/${contestId}/${q.problem_id}/${user.user_id}`
      );
      const data = await res.json();
      statuses[q.problem_id] = data.status;
    }

    setStatusMap(statuses);
  };

  useEffect(() => {
    refreshStatuses();
  }, [questions, user]);

  // ------------------------------------------
  // Submit Code
  // ------------------------------------------
  const handleSubmit = async () => {
    setSubmissionStatus("Submitting...");

    try {
      const res = await fetch("http://localhost:4000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contestId,
          problemId,
          code: codeMap[problemId] || "",
          language: "cpp",
          userId: user.user_id,
        }),
      });

      const data = await res.json();

      setSubmissionStatus("");

      if (!data.success) {
        toast.error(data.error || "Submission failed");
        return;
      }

      setSubmitResults({
        results: data.results,
        passed: data.passed,
        total: data.total,
        score: data.score,
      });

      setShowSubmitModal(true);
      toast.success(`Score: ${data.score}/${problem.max_score}`);

      await refreshStatuses();
    } catch (err) {
      console.error(err);
      toast.error("Server error during submission");
    }
  };

  // ------------------------------------------
  // Run Code
  // ------------------------------------------
  const runCode = async () => {
    setRunResults([{ loading: true }]);

    try {
      const res = await fetch("http://localhost:4000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: codeMap[problemId] || "",
          problemId,
        }),
      });

      const data = await res.json();

      if (data.compileError) {
        setRunResults([{ error: "Compile Error:\n" + data.compileError }]);
        return;
      }

      if (!data.success && data.error) {
        setRunResults([{ error: "Runtime Error:\n" + data.error }]);
        return;
      }

      setRunResults(data.results || []);
    } catch (err) {
      setRunResults([{ error: "Server Error: " + err.message }]);
    }
  };

  // ------------------------------------------
  // LOADING SCREEN
  // ------------------------------------------
  if (!contest || !problem)
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );

  const questionDropdownData = questions.map((q, idx) => ({
    id: q.problem_id,
    title: `${idx + 1}. ${q.title}`,
  }));

  return (
    <div className="h-screen flex flex-col bg-[#0D111A] text-white overflow-hidden">
      {/* NAVBAR */}
      <nav className="bg-gray-900 flex items-center justify-between px-6 py-3 border-b border-gray-800">
        <div className="flex items-center  space-x-6">
          <span className="text-white text-4xl font-bold">codeXa</span>
          <QuestionsDropdown
            questions={questionDropdownData || []}
            statusMap={statusMap || {}}
          />
        </div>
        {/* TIMER */}
        <div className="flex items-center space-x-6">
          <span className={`text-xl font-bold ${timerColor}`}>{timeLeft}</span>

          <button
            onClick={handleFinishContest}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded font-semibold"
          >
            Finish Contest
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div className="flex-1 min-h-0">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={40} minSize={25}>
            <div className="flex flex-col h-full border-r border-gray-800">
              <div className="px-4 py-3 border-b border-gray-800 bg-gray-900">
                <h2 className="text-3xl font-bold text-cyan-400">
                  {problem.title}
                </h2>
                <p className="text-sm text-gray-400">{problem.difficulty}</p>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="bg-gray-800 p-6 rounded-md shadow-sm">
                  <p className="text-gray-300 whitespace-pre-line">
                    {problem.description}
                  </p>

                  <h3 className="text-lg font-semibold mt-4">Input Format</h3>
                  <p className="text-gray-300 whitespace-pre-line">
                    {problem.input_format}
                  </p>

                  <h3 className="text-lg font-semibold mt-4">Output Format</h3>
                  <p className="text-gray-300 whitespace-pre-line">
                    {problem.output_format}
                  </p>

                  <h3 className="text-lg font-semibold mt-6 text-cyan-400">
                    Examples
                  </h3>

                  {(() => {
                    let examples = [];

                    if (problem.test_cases) examples = problem.test_cases;

                    if (!examples.length) {
                      return (
                        <p className="text-gray-400 mt-2">
                          No examples provided for this problem.
                        </p>
                      );
                    }

                    return examples.map((t, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-900 p-4 mt-4 rounded border border-gray-700"
                      >
                        <h4 className="font-semibold text-white">
                          Example {idx + 1}
                        </h4>

                        <div className="mt-2">
                          <p className="text-sm text-gray-400">Input:</p>
                          <pre className="bg-black p-2 rounded text-green-300 whitespace-pre-wrap">
                            {t.input}
                          </pre>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm text-gray-400">Output:</p>
                          <pre className="bg-black p-2 rounded text-cyan-300 whitespace-pre-wrap">
                            {t.output}
                          </pre>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-800 cursor-col-resize" />

          {/* RIGHT */}
          <Panel defaultSize={55} minSize={25}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={65} minSize={35}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-gray-800 px-2 py-1 rounded"
                    >
                      <option value="cpp">C++</option>
                      <option value="js" disabled>
                        JavaScript
                      </option>
                      <option value="py" disabled>
                        Python
                      </option>
                    </select>

                    <div className="flex gap-3">
                      <button
                        onClick={runCode}
                        className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
                      >
                        Run
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-green-600 px-3 py-1 rounded"
                      >
                        {submissionStatus || "Submit"}
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0">
                    <MonacoEditor
                      width="100%"
                      height="100%"
                      language={
                        language === "cpp"
                          ? "cpp"
                          : language === "py"
                          ? "python"
                          : "javascript"
                      }
                      theme="vs-dark"
                      value={codeMap[problemId] || ""}
                      onChange={(newValue) =>
                        setCodeMap((prev) => ({
                          ...prev,
                          [problemId]: newValue,
                        }))
                      }
                      options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        wordWrap: "on",
                        automaticLayout: true,
                      }}
                    />
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-1 bg-gray-800 cursor-row-resize" />

              <Panel defaultSize={35} minSize={20}>
                <div className="h-full bg-gray-900 border-t border-gray-800 p-4 overflow-auto">
                  <h3 className="text-lg font-semibold mb-2 text-cyan-400">
                    Test Cases
                  </h3>
                  {problem.test_cases && problem.test_cases.length > 0 ? (
                    problem.test_cases.map((t, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-800 p-4 mb-4 rounded-lg border border-gray-700"
                      >
                        <h4 className="font-semibold text-white mb-2">
                          Case {idx + 1}
                        </h4>

                        <p className="text-sm text-gray-400">Input:</p>
                        <pre className="bg-black p-2 rounded text-green-300 whitespace-pre-wrap mb-3">
                          {t.input}
                        </pre>

                        <p className="text-sm text-gray-400">
                          Expected Output:
                        </p>
                        <pre className="bg-black p-2 rounded text-yellow-300 whitespace-pre-wrap mb-3">
                          {t.output}
                        </pre>

                        <p className="text-sm text-gray-400">Your Output:</p>
                        {runResults[idx] ? (
                          runResults[idx].error ? (
                            <pre className="bg-black p-2 rounded text-red-400 whitespace-pre-wrap">
                              {runResults[idx].error}
                            </pre>
                          ) : (
                            <pre
                              className={`bg-black p-2 rounded whitespace-pre-wrap ${
                                runResults[idx].output?.trim() ===
                                t.output.trim()
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {runResults[idx].output}
                            </pre>
                          )
                        ) : (
                          <pre className="bg-black p-2 rounded text-gray-400 whitespace-pre-wrap">
                            Run code to see your output
                          </pre>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No test cases available.</p>
                  )}
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>

      {showSubmitModal && submitResults && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-gray-900 w-[420px] p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              Submission Result
            </h2>

            <p className="text-lg font-semibold mb-2">
              {submitResults.passed === submitResults.total ? (
                <span className="text-green-400">✔ Accepted</span>
              ) : submitResults.passed === 0 ? (
                <span className="text-red-400">✘ Wrong Answer</span>
              ) : (
                <span className="text-yellow-400">➤ Partially Correct</span>
              )}
            </p>

            <p className="text-gray-300 text-lg mb-2">
              Score:{" "}
              <span className="text-green-400 font-bold">
                {submitResults.score}
              </span>{" "}
              / {problem.max_score}
            </p>

            <p className="text-gray-300 text-md mb-6">
              Hidden Tests Passed:{" "}
              <span className="text-cyan-400">
                {submitResults.passed}/{submitResults.total}
              </span>
            </p>

            <button
              onClick={() => {
                setShowSubmitModal(false);
                setSubmitResults(null);
              }}
              className="w-full bg-cyan-600 hover:bg-cyan-500 py-2 rounded font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
