import { Link } from "react-router-dom";

import { MdArrowOutward } from "react-icons/md";
import Wrapper from "../common/Wrapper";


const AccommodationExperience = () => {
  return (
    <Wrapper>
      <h1 className="xxs:text-[22px] sm:text-[26px]">Experience comfort and style at our Arizona accommodations</h1>
      <p className=" xxs:text-2xl sm:text-[28px] text-[#999999]">Book direct for a memorable stay.</p>
      <div className="flex flex-row space-x-2 items-center text-[#333333] text-[1rem] py-3">
        <Link >Book your stay</Link>
        <MdArrowOutward />
      </div>
    </Wrapper>
  );
};

export default AccommodationExperience;