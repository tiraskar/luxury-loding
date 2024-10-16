import { useDispatch } from "react-redux";
import { toggleIsSearchHomePageOpen } from "../../redux/slices/listingSlice";
import { Link } from "react-router-dom";

const BannerTextInfo = () => {

  const dispatch = useDispatch();

  return (
    <div className="text-white  stroke-textDark stroke-2 md:space-y-[30px]  md:mb-[45px] xs:h-[120px] sm:h-[130px]">
      <h1
        className="font-onest text-[1.125rem] xxs:text-[1.3rem] xs:text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] tracking-[-0.8px] leading-[30px] xs:leading-[40px] sm:leading-[50px] lg:leading-[56px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
        "
        style={{ textShadow: "0 4px 10px rgba(0, 0, 0, 0.5)" }}
      >
        Your Ideal Spot for Groups, Events,
        <br />and Corporate Travel
      </h1>

      <p className="text-[8px] tracking-wide sm:text-xs md:text-sm lg:text-[1rem] h-[11px] stroke-textDark font-medium stroke-2"
        style={{ textShadow: "0 4px 10px rgba(0, 0, 0, 100)" }}
      >
        Top destinations for all groups with excellent amenities,
        <br className="block xs:hidden" />
        corporate travel, and events
      </p>
      <div className="xs:hidden flex flex-row justify-center pt-8 space-x-2 text-xs">
        <button
          onClick={() => {
            dispatch(toggleIsSearchHomePageOpen(true));
          }}
          className="flex p-[12px_20px] justify-center items-center gap-[10px] rounded-lg  border-buttonPrimary    bg-buttonPrimary bg-opacity-80">
          <span className="flex items-center font-onest  leading-normal h-[10px]  tracking-normal text-white  ">Search</span>
        </button>
        <Link to='/listings' className="flex p-[12px_16px] justify-center items-center gap-[10px] rounded-lg border-black border-[1px bg-black bg-opacity-60">
          <span className="flex items-center text-white font-onest font-normal leading-normal h-[10px]  hover:text-white">Book now</span>
        </Link>

      </div>
    </div>
  );
};


export default BannerTextInfo;