import { HeroSVG } from "./HeroSVG";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <main className="flex flex-col lg:flex-row-reverse justify-center items-center min-h-screen pt-2 bg-gray-900 text-white text-center">
      <div className="w-[70%] max-w-md lg:w-[30%] lg:max-w-none flex justify-center mb-10 lg:mb-0">
        <HeroSVG />
      </div>
      <div className="flex flex-col items-center md:pt-0">
        <h1 className="font-bold text-5xl md:text-6xl mb-6">
          Hostel <span className="text-blue-400">Management</span> System
        </h1>
        <p className="py-6 text-xl md:text-2xl max-w-xl">
          One Solution For All Of The Hostel&apos;s Needs
        </p>
        <div className="py-10 flex flex-col items-center w-full">
          <Link
            to="/login"
            className="bg-blue-500 py-3 px-16 md:px-40 hover:bg-blue-700 transition rounded text-2xl font-semibold shadow-lg"
          >
            Login
          </Link>
          <p className="mt-6 mb-3 text-lg">OR</p>
          <Link
            to="/register"
            className="text-xl hover:underline hover:text-blue-400 transition"
          >
            Request Registration
          </Link>
        </div>
      </div>
    </main>
  );
}
export { HeroSection };
