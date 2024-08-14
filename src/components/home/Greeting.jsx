import { Link } from "react-router-dom";
import Wrapper from "../common/Wrapper";
import { MdArrowOutward } from "react-icons/md";

const Greeting = () => {
  return (
    <Wrapper>
      <div className="tracking-tighter px-2 sm:px-3 lg:px-4 xl:px-0 space-y-[56px]">

        <div className="relative flex flex-row items-center ">
          <h1
            className="font-inter font-medium text-2xl xxs:text-3xl xs:text-4xl sm:text-[44px] md:text-[52px] lg:text-[60px] xl:text-[66px] xxs:leading-[50px]  xs:leading-[62px] sm:leading-[78px] lg:leading-[88px] w-[1164px] gap-[22.57px] tracking-[-1.32px]"
          >

            Welcome to Luxury Lodging!
            <br />
            <div className="font-normal">Luxurious retreats designed for groups

              <div className="">
                <img src="/images/inclined.png" className=" absolute right-0 top-[50%] hidden lg:block h-[88px] w-[140px] flex-shrink-0 rotate-[15deg] rounded-md" alt="" />
              </div>
            </div>
          </h1>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col">
          <p className="text-xl xxs:text-[22px] xs:text-2xl md:text-[26px]">Experience unparalleled comfort and elegance in our spacious accommodations,</p>
          <p className="text-[#999999] text-[22px] md:text-[28px]">perfect for creating unforgettable memories with your group</p>
        </div>

          <div className="flex flex-row space-x-2 items-center text-[#333333] text-[1rem] ">
          <Link >Read more </Link>
          <MdArrowOutward />
        </div>
        </div>

      </div>
    </Wrapper >
  );
};

export default Greeting;