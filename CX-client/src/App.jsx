import HomeLayout from "./layouts/HomeLayout";
import { AuthProvider } from "./context/authContext";
import ProblemPage from "./Pages/editor";
import ContestsPage from "./Pages/contest";
import { Home } from "lucide-react";
function App() {
  return (
    <AuthProvider>
      {/* <HomeLayout />; */}
      <ContestsPage />;{/* <ProblemPage />; */}
    </AuthProvider>
  );
}

export default App;
