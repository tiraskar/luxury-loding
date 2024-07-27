import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { MdArrowOutward } from "react-icons/md";

const Accommodations = () => {
  return (
    <div className="tracking-tight font-onest">
      <Wrapper>
        <h1 className="text-[26px]">Experience comfort and style at our Arizona accommodations</h1>
        <p className="text-[28px] text-[#999999]">Book direct for a memorable stay.</p>
        <div className="flex flex-row space-x-2 items-center text-[#333333] text-[1rem] py-3">
          <Link >Book your stay</Link>
          <MdArrowOutward />
        </div>
      </Wrapper>
      <div className="flex flex-col gap-1 max-w-[1536px] mx-auto justify-center rounded-2xl py-[56px]">
        <div className="relative">
          <img src="/images/accommodation-one.png" alt="" />
          <div className="absolute">
            <h1>Hello</h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="relative">
            <img src="/images/accommodation-two.png" alt="" />
            <div className="absolute bg-cardBackgroundDark p-2">
              <h1>Hello</h1>
            </div>
          </div>
          <div className="relative">
            <img src="/images/accommodation-three.png" alt="" />
            <div className="absolute">
              <h1>Hello</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodations;