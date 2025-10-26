import HomeLayout from "./layouts/HomeLayout";
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
import ProblemPage from "./Pages/editor";
import ProfilePage from "./Pages/Profilepage";
import ContestsPage1 from "./Pages/contest1";
function App() {
  return (
    <UserProvider>
    <AuthProvider>
      {/* <ProblemPage />; */}
      {/* <ProfilePage /> */}
      {/* <HomeLayout /> */}
      {/* <ContestRegisterPage /> */}
      <HomeLayout />;
      {/* <ContestsPage1 />; */}
      {/* <ProblemPage />; */}
    </AuthProvider>
    </UserProvider>
  );
}

export default App;
