import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
import ProblemPage from "./Pages/editor";
import ProfilePage from "./Pages/Profilepage";
import ContestsPage1 from "./Pages/contest1";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import CreateContestPage from "./Pages/CreateContestPage";
import CreateQuestionPage from "./Pages/CreateQuestionPage";
import ContestDetailsPage from "./Pages/ContestDetailsPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResultPage from "./Pages/ResultPage";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <UserProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />

              <Route path="/home" element={<HomeLayout />} />
              <Route path="/create-contest" element={<CreateContestPage />} />
              <Route path="/create-question" element={<CreateQuestionPage />} />
              <Route
                path="/contest/:contestId"
                element={<ContestDetailsPage />}
              />
              <Route
                path="/results/:contestId"
                element={
                  <ProtectedRoute>
                    <ResultPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/contest/:contestId/problem/:problemId"
                element={<ProblemPage />}
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/contests"
                element={
                  <ProtectedRoute>
                    <ContestsPage1 />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>

          {/* <ProblemPage />; */}
          {/* <ProfilePage /> */}
          {/* <HomeLayout /> */}
          {/* <ContestRegisterPage /> */}
          {/* <HomeLayout />; */}
          {/* <ContestsPage1 />; */}
          {/* <ProblemPage />; */}
        </AuthProvider>
      </UserProvider>
    </>
  );
}

export default App;
