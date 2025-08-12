import HomeLayout from "./layouts/HomeLayout";
import { AuthProvider } from "./context/authContext";
import ProblemPage from "./Pages/editor";
function App() {
  return (
    <AuthProvider>
      <ProblemPage />;
    </AuthProvider>
  );
}

export default App;
