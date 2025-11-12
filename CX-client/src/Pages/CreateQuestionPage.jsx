import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Navbar from "../components/navbar";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateQuestionPage() {
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    marks: "",
    testcases: [{ input: "", output: "" }],
  });

  // Editors
  const [fullSolutionCode, setFullSolutionCode] = useState(
    `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Correct logic here
    }
};

int main() {
    Solution s;
    vector<int> nums = {2,7,11,15};
    int target = 9;
    vector<int> ans = s.twoSum(nums, target);
    for (auto x : ans) cout << x << " ";
    return 0;
}`
  );

  const [testHarnessCode, setTestHarnessCode] = useState(
    `#include <bits/stdc++.h>
using namespace std;

int main() {
    Solution obj; // from student submission
    vector<int> nums = {2,7,11,15};
    int target = 9;
    vector<int> ans = obj.twoSum(nums, target);
    for (auto x : ans) cout << x << " ";
    return 0;
}`
  );

  const [starterCode, setStarterCode] = useState(
    `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // your code here
    }
};`
  );

  const navigate = useNavigate();
  const location = useLocation();
  const previousContest = location.state?.contest;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCase = () => {
    setQuestion((prev) => ({
      ...prev,
      testcases: [...prev.testcases, { input: "", output: "" }],
    }));
  };

  const handleSave = () => {
    const updatedContest = {
      ...previousContest,
      questions: [
        ...(previousContest?.questions || []),
        {
          title: question.title,
          marks: Number(question.marks),
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
                    placeholder='e.g. "Two Sum" or "Longest Common Prefix"'
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
                    placeholder={`Describe the problem in detail.\n\nExample:\nGiven an array of integers nums and an integer target, return indices of the two numbers that add up to target.`}
                  />
                </div>

                {/* Input Format */}
                <div>
                  <label className="block mb-2 text-gray-300 text-lg font-semibold">
                    📥 Input Format
                  </label>
                  <textarea
                    name="inputFormat"
                    value={question.inputFormat}
                    onChange={handleChange}
                    className="w-full bg-gray-800 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                    rows="3"
                    placeholder={`Example:\nThe first line contains an integer n.\nThe second line contains n space-separated integers.\nThe third line contains the target value.`}
                  />
                </div>

                {/* Output Format */}
                <div>
                  <label className="block mb-2 text-gray-300 text-lg font-semibold">
                    📤 Output Format
                  </label>
                  <textarea
                    name="outputFormat"
                    value={question.outputFormat}
                    onChange={handleChange}
                    className="w-full bg-gray-800 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                    rows="3"
                    placeholder={`Example:\nPrint two integers representing the indices of the elements that add up to target.`}
                  />
                </div>

                {/* Constraints */}
                <div>
                  <label className="block mb-2 text-gray-300 text-lg font-semibold">
                    ⚙️ Constraints
                  </label>
                  <textarea
                    name="constraints"
                    value={question.constraints}
                    onChange={handleChange}
                    className="w-full bg-gray-800 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                    rows="3"
                    placeholder={`Example:\n2 <= n <= 10^4\n-10^9 <= nums[i], target <= 10^9\nExactly one valid answer exists.`}
                  />
                </div>

                {/* Marks */}
                <div>
                  <label className="block mb-2 text-gray-300 text-lg font-semibold">
                    🏆 Marks
                  </label>
                  <input
                    name="marks"
                    type="number"
                    value={question.marks}
                    onChange={handleChange}
                    className="w-32 bg-gray-800 rounded-md px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                    placeholder="e.g. 10"
                  />
                </div>

                {/* Example Test Cases */}
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
                    {question.testcases.map((tc, i) => (
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
                              const val = e.target.value;
                              setQuestion((prev) => {
                                const updated = [...prev.testcases];
                                updated[i].input = val;
                                return { ...prev, testcases: updated };
                              });
                            }}
                            className="w-full bg-[#0B1220] rounded-md px-2 py-1 text-sm"
                            rows="2"
                            placeholder={`Example:\n4\n2 7 11 15\n9`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            Expected Output:
                          </label>
                          <textarea
                            value={tc.output}
                            onChange={(e) => {
                              const val = e.target.value;
                              setQuestion((prev) => {
                                const updated = [...prev.testcases];
                                updated[i].output = val;
                                return { ...prev, testcases: updated };
                              });
                            }}
                            className="w-full bg-[#0B1220] rounded-md px-2 py-1 text-sm"
                            rows="2"
                            placeholder={`Example:\n0 1`}
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
              {/* FULL SOLUTION */}
              <Panel defaultSize={33} minSize={20}>
                <div className="flex flex-col h-full bg-[#0C121E] border-b border-gray-800">
                  <div className="px-4 py-3 bg-gray-900 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-cyan-400">
                      🟩 Full Solution (Used for Output Generation)
                    </h3>
                  </div>
                  <div className="flex-1 min-h-0">
                    <MonacoEditor
                      width="100%"
                      height="100%"
                      language="cpp"
                      theme="vs-dark"
                      value={fullSolutionCode}
                      onChange={(val) => setFullSolutionCode(val)}
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

              {/* TEST HARNESS */}
              <Panel defaultSize={33} minSize={20}>
                <div className="flex flex-col h-full bg-[#0C121E] border-b border-gray-800">
                  <div className="px-4 py-3 bg-gray-900 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-cyan-400">
                      🟦 Test Harness (Main Function)
                    </h3>
                  </div>
                  <div className="flex-1 min-h-0">
                    <MonacoEditor
                      width="100%"
                      height="100%"
                      language="cpp"
                      theme="vs-dark"
                      value={testHarnessCode}
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

              {/* STARTER CODE */}
              <Panel defaultSize={33} minSize={20}>
                <div className="flex flex-col h-full bg-[#0C121E]">
                  <div className="px-4 py-3 bg-gray-900 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-cyan-400">
                      🟨 Starter Code (Visible to Students)
                    </h3>
                  </div>
                  <div className="flex-1 min-h-0">
                    <MonacoEditor
                      width="100%"
                      height="100%"
                      language="cpp"
                      theme="vs-dark"
                      value={starterCode}
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
