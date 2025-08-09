import HomeSectionCard from "../assets/homeSectionCard";
import Navbar from "../assets/navbar";
import { Trophy, CalendarDays, ClipboardList } from "lucide-react";
const Home = () => {
  return (
    <div className="bg-[#0D111A] p-5">
      <div className="bg-[#070B13] rounded-lg shadow-lg">
        <Navbar />
        <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Coding Contests and Quizzes for Students
            </h2>
            <p className="text-gray-400 mb-6">
              Participate in programming contests, take quizzes, and join events
              tailored for college.
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
            <HomeSectionCard
              icon={Trophy}
              title="Contests"
              description="Test your coding knowledge"
            />
            <HomeSectionCard
              icon={ClipboardList}
              title="Quizzes"
              description="Compete with peers and climb the leaderboard."
            />
            <HomeSectionCard
              icon={CalendarDays}
              title="Events"
              description="Join college programming events"
            />
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
