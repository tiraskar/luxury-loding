import { Link } from "react-router-dom";

const RentalExperience = () => {
  return (
    <div className="flex justify-center relative tracking-tight">
      <div className="relative bg-black bg-opacity-40 2xl:rounded-2xl min-h-[400px]">
        <img
          src="/images/rental-experience.png"
          alt=""
          className="w-full h-full max-w-[1536px] 2xl:rounded-2xl object-cover"
        />
        <div className="absolute font-medium text-white text-3xl xxs:text-[36px] md:text-[42px] lg:text-[58px] max-w-[370px] sm:max-w-[420px] md:max-w-[580px] lg:max-w-[706px] left-[5vw] top-[10vh] leading-[50px] md:leading-[78px]">
          Ready for the best home rental experience
        </div>
        <Link to='/listings' className="absolute bg-white text-black bottom-12 px-4 py-2 rounded-2xl left-6 md:left-10 lg:left-16">Book your stay</Link>
      </div>
    </div>
  );
};

export default RentalExperience;
