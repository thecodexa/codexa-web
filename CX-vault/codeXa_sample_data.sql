--
-- CodeXa Web - Sample Data for Initial Setup
-- This file contains realistic seed data for testing and demonstration
-- Insert this data after creating the database schema
-- Last Updated: 2025-09-24
--

-- ============================================================================
-- SAMPLE BATCHES
-- ============================================================================

INSERT INTO batches (name, year) VALUES 
('B.Tech CSE - 2024', 2024),
('B.Tech CSE - 2025', 2025),
('B.Tech IT - 2024', 2024),
('M.Tech CSE - 2024', 2024),
('B.Tech ECE - 2025', 2025);

-- ============================================================================
-- SAMPLE USERS
-- ============================================================================

-- Admin Users
INSERT INTO users (user_name, first_name, last_name, email, password_hash, role, is_active) VALUES 
('admin_john', 'John', 'Admin', 'john.admin@codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'admin', true),
('admin_sarah', 'Sarah', 'Administrator', 'sarah.admin@codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'admin', true);

-- Teacher Users
INSERT INTO users (user_name, first_name, last_name, email, password_hash, role, batch_id, is_active) VALUES 
('prof_ramesh', 'Ramesh', 'Kumar', 'ramesh.kumar@codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'teacher', 1, true),
('prof_priya', 'Priya', 'Singh', 'priya.singh@codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'teacher', 1, true),
('prof_amit', 'Amit', 'Patel', 'amit.patel@codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'teacher', 2, true),
('prof_neha', 'Neha', 'Sharma', 'neha.sharma@codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'teacher', 3, true);

-- Student Users - Batch 2024
INSERT INTO users (user_name, first_name, last_name, email, password_hash, role, batch_id, is_active) VALUES 
('student_arjun', 'Arjun', 'Verma', 'arjun.verma@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 1, true),
('student_divya', 'Divya', 'Gupta', 'divya.gupta@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 1, true),
('student_rohan', 'Rohan', 'Singh', 'rohan.singh@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 1, true),
('student_sakshi', 'Sakshi', 'Mishra', 'sakshi.mishra@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 1, true),
('student_vikram', 'Vikram', 'Joshi', 'vikram.joshi@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 1, true),
('student_aisha', 'Aisha', 'Khan', 'aisha.khan@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 1, true),
('student_nikhil', 'Nikhil', 'Yadav', 'nikhil.yadav@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 1, true),
('student_pooja', 'Pooja', 'Reddy', 'pooja.reddy@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 1, true);

-- Student Users - Batch 2025
INSERT INTO users (user_name, first_name, last_name, email, password_hash, role, batch_id, is_active) VALUES 
('student_raj', 'Raj', 'Kumar', 'raj.kumar@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 2, true),
('student_priya_s', 'Priya', 'Sharma', 'priya.sharma@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 2, true),
('student_varun', 'Varun', 'Chopra', 'varun.chopra@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 2, true),
('student_ananya', 'Ananya', 'Das', 'ananya.das@student.codexa.edu', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'student', 2, true);

-- ============================================================================
-- SAMPLE CONTESTS
-- ============================================================================

INSERT INTO contests (title, description, created_by, start_time, end_time) VALUES 
(
  'Coding Challenge - Week 1',
  'A beginner-friendly coding challenge to warm up your coding skills. Perfect for students new to competitive programming.',
  2,
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '6 days'
),
(
  'Algorithm Mastery Contest',
  'Test your algorithmic thinking with problems on sorting, searching, dynamic programming, and graph algorithms.',
  3,
  NOW() + INTERVAL '2 days',
  NOW() + INTERVAL '4 days'
),
(
  'Data Structures Sprint',
  'Master fundamental data structures through practical problems. Topics include arrays, linked lists, trees, and heaps.',
  2,
  NOW() + INTERVAL '7 days',
  NOW() + INTERVAL '9 days'
),
(
  'Competitive Programming Round 1',
  'The first round of our semester-long competitive programming series. Multiple difficulty levels for everyone.',
  3,
  NOW() - INTERVAL '2 days',
  NOW() + INTERVAL '5 days'
),
(
  'Interview Preparation Series',
  'Practice problems commonly asked in technical interviews. Build your confidence and improve your problem-solving skills.',
  2,
  NOW() + INTERVAL '14 days',
  NOW() + INTERVAL '16 days'
);

-- ============================================================================
-- SAMPLE PROBLEMS
-- ============================================================================

-- Problems for Contest 1 (Coding Challenge - Week 1) - PAST
INSERT INTO problems (contest_id, title, description, difficulty, max_score, time_limit, memory_limit, input_format, output_format) VALUES 
(
  1,
  'Simple Sum',
  'Given an array of integers, find the sum of all elements.\n\nConstraints:\n- 1 ≤ N ≤ 1000\n- 1 ≤ arr[i] ≤ 1000',
  'easy',
  10,
  1,
  256,
  'First line contains N (number of elements).\nSecond line contains N space-separated integers.',
  'Print the sum of all elements.'
),
(
  1,
  'Count Vowels',
  'Count the number of vowels in a given string.\n\nConstraints:\n- 1 ≤ Length ≤ 1000',
  'easy',
  10,
  1,
  256,
  'A single line containing a string.',
  'Print the count of vowels.'
),
(
  1,
  'Reverse String',
  'Reverse the given string without using built-in reverse functions.\n\nConstraints:\n- 1 ≤ Length ≤ 10000',
  'medium',
  20,
  2,
  256,
  'A single line containing a string.',
  'Print the reversed string.'
);

-- Problems for Contest 2 (Algorithm Mastery Contest) - UPCOMING
INSERT INTO problems (contest_id, title, description, difficulty, max_score, time_limit, memory_limit, input_format, output_format) VALUES 
(
  2,
  'Binary Search Implementation',
  'Implement binary search to find a target element in a sorted array.\n\nConstraints:\n- 1 ≤ N ≤ 100000\n- Array is sorted in ascending order',
  'medium',
  30,
  2,
  256,
  'First line: N (array size)\nSecond line: N space-separated integers\nThird line: Target element to search',
  'Print the index of target element, or -1 if not found.'
),
(
  2,
  'Merge Sorted Arrays',
  'Merge two sorted arrays into one sorted array.\n\nConstraints:\n- 1 ≤ N, M ≤ 100000',
  'medium',
  30,
  2,
  512,
  'First line: N (size of first array)\nSecond line: N space-separated integers\nThird line: M (size of second array)\nFourth line: M space-separated integers',
  'Print the merged sorted array.'
),
(
  2,
  'Longest Increasing Subsequence',
  'Find the length of the longest increasing subsequence in an array.\n\nConstraints:\n- 1 ≤ N ≤ 1000\n- -1000 ≤ arr[i] ≤ 1000',
  'hard',
  50,
  3,
  512,
  'First line: N (array size)\nSecond line: N space-separated integers',
  'Print the length of the longest increasing subsequence.'
),
(
  2,
  'Graph Traversal - DFS',
  'Implement Depth First Search on a graph.\n\nConstraints:\n- 1 ≤ V ≤ 1000\n- 1 ≤ E ≤ 10000',
  'hard',
  50,
  3,
  512,
  'First line: V (vertices), E (edges)\nNext E lines: u, v (edge between u and v)',
  'Print the DFS traversal order starting from node 0.'
);

-- Problems for Contest 3 (Data Structures Sprint)
INSERT INTO problems (contest_id, title, description, difficulty, max_score, time_limit, memory_limit, input_format, output_format) VALUES 
(
  3,
  'Stack Operations',
  'Implement a stack and perform basic operations: push, pop, peek.\n\nConstraints:\n- 1 ≤ Operations ≤ 10000',
  'easy',
  15,
  1,
  256,
  'First line: Number of operations\nNext lines: Operation type and value',
  'Print results of each operation.'
),
(
  3,
  'Queue Implementation',
  'Implement a queue with enqueue and dequeue operations.\n\nConstraints:\n- 1 ≤ Operations ≤ 10000',
  'easy',
  15,
  1,
  256,
  'First line: Number of operations\nNext lines: Operation type and value',
  'Print results of each operation.'
),
(
  3,
  'Balanced Parentheses',
  'Check if a string contains balanced parentheses.\n\nConstraints:\n- 1 ≤ Length ≤ 10000',
  'medium',
  25,
  2,
  256,
  'A single line containing a string with parentheses.',
  'Print "Yes" if balanced, "No" otherwise.'
);

-- Problems for Contest 4 (Competitive Programming Round 1) - ONGOING
INSERT INTO problems (contest_id, title, description, difficulty, max_score, time_limit, memory_limit, input_format, output_format) VALUES 
(
  4,
  'Find Maximum Element',
  'Find the maximum element in an unsorted array.\n\nConstraints:\n- 1 ≤ N ≤ 100000\n- -10^9 ≤ arr[i] ≤ 10^9',
  'easy',
  10,
  1,
  256,
  'First line: N (array size)\nSecond line: N space-separated integers',
  'Print the maximum element.'
),
(
  4,
  'Two Sum Problem',
  'Given an array and a target sum, find two numbers that add up to the target.\n\nConstraints:\n- 1 ≤ N ≤ 100000',
  'medium',
  30,
  2,
  256,
  'First line: N (array size)\nSecond line: N space-separated integers\nThird line: Target sum',
  'Print indices of the two numbers (0-indexed, space-separated).'
),
(
  4,
  'String Compression',
  'Compress a string by replacing consecutive characters with character and count.\n\nConstraints:\n- 1 ≤ Length ≤ 10000',
  'medium',
  30,
  2,
  256,
  'A single line containing a string.',
  'Print the compressed string.'
),
(
  4,
  'Word Ladder',
  'Find the shortest path from start word to end word, changing one letter at a time.\n\nConstraints:\n- Dictionary size ≤ 10000',
  'hard',
  50,
  4,
  512,
  'First line: Start word\nSecond line: End word\nThird line: Dictionary size\nNext lines: Dictionary words',
  'Print the length of the shortest path.'
);

-- ============================================================================
-- SAMPLE CONTEST REGISTRATIONS
-- ============================================================================

-- Students registering for Contest 1 (Past Contest)
INSERT INTO contest_registrations (user_id, contest_id, status, total_score) VALUES 
(6, 1, 'completed', 40),
(7, 1, 'completed', 30),
(8, 1, 'completed', 35),
(9, 1, 'completed', 20),
(10, 1, 'completed', 50),
(11, 1, 'completed', 45),
(12, 1, 'completed', 25),
(13, 1, 'completed', 40);

-- Students registering for Contest 2 (Upcoming)
INSERT INTO contest_registrations (user_id, contest_id, status) VALUES 
(6, 2, 'registered'),
(7, 2, 'registered'),
(8, 2, 'registered'),
(9, 2, 'registered'),
(10, 2, 'registered'),
(14, 2, 'registered'),
(15, 2, 'registered');

-- Students registering for Contest 3 (Upcoming)
INSERT INTO contest_registrations (user_id, contest_id, status) VALUES 
(6, 3, 'registered'),
(7, 3, 'registered'),
(11, 3, 'registered'),
(12, 3, 'registered'),
(13, 3, 'registered'),
(14, 3, 'registered');

-- Students registering for Contest 4 (Ongoing)
INSERT INTO contest_registrations (user_id, contest_id, status, total_score) VALUES 
(6, 4, 'participated', 70),
(7, 4, 'participated', 40),
(8, 4, 'participated', 60),
(9, 4, 'participated', 10),
(10, 4, 'participated', 100),
(11, 4, 'participated', 80),
(12, 4, 'participated', 50),
(13, 4, 'participated', 70),
(14, 4, 'registered', 0),
(15, 4, 'registered', 0);

-- ============================================================================
-- SAMPLE SUBMISSIONS
-- ============================================================================

-- Submissions for Contest 1, Problem 1 (Simple Sum)
INSERT INTO submissions (problem_id, user_id, code, language, status, score, time_taken, memory_used) VALUES 
(
  1,
  6,
  'int main() {\n  int n, sum = 0;\n  cin >> n;\n  for(int i = 0; i < n; i++) {\n    int x;\n    cin >> x;\n    sum += x;\n  }\n  cout << sum;\n  return 0;\n}',
  'C++',
  'Accepted',
  10,
  0.25,
  5120
),
(
  1,
  7,
  'n = int(input())\narr = list(map(int, input().split()))\nprint(sum(arr))',
  'Python',
  'Accepted',
  10,
  0.45,
  8192
),
(
  1,
  8,
  'Scanner sc = new Scanner(System.in);\nint n = sc.nextInt();\nint sum = 0;\nfor(int i = 0; i < n; i++) {\n  sum += sc.nextInt();\n}\nSystem.out.println(sum);',
  'Java',
  'Accepted',
  10,
  0.35,
  10240
),
(
  1,
  9,
  'n = int(input())\narr = list(map(int, input().split()))',
  'Python',
  'Compile Error',
  0,
  0.1,
  2048
),
(
  1,
  10,
  'int main() {\n  int n, sum = 0;\n  cin >> n;\n  for(int i = 0; i < n; i++) {\n    int x;\n    cin >> x;\n    sum += x;\n  }\n  cout << sum;\n  return 0;\n}',
  'C++',
  'Accepted',
  10,
  0.22,
  4096
);

-- Submissions for Contest 1, Problem 2 (Count Vowels)
INSERT INTO submissions (problem_id, user_id, code, language, status, score, time_taken, memory_used) VALUES 
(
  2,
  6,
  'string s;\ngetline(cin, s);\nint count = 0;\nfor(char c : s) {\n  if(c == ''a'' || c == ''e'' || c == ''i'' || c == ''o'' || c == ''u'' || c == ''A'' || c == ''E'' || c == ''I'' || c == ''O'' || c == ''U'') {\n    count++;\n  }\n}\ncout << count;',
  'C++',
  'Accepted',
  10,
  0.3,
  5120
),
(
  2,
  10,
  's = input()\nvowels = "aeiouAEIOU"\ncount = sum(1 for c in s if c in vowels)\nprint(count)',
  'Python',
  'Accepted',
  10,
  0.4,
  7168
);

-- Submissions for Contest 1, Problem 3 (Reverse String)
INSERT INTO submissions (problem_id, user_id, code, language, status, score, time_taken, memory_used) VALUES 
(
  3,
  6,
  'string s;\ngetline(cin, s);\nreverse(s.begin(), s.end());\ncout << s;',
  'C++',
  'Wrong Answer',
  10,
  0.5,
  4096
),
(
  3,
  10,
  'string s;\ngetline(cin, s);\nfor(int i = s.length() - 1; i >= 0; i--) {\n  cout << s[i];\n}',
  'C++',
  'Accepted',
  20,
  0.28,
  4096
),
(
  3,
  11,
  'string s;\ngetline(cin, s);\nfor(int i = s.length() - 1; i >= 0; i--) {\n  cout << s[i];\n}',
  'C++',
  'Accepted',
  20,
  0.31,
  4096
);

-- Submissions for Contest 4 (Ongoing), Problem 7 (Find Maximum)
INSERT INTO submissions (problem_id, user_id, code, language, status, score, time_taken, memory_used) VALUES 
(
  16,
  6,
  'int main() {\n  int n;\n  cin >> n;\n  int maxVal = INT_MIN;\n  for(int i = 0; i < n; i++) {\n    int x;\n    cin >> x;\n    maxVal = max(maxVal, x);\n  }\n  cout << maxVal;\n  return 0;\n}',
  'C++',
  'Accepted',
  10,
  0.2,
  4096
),
(
  16,
  7,
  'n = int(input())\narr = list(map(int, input().split()))\nprint(max(arr))',
  'Python',
  'Accepted',
  10,
  0.35,
  7168
),
(
  16,
  10,
  'int main() {\n  int n;\n  cin >> n;\n  int maxVal = INT_MIN;\n  for(int i = 0; i < n; i++) {\n    int x;\n    cin >> x;\n    maxVal = max(maxVal, x);\n  }\n  cout << maxVal;\n  return 0;\n}',
  'C++',
  'Accepted',
  10,
  0.19,
  4096
);

-- Submissions for Contest 4, Problem 8 (Two Sum)
INSERT INTO submissions (problem_id, user_id, code, language, status, score, time_taken, memory_used) VALUES 
(
  17,
  6,
  'int main() {\n  int n, target;\n  cin >> n >> target;\n  unordered_map<int, int> map;\n  for(int i = 0; i < n; i++) {\n    int x;\n    cin >> x;\n    if(map.find(target - x) != map.end()) {\n      cout << map[target - x] << " " << i;\n      return 0;\n    }\n    map[x] = i;\n  }\n  return 0;\n}',
  'C++',
  'Accepted',
  30,
  0.45,
  8192
),
(
  17,
  10,
  'n = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())\nfor i in range(n):\n  for j in range(i + 1, n):\n    if arr[i] + arr[j] == target:\n      print(i, j)\n      break',
  'Python',
  'Accepted',
  30,
  1.2,
  12288
),
(
  17,
  8,
  'n = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())',
  'Python',
  'Runtime Error',
  0,
  0.8,
  8192
);

-- Submissions for Contest 4, Problem 9 (String Compression)
INSERT INTO submissions (problem_id, user_id, code, language, status, score, time_taken, memory_used) VALUES 
(
  18,
  10,
  'string s;\ngetline(cin, s);\nstring result = "";\nint count = 1;\nfor(int i = 1; i < s.length(); i++) {\n  if(s[i] == s[i-1]) {\n    count++;\n  } else {\n    result += s[i-1];\n    result += to_string(count);\n    count = 1;\n  }\n}\nresult += s[s.length()-1];\nresult += to_string(count);\ncout << result;',
  'C++',
  'Accepted',
  30,
  0.55,
  5120
),
(
  18,
  11,
  'def compress(s):\n  result = ""\n  i = 0\n  while i < len(s):\n    count = 1\n    while i + 1 < len(s) and s[i] == s[i + 1]:\n      count += 1\n      i += 1\n    result += s[i] + str(count)\n    i += 1\n  return result\ns = input()\nprint(compress(s))',
  'Python',
  'Accepted',
  30,
  0.65,
  9216
);

-- ============================================================================
-- NOTES FOR DEPLOYMENT
-- ============================================================================

-- Password Hash Notes:
-- All sample users have password_hash: $2b$10$abcdefghijklmnopqrstuvwxyz
-- In production, replace with actual bcrypt hashes
-- Example users:
-- - username: admin_john, password: (set during deployment)
-- - username: prof_ramesh, password: (set during deployment)
-- - username: student_arjun, password: (set during deployment)
--
-- This sample data includes:
-- - 2 Admin users
-- - 4 Teacher users
-- - 12 Students (8 from 2024 batch, 4 from 2025 batch)
-- - 5 Contests (1 past, 1 ongoing, 1 upcoming, 2 future)
-- - 17 Problems across contests
-- - Contest registrations and submissions showing typical usage patterns
--
-- The data demonstrates:
-- - User roles and batch assignments
-- - Contest lifecycle (past, ongoing, upcoming)
-- - Different problem difficulties
-- - Various submission statuses (Accepted, Wrong Answer, Compile Error, Runtime Error)
-- - Performance tracking with scores
--
-- To reset sample data:
-- TRUNCATE TABLE submissions CASCADE;
-- TRUNCATE TABLE contest_registrations CASCADE;
-- TRUNCATE TABLE problems CASCADE;
-- TRUNCATE TABLE contests CASCADE;
-- TRUNCATE TABLE users CASCADE;
-- TRUNCATE TABLE batches CASCADE;
--
-- Then re-run this file to populate fresh sample data.