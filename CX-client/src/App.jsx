import HomeLayout from "./layouts/HomeLayout";
import { AuthProvider } from "./context/authContext";
function App() {
  return (
    <AuthProvider>
      <HomeLayout />;
    </AuthProvider>
  );
}

export default App;
