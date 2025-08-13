import { useAuth } from "../context/authContext";
const Navbar = () => {
  const { setAuthType } = useAuth();
  return (
    <nav className="flex sticky top-0 z-50 justify-between items-center p-6 bg-[#070B13] ">
      <h1 className="text-white text-4xl font-bold">codeXa</h1>
      <div className="space-x-6 text-gray-300">
        {/* <a href="#">Features</a> */}
        <a href="#">Contests</a>
        <a href="#">About</a>
        <button
          onClick={() => setAuthType("login")}
          className="bg-gray-800 px-4 py-1 rounded hover:bg-cyan-500 hover:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all"
        >
          Login
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
