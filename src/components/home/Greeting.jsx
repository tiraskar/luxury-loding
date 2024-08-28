import { Link } from "react-router-dom";
import Wrapper from "../common/Wrapper";
import { MdArrowOutward } from "react-icons/md";
import CustomImage from "../ui/CustomImage";

const Greeting = () => {
  return (
    <Wrapper>
      <div className="tracking-tighter px-2 sm:px-3 lg:px-4 xl:px-0 space-y-6 sm:space-y-8 lg:space-y-[56px]">

        <div className="relative flex flex-wrap  items-center ">
          <h1
            className="font-inter font-medium text-2xl xs:text-4xl sm:text-[44px] md:text-[50px] lg:text-[58px] xl:text-[66px] leading-9 xxs:leading-[40px]  xs:leading-[50px] sm:leading-[60px] md:leading-[67px] lg:leading-[72px] xl:leading-[88px] max-w-[1164px] gap-[22.57px] tracking-[-1.32px]"
          >

            Welcome to Luxury Lodging!
            <br />
            <div className="font-normal ">Luxurious retreats designed for <br className=" hidden lg:block xl:hidden" /> groups

              <div className="">
                <CustomImage src={`images/inclined.png`} className="hidden lg:block absolute right-0 top-[30%] xl:top-[50%]  h-[88px] w-[140px] flex-shrink-0 rotate-[15deg] rounded-md" alt="" />
              </div> 
              {/* <div className="">
                <CustomImage src={`images/inclined.png`} className=" absolute right-0 top-[50%]  lg:hidden h-[40px] w-[70px] flex-shrink-0 rotate-[15deg] rounded-md" alt="" />
              </div> */}
            </div>
          </h1>
        </div>

        <div className=" space-y-4 xs:space-y-5 md:space-y-6">
          <div className="flex flex-col">
            <p className="text-lg xxs:text-xl sm:text-2xl md:text-[26px]">Experience unparalleled comfort and elegance in our spacious accommodations,</p>
            <p className="text-[#999999] text-xl xs:text-2xl sm:text-[26px] md:text-[28px]">perfect for creating unforgettable memories with your group</p>
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