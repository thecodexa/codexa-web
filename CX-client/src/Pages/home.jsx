const Home = () => {
    return (
        <div className="bg-[#0D111A] p-5">
            <div className="bg-[#070B13] rounded-lg shadow-lg">
                <nav className="flex justify-between items-center p-6">
                    <h1 className="text-white text-4xl font-bold">codeXa</h1>
                    <div className="space-x-6 text-gray-300">
                        <a href="#">Features</a>
                        <a href="#">Contests</a>
                        <a href="#">About</a>
                        <button className="bg-gray-800 px-4 py-1 rounded">Login</button>
                    </div>
                </nav>
                <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16">
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
                            Coding Contests and Quizzes for Students
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Participate in programming contests, take quizzes, and join events tailored for college.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white">
                            Get Started
                        </button>
                    </div>
                    <div className="mt-10 md:mt-0">
                        <div className="w-64 h-40 bg-gray-800 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">[Code Image]</p>
                        </div>
                    </div>
                </section>
                <div className="px-10 md:px-20 py-12">
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#0C121E] p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-white">Contests</h3>
                            <p className="text-gray-400 mt-2">Participate in coding contests</p>
                        </div>
                        <div className="bg-[#0C121E] p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-white">Quizzes</h3>
                            <p className="text-gray-400 mt-2">Test your coding knowledge</p>
                        </div>
                        <div className="bg-[#0C121E] p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-white">Events</h3>
                            <p className="text-gray-400 mt-2">Join college programming events</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Home;

/*

outer div - #0D111A
inner div - #070B13

contest div background - #0C121E

*/