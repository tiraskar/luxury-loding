import CustomImage from "../ui/CustomImage";
import Wrapper from "./Wrapper";

const TeamMembers = () => {

  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight flex flex-col justify-start gap-y-6  xs:gap-y-8 sm:gap-y-10 md:gap-y-[48px] lg:gap-y-[56px] ">

        <h1 className=" text-[28px] xs:text-3xl sm:text-[35px] font-semibold">Meet our team</h1>

        <div
          className="relative flex flex-col lg:flex-row lg:justify-between  bg-cardBackgroundLight rounded-3xl p-2  xxs:p-3 xs:p-4 sm:p-5 gap-4 lg:max-h-[457px]"
        >

          <div className="relative flex flex-col justify-between sm:min-w-[400px] max-w-[675px] lg:pr-4 lg:pl-5">
            <div >
              <h1 className="font-semibold font-inter text-2xl xs:text-[28px] sm:text-3xl md:text-[2rem] 
              tracking-[-1%] pt-5 ">DIROSE</h1>
              <p className="text-[#8E8E80] text-xs sm:text-[13px]">Lodging management & Logistics Florida</p>
            </div>
            <div className="flex flex-col gap-7 max-w-[497px] pb-5">
              <p className=" xxs:text-lg xs:text-xl sm:text-2xl md:text-[28px] font-medium font-inter  sm:leading-10 tracking-[-1%]">Professional Cleaning, Maintenance, and Renovations team</p>
            </div>

          </div>
          <div
            className="flex justify-center bg-white lg:max-w-[517px] px-12 py-8 sm:px-16 sm:py-12 md:px-[89px] md:py-[123px] rounded-2xl">
            <CustomImage src="images/drose-logo.png" alt="" className="w-full max-w-[339px]" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};


export default TeamMembers;