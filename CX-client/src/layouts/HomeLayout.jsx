import { useState } from "react";
import Navbar from "../components/navbar";
import LoginModal from "../components/loginModal";
import LoginTile from "../components/logintile";
import Home from "../Pages/home";
import IlluminatedText from "../Pages/itext";
import SignupTile from "../components/signupTile";
import { useAuth } from "../context/authContext";

const HomeLayout = () => {
  const { authType, setAuthType } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div className=" min-h-screen text-white">
      <Home />
      <LoginModal isOpen={authType !== null} onClose={() => setAuthType(null)}>
        {authType === "login" && <LoginTile />}
        {authType === "signup" && <SignupTile />}
      </LoginModal>
    </div>
  );
};

export default HomeLayout;
