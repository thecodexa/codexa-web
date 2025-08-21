import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import QuestionsDropdown from "../components/questionsdropdown";
import "../index.css";

export default function ProblemPage() {
  const [code, setCode] = useState(`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // your solution here
    }
};`);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");

  function runCode() {
    // placeholder runner
    setOutput("Sample Output:\n[0, 1]");
  }

  return (
    // outer container: fixed full-screen and prevent body scrolling
    <div className="h-screen bg-[#0D111A] text-white overflow-hidden flex flex-col fixed">
      {/* NAVBAR */}
      <nav className="bg-gray-900 flex items-center justify-between px-6 py-3 border-b border-gray-800">
        <div className="flex items-center space-x-6">
          <span className="text-white text-2xl font-bold">codeXa</span>

          <QuestionsDropdown
            questions={[
              "Question 1: Two Sum",
              "Question 2: Add Two Numbers",
              "Question 3: Longest Substring Without Repeating Characters",
            ]}
          />
        </div>

        <div className="space-x-6 text-gray-300">
          <a href="#" className="hover:text-white">
            Register
          </a>
          <a href="#" className="hover:text-white">
            Login
          </a>
        </div>
      </nav>

      {/* MAIN: two-column resizable panels
          We wrap PanelGroup in a flex-1/min-h-0 so panels get full height
      */}
      <div className="flex-1 min-h-0">
        <PanelGroup direction="horizontal">
          {/* LEFT: DESCRIPTION PANEL */}
          <Panel defaultSize={48} minSize={20}>
            <div className="flex flex-col h-full min-h-0 border-r border-gray-800">
              {/* top: tabs bar (Description / Editorial / Solutions / Submissions) */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 bg-gray-900">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded bg-[#111827] text-white font-semibold">
                    Description
                  </button>
                  {/* <button className="px-3 py-1 rounded text-gray-300 hover:bg-gray-800">
                    Editorial
                  </button>
                  <button className="px-3 py-1 rounded text-gray-300 hover:bg-gray-800">
                    Solutions
                  </button>
                  <button className="px-3 py-1 rounded text-gray-300 hover:bg-gray-800">
                    Submissions
                  </button> */}
                </div>
                {/* <div className="ml-auto text-sm text-gray-400">1151 Online</div> */}
              </div>

              {/* DESCRIPTION CONTENT */}
              {/* IMPORTANT: flex-1 + min-h-0 + overflow-y-auto + overscroll-contain */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6">
                <div className="bg-gray-800 p-6 rounded-md shadow-sm">
                  <h1 className="text-2xl font-bold mb-4">1. Two Sum</h1>

                  {/* <div className="inline-block mb-4">
                    <button className="bg-[#0E7490] px-3 py-1 rounded text-sm mr-2">
                      Discuss Approach
                    </button>
                    <span className="text-xs text-gray-400 ml-2">Easy</span>
                  </div> */}

                  <p className="text-gray-300 leading-relaxed mb-4">
                    Given an array of integers{" "}
                    <code className="bg-[#0F1720] px-1 rounded">nums</code> and
                    an integer{" "}
                    <code className="bg-[#0F1720] px-1 rounded">target</code>,
                    return{" "}
                    <em>
                      indices of the two numbers such that they add up to target
                    </em>
                    .
                  </p>

                  <p className="text-gray-300 mb-6">
                    You may assume that each input would have{" "}
                    <strong>exactly one solution</strong>, and you may not use
                    the same element twice.
                  </p>

                  <h3 className="text-lg font-semibold mb-3">Example</h3>
                  <pre className="bg-[#0B1220] p-4 rounded-md mb-6 overflow-auto">
                    {`Input: nums = [2,7,11,15], target = 9
Output: [0,1]`}
                  </pre>

                  {/* filler: long description to test scroll (remove in production) */}
                  <div className="text-gray-300 space-y-2">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <p key={i}>
                        Extra description line to test scrolling behavior. Line{" "}
                        {i + 1}.
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-800 cursor-col-resize" />

          {/* RIGHT: EDITOR + TESTCASES (vertical split) */}
          <Panel defaultSize={52} minSize={30}>
            <PanelGroup direction="vertical">
              {/* EDITOR */}
              <Panel defaultSize={66} minSize={40}>
                <div className="flex flex-col h-full min-h-0">
                  {/* Editor Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-300">Code</span>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-gray-800 px-2 py-1 rounded text-sm"
                      >
                        <option value="cpp">C++</option>
                        <option value="js">JavaScript</option>
                        <option value="py">Python</option>
                      </select>
                      <span className="text-xs text-gray-400">Auto</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={runCode}
                        className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 text-sm"
                      >
                        Run
                      </button>
                      <button className="bg-gray-800 px-3 py-1 rounded text-sm">
                        Submit
                      </button>
                    </div>
                  </div>

                  {/* Monaco Editor container: must be flex-1 min-h-0 for proper inner sizing */}
                  <div className="flex-1 min-h-0">
                    <div className="h-full">
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
                        value={code}
                        onChange={(val) => setCode(val)}
                        options={{
                          fontSize: 13,
                          minimap: { enabled: false },
                          wordWrap: "on",
                          automaticLayout: true,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-1 bg-gray-800 cursor-row-resize" />

              {/* TEST CASES */}
              <Panel defaultSize={34} minSize={15}>
                <div className="flex flex-col h-full min-h-0 bg-gray-900 border-t border-gray-800">
                  {/* testcases header - tabs */}
                  <div className="px-4 py-2 border-b border-gray-800 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 rounded bg-gray-800 text-gray-200">
                        Case 1
                      </button>
                      <button className="px-3 py-1 rounded text-gray-300 hover:bg-gray-800">
                        Case 2
                      </button>
                      <button className="px-3 py-1 rounded text-gray-300 hover:bg-gray-800">
                        Case 3
                      </button>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">
                      Test Result
                    </div>
                  </div>

                  {/* testcases content: important -> overflow-y-auto + min-h-0 + overscroll-contain */}
                  <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4">
                    <div className="bg-gray-800 p-4 rounded-md space-y-3">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Input:</div>
                        <pre className="bg-[#0B1220] p-3 rounded">{`nums = [2,7,11,15]\ntarget = 9`}</pre>
                      </div>

                      <div>
                        <div className="text-xs text-gray-400 mb-1">
                          Output:
                        </div>
                        <pre className="bg-black p-3 rounded text-green-300">
                          {output || "—"}
                        </pre>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <button className="px-3 py-1 rounded bg-gray-800 text-gray-200">
                          Run Case
                        </button>
                        <button className="px-3 py-1 rounded text-gray-300 hover:bg-gray-800">
                          Edit Case
                        </button>
                      </div>
                    </div>
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
