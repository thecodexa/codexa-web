import HomeLayout from "./layouts/HomeLayout";
import { AuthProvider } from "./context/authContext";
import ProblemPage from "./Pages/editor";
import ProfilePage from "./Pages/Profilepage";
import ContestRegisterPage from "./Pages/Contestregisterpage";
function App() {
  return (
    <AuthProvider>
      {/* <ProblemPage />; */}
      <ProfilePage/> 
      {/* <HomeLayout /> */}
      {/* <ContestRegisterPage /> */}
    </AuthProvider>
  );
}

export default App;
