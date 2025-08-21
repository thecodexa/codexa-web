import HomeLayout from "./layouts/HomeLayout";
import { AuthProvider } from "./context/authContext";
import ProblemPage from "./Pages/editor";
import ProfilePage from "./Pages/Profilepage";
import ContestRegisterPage from "./Pages/Contestregisterpage";
import ContestsPage from "./Pages/contest";
import { Home } from "lucide-react";
function App() {
  return (
    <AuthProvider>
      {/* <ProblemPage />; */}
      <ProfilePage />
      {/* <HomeLayout /> */}
      {/* <ContestRegisterPage /> */}
      {/* <HomeLayout />; */}
      <ContestsPage />;{/* <ProblemPage />; */}
    </AuthProvider>
  );
}

export default App;
