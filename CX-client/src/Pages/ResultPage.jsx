// src/pages/ResultPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MonacoEditor from "react-monaco-editor";
import { UserContext } from "../context/userContext";
import Navbar from "../components/navbar"; // ✅ ADD NAVBAR IMPORT

export default function ResultPage() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [summary, setSummary] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userDetail, setUserDetail] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // History modal
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyProblem, setHistoryProblem] = useState(null);
  const [historyRows, setHistoryRows] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);

  const safeFetch = async (url, opts = {}) => {
    const res = await fetch(url, opts);
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "Failed request");
    }
    return res.json();
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const loadData = async () => {
      try {
        const base = "http://localhost:4000";

        const [s, lb, ud] = await Promise.all([
          safeFetch(`${base}/contests/${contestId}/summary`),
          safeFetch(`${base}/contests/${contestId}/leaderboard`),
          safeFetch(`${base}/contests/${contestId}/user/${user.user_id}`),
        ]);

        if (!mounted) return;

        setSummary(s);
        setLeaderboard(lb);
        setUserDetail(ud);
      } catch (err) {
        console.error("ResultPage load error:", err);
        if (mounted) setError(err.message || "Error loading results");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadData();
    return () => (mounted = false);
  }, [contestId, user.user_id]);

  const openHistory = async (problemId) => {
    setHistoryProblem(problemId);
    setShowHistoryModal(true);
    setHistoryRows([]);
    setSelectedCode(null);

    try {
      const base = "http://localhost:4000";
      const rows = await safeFetch(
        `${base}/problems/history/${contestId}/${problemId}/${user.user_id}`
      );
      setHistoryRows(rows || []);
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  };

  const closeHistory = () => {
    setShowHistoryModal(false);
    setHistoryProblem(null);
    setHistoryRows([]);
    setSelectedCode(null);
  };

  const viewSubmissionCode = (code) => setSelectedCode(code);

  const humanDate = (ts) => (ts ? new Date(ts).toLocaleString() : "-");
  const getStatusText = (best, max) =>
    best >= max ? "Accepted" : best > 0 ? "Partial" : "Unsolved";

  if (loading) {
    return (
      <div className="h-full min-h-screen flex items-center justify-center bg-[#0D111A] text-white">
        <div>Loading results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-[#0D111A] text-white min-h-screen">
        <div className="bg-red-700 text-white p-4 rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0D111A] min-h-screen text-white">
      {/* ✅ Navbar on top */}
      <Navbar />

      <div className="p-6">
        {/* Summary */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-cyan-400">
                {summary.title}
              </h1>

              {summary.description && (
                <p className="text-sm text-gray-400 mt-1">
                  {summary.description}
                </p>
              )}

              <div className="text-xs text-gray-300 mt-3">
                <div>Start: {humanDate(summary.start_time)}</div>
                <div>End: {humanDate(summary.end_time)}</div>
                <div>
                  Problems: {summary.total_problems} · Max Score:{" "}
                  {summary.max_score}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-shrink-0 text-right">
              <div className="text-sm text-gray-400">Your Rank</div>
              <div className="text-3xl font-bold text-green-400">
                {userDetail?.rank ?? "-"}
              </div>

              <div className="text-sm text-gray-300 mt-2">
                Score:{" "}
                <span className="font-semibold text-cyan-400">
                  {userDetail?.total_score ?? 0}
                </span>{" "}
                / {summary.max_score}
              </div>

              <div className="mt-3">
                <button
                  onClick={() => navigate(`/contests/${contestId}`)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-2"
                >
                  Back to Contest
                </button>

                <button
                  onClick={() => window.print()}
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT — Leaderboard */}
          <div className="lg:col-span-1 bg-gray-900 p-4 rounded border border-gray-800">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">
              Leaderboard
            </h3>

            <div className="overflow-auto max-h-[520px]">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-400">
                  <tr>
                    <th className="p-2 w-10">#</th>
                    <th>Name</th>
                    <th className="text-right w-20">Score</th>
                  </tr>
                </thead>

                <tbody>
                  {leaderboard.map((row) => {
                    const highlight = row.user_id === user.user_id;
                    return (
                      <tr
                        key={row.user_id}
                        className={`${
                          highlight ? "bg-gray-800" : ""
                        } border-b border-gray-800`}
                      >
                        <td className="p-2">{row.rank}</td>
                        <td className="p-2">{row.username}</td>
                        <td className="p-2 text-right font-semibold">
                          {row.total_score}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT — User Performance */}
          <div className="lg:col-span-2 bg-gray-900 p-6 rounded border border-gray-800">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">
              Your Performance
            </h3>

            <div className="w-full overflow-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-400">
                  <tr>
                    <th className="p-2 w-12">#</th>
                    <th className="w-1/3">Problem</th>
                    <th className="text-right w-24">Best</th>
                    <th className="text-right w-24">Max</th>
                    <th className="text-center w-24">Attempts</th>
                    <th className="w-48">Last</th>
                    <th className="w-36">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {userDetail.problems.map((p, idx) => {
                    const status = getStatusText(p.best_score, p.max_score);

                    return (
                      <tr
                        key={p.problem_id}
                        className="border-b border-gray-800"
                      >
                        <td className="p-2">{idx + 1}</td>
                        <td className="py-2">{p.title}</td>
                        <td className="py-2 text-right text-green-400">
                          {p.best_score}
                        </td>
                        <td className="py-2 text-right">{p.max_score}</td>
                        <td className="py-2 text-center">{p.attempts}</td>
                        <td className="py-2 text-sm text-gray-300">
                          {p.last_updated
                            ? new Date(p.last_updated).toLocaleString()
                            : "-"}
                        </td>

                        <td className="py-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openHistory(p.problem_id)}
                              className="bg-blue-600 px-3 py-1 rounded text-sm"
                            >
                              View Attempts
                            </button>

                            <div
                              className={`px-2 py-1 rounded text-sm ${
                                status === "Accepted"
                                  ? "bg-green-800 text-green-100"
                                  : status === "Partial"
                                  ? "bg-yellow-700 text-yellow-100"
                                  : "bg-red-800 text-red-100"
                              }`}
                            >
                              {status}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-sm text-gray-300">
              <strong>Total:</strong>{" "}
              <span className="font-semibold text-cyan-400">
                {userDetail.total_score}
              </span>{" "}
              / {summary.max_score}
            </div>
          </div>
        </div>

        {/* ------------------ History Modal ------------------ */}
        {showHistoryModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
            <div
              className="absolute inset-0 bg-black opacity-60"
              onClick={closeHistory}
            />

            <div className="relative bg-gray-900 w-full max-w-[1000px] max-h-[90vh] overflow-auto rounded p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold text-cyan-400">
                  Submissions — Problem {historyProblem}
                </h4>

                <button
                  onClick={closeHistory}
                  className="px-3 py-1 bg-red-600 rounded"
                >
                  Close
                </button>
              </div>

              <div className="mb-4">
                <table className="w-full text-sm">
                  <thead className="text-gray-400">
                    <tr>
                      <th className="p-2 w-16">ID</th>
                      <th>Verdict</th>
                      <th className="w-20 text-right">Score</th>
                      <th className="w-20">Passed</th>
                      <th className="w-40">Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {historyRows.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-4 text-gray-400">
                          No submissions yet.
                        </td>
                      </tr>
                    )}

                    {historyRows.map((row) => (
                      <tr
                        key={row.submission_id}
                        className="border-b border-gray-800"
                      >
                        <td className="p-2">{row.submission_id}</td>
                        <td className="py-2">{row.verdict}</td>
                        <td className="py-2 text-right">{row.score}</td>
                        <td className="py-2">
                          {row.passed}/{row.total}
                        </td>
                        <td className="py-2">
                          {new Date(row.submitted_at).toLocaleString()}
                        </td>
                        <td className="py-2">
                          <button
                            onClick={() => viewSubmissionCode(row.code)}
                            className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                          >
                            View Code
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedCode !== null && (
                <div className="mt-4">
                  <h5 className="text-sm text-gray-300 mb-2">Source Code</h5>
                  <div className="border border-gray-800 rounded">
                    <MonacoEditor
                      width="100%"
                      height="300"
                      language="cpp"
                      theme="vs-dark"
                      value={selectedCode}
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        automaticLayout: true,
                        fontSize: 13,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
