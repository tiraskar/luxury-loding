import { Link } from "react-router-dom";
import Wrapper from "../common/Wrapper";
import { MdArrowOutward } from "react-icons/md";

const Greeting = () => {
  return (
    <Wrapper>
      <div className="tracking-tighter px-2 sm:px-3 lg:px-4 xl:px-0">

        <div className="py-11 flex flex-row items-center">
          <h1
            className="font-inter font-medium text-2xl xxs:text-3xl xs:text-4xl sm:text-[44px] md:text-[52px] lg:text-[60px] xl:text-[66px] xxs:leading-[50px]  xs:leading-[62px] sm:leading-[78px] lg:leading-[88px]"
          >

            Welcome to Luxury Lodging!
            <br />
            <span className="font-normal">Luxurious retreats designed for groups</span></h1>
          <img src="/images/inclined.png" className="hidden lg:block h-[88px] w-[140px] rotate-[15deg] rounded-xl" alt="" />
        </div>

        <div className="flex flex-col py-3">
          <p className="text-xl xxs:text-[22px] xs:text-2xl md:text-[26px]">Experience unparalleled comfort and elegance in our spacious accommodations,</p>
          <p className="text-[#999999] text-[22px] md:text-[28px]">perfect for creating unforgettable memories with your group</p>
        </div>

        <div className="flex flex-row space-x-2 items-center text-[#333333] text-[1rem] py-3">
          <Link >Read more </Link>
          <MdArrowOutward />
        </div>
      </div>
    </Wrapper >
  );
};

export default Greeting;