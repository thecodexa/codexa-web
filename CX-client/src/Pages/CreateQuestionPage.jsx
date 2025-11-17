import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Navbar from "../components/navbar";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateQuestionPage() {
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    rules: "",
    difficulty: "easy",
    max_score: "",
    test_cases: [{ input: "", output: "" }],
    evaluation_cases: [{ input: "", output: "" }],
  });

  // Code Editors
  const [starter_code, setStarterCode] = useState(
    `class Solution {
public:
    int solve(int a, int b) {
        // your code here
    }
};`
  );

  const [full_solution, setFullSolutionCode] = useState(
    `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int solve(int a, int b) {
        return a+b;
    }
};

int main() {
    Solution s;
    int a,b;
    cin>>a>>b;
    cout<<s.solve(a,b);
    return 0;
}`
  );

  const [test_harness, setTestHarnessCode] = useState(
    `#include <bits/stdc++.h>
using namespace std;

int main() {
    Solution s;
    int a,b;
    cin>>a>>b;
    cout<<s.solve(a,b);
    return 0;
}`
  );

  const navigate = useNavigate();
  const location = useLocation();
  const previousContest = location.state?.contest;

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  // Add new example test case
  const handleAddCase = () => {
    setQuestion((prev) => ({
      ...prev,
      test_cases: [...prev.test_cases, { input: "", output: "" }],
    }));
  };

  // Save Question and go back to CreateContest
  const handleSave = () => {
    const updatedContest = {
      ...previousContest,
      questions: [
        ...(previousContest?.questions || []),
        {
          title: question.title,
          description: question.description,
          difficulty: question.difficulty,
          max_score: Number(question.max_score),
          rules: question.rules,
          starter_code,
          full_solution,
          test_harness,
          test_cases: question.test_cases,
          evaluation_cases: question.evaluation_cases,
        },
      ],
    };

    navigate("/create-contest", { state: { contest: updatedContest } });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0D111A] text-white overflow-hidden">
      <Navbar />

      {/* Main Area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* LEFT SIDE — QUESTION DETAILS */}
          <Panel defaultSize={48} minSize={25}>
            <div className="flex flex-col h-full bg-[#0C121E] border-r border-gray-800">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-cyan-400">
                  Create New Question
                </h2>
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Save Question
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                {/* Title */}
                <div>
                  <label className="block mb-1 text-gray-300">Title</label>
                  <input
                    name="title"
                    value={question.title}
                    onChange={handleChange}
                    className="w-full bg-gray-800 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                    placeholder='e.g. "Two Sum"'
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2 text-gray-300 text-lg font-semibold">
                    🧩 Description
                  </label>
                  <textarea
                    name="description"
                    value={question.description}
                    onChange={handleChange}
                    className="w-full bg-gray-800 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                    rows="6"
                    placeholder="Describe the problem..."
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-gray-300 mb-2 text-lg font-semibold">
                    🎯 Difficulty
                  </label>
                  <select
                    name="difficulty"
                    value={question.difficulty}
                    onChange={handleChange}
                    className="w-40 bg-gray-800 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                {/* Rules */}
                <div>
                  <label className="block mb-2 text-gray-300 text-lg font-semibold">
                    ⚙️ Rules / Constraints
                  </label>
                  <textarea
                    name="rules"
                    value={question.rules}
                    onChange={handleChange}
                    className="w-full bg-gray-800 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                    rows="3"
                  />
                </div>

                {/* Marks */}
                <div>
                  <label className="block mb-2 text-gray-300 text-lg font-semibold">
                    🏆 Marks
                  </label>
                  <input
                    name="max_score"
                    type="number"
                    value={question.max_score}
                    onChange={handleChange}
                    className="w-32 bg-gray-800 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                    placeholder="e.g. 10"
                  />
                </div>

                {/* Test Cases */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-cyan-400">
                      🧪 Example Test Cases
                    </h3>
                    <button
                      onClick={handleAddCase}
                      className="bg-cyan-600 hover:bg-cyan-500 px-3 py-1 rounded-md text-sm"
                    >
                      + Add Example
                    </button>
                  </div>

                  <div className="space-y-3">
                    {question.test_cases.map((tc, i) => (
                      <div
                        key={i}
                        className="bg-gray-800 p-3 rounded-md space-y-2 border border-gray-700"
                      >
                        <h4 className="text-gray-300 font-medium mb-2">
                          Example #{i + 1}
                        </h4>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            Input:
                          </label>
                          <textarea
                            value={tc.input}
                            onChange={(e) => {
                              const updated = [...question.test_cases];
                              updated[i].input = e.target.value;
                              setQuestion({ ...question, test_cases: updated });
                            }}
                            className="w-full bg-[#0B1220] rounded-md px-2 py-1 text-sm"
                            rows="2"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            Expected Output:
                          </label>
                          <textarea
                            value={tc.output}
                            onChange={(e) => {
                              const updated = [...question.test_cases];
                              updated[i].output = e.target.value;
                              setQuestion({ ...question, test_cases: updated });
                            }}
                            className="w-full bg-[#0B1220] rounded-md px-2 py-1 text-sm"
                            rows="2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hidden Evaluation Cases */}
                <div>
                  <div className="flex justify-between items-center mb-3 mt-6">
                    <h3 className="text-xl font-semibold text-red-400">
                      🔒 Hidden Evaluation Cases
                    </h3>
                    <button
                      onClick={() =>
                        setQuestion((prev) => ({
                          ...prev,
                          evaluation_cases: [
                            ...prev.evaluation_cases,
                            { input: "", output: "" },
                          ],
                        }))
                      }
                      className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-md text-sm"
                    >
                      + Add Hidden
                    </button>
                  </div>

                  <div className="space-y-3">
                    {question.evaluation_cases.map((tc, i) => (
                      <div
                        key={i}
                        className="bg-gray-800 p-3 rounded-md space-y-2 border border-red-700"
                      >
                        <h4 className="text-gray-300 font-medium mb-2">
                          Hidden Case #{i + 1}
                        </h4>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            Hidden Input:
                          </label>
                          <textarea
                            value={tc.input}
                            onChange={(e) => {
                              const updated = [...question.evaluation_cases];
                              updated[i].input = e.target.value;
                              setQuestion({
                                ...question,
                                evaluation_cases: updated,
                              });
                            }}
                            className="w-full bg-[#0B1220] rounded-md px-2 py-1 text-sm"
                            rows="2"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            Hidden Expected Output:
                          </label>
                          <textarea
                            value={tc.output}
                            onChange={(e) => {
                              const updated = [...question.evaluation_cases];
                              updated[i].output = e.target.value;
                              setQuestion({
                                ...question,
                                evaluation_cases: updated,
                              });
                            }}
                            className="w-full bg-[#0B1220] rounded-md px-2 py-1 text-sm"
                            rows="2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-800 cursor-col-resize" />

          {/* RIGHT SIDE — MONACO EDITORS */}
          <Panel defaultSize={52} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Full Solution */}

              {/* Test Harness */}
              <Panel defaultSize={50} minSize={20}>
                <div className="flex flex-col h-full bg-[#0C121E] border-b border-gray-800">
                  <div className="px-4 py-3 bg-gray-900 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-cyan-400">
                      🟦 Test Harness
                    </h3>
                  </div>
                  <div className="flex-1 min-h-0">
                    <MonacoEditor
                      width="100%"
                      height="100%"
                      language="cpp"
                      theme="vs-dark"
                      value={test_harness}
                      onChange={(val) => setTestHarnessCode(val)}
                      options={{
                        fontSize: 13,
                        minimap: { enabled: false },
                        wordWrap: "on",
                        automaticLayout: true,
                      }}
                    />
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-1 bg-gray-800 cursor-row-resize" />

              {/* Starter Code */}
              <Panel defaultSize={50} minSize={20}>
                <div className="flex flex-col h-full bg-[#0C121E]">
                  <div className="px-4 py-3 bg-gray-900 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-cyan-400">
                      🟨 Starter Code
                    </h3>
                  </div>
                  <div className="flex-1 min-h-0">
                    <MonacoEditor
                      width="100%"
                      height="100%"
                      language="cpp"
                      theme="vs-dark"
                      value={starter_code}
                      onChange={(val) => setStarterCode(val)}
                      options={{
                        fontSize: 13,
                        minimap: { enabled: false },
                        wordWrap: "on",
                        automaticLayout: true,
                      }}
                    />
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
