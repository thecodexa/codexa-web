import HomeSectionCard from "../components/homeSectionCard";
import Navbar from "../components/navbar";
import laptop from "../assets/Laptop2.svg";
import { Trophy, CalendarDays, ClipboardList } from "lucide-react";
import LoginModal from "../components/loginModal";
import HomeLayout from "../layouts/HomeLayout";
import React, { useContext } from "react";
import { useAuth } from "../context/authContext";
import { UserContext } from "../context/userContext";
const Home = () => {
  const { user } = useContext(UserContext);
  const { setAuthType } = useAuth();
  return (
    <div className="bg-[#0D111A] p-2 ">
      <div className="bg-[#070B13] rounded-lg shadow-black shadow-md">
        <Navbar />
        <section className="flex flex-col-reverse [@media(min-width:910px)]:flex-row items-center justify-between px-10 md:px-20 py-12">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Coding Contests and Quizzes for Students
            </h2>
            <p className="text-[#E0E0E0] mb-6">
              Participate in programming contests, take quizzes, and join events
              tailored for college.
            </p>
            <button
              className="bg-cyan-600 hover:bg-cyan-500 px-6 py-2 rounded text-white hover:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all"
              onClick={() => setAuthType("signup")}
            >
              Get Started
            </button>
          </div>
          <div className="mt-10 md:mt-0 flex-1 max-w-[40rem] min-w-[32rem]">
            <div className=" w-240px h-auto rounded-lg flex items-center justify-center">
              {/* <p className="text-gray-500">[Code Image]</p> */}
              <img src={laptop} alt="laptop" className="w-full h-auto mt-4" />
            </div>
          </div>
        </section>
        <div className="px-10 md:px-20 py-12">
          <section className="grid grid-cols-1 [@media(min-width:880px)]:grid-cols-3 gap-6">
            <HomeSectionCard
              icon={Trophy}
              title="Contests"
              description="Test your coding knowledge"
              to="/contests"
            />
            <HomeSectionCard
              icon={ClipboardList}
              title="Quizzes"
              description="Compete with peers and climb the leaderboard."
              to="/contests"
            />
            <HomeSectionCard
              icon={CalendarDays}
              title="Events"
              description="Join college programming events"
              to="/contests"
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
