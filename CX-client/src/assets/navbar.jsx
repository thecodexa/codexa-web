const Navbar = () => {
  return (
    <nav className="flex sticky top-0 z-50 justify-between items-center p-6">
      <h1 className="text-white text-4xl font-bold">codeXa</h1>
      <div className="space-x-6 text-gray-300">
        <a href="#">Features</a>
        <a href="#">Contests</a>
        <a href="#">About</a>
        <button className="bg-gray-800 px-4 py-1 rounded">Login</button>
      </div>
    </nav>
  );
};
export default Navbar;
