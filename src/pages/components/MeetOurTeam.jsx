
import { Wrapper } from "../../components";

const MeetOurTeam = () => {

  return (
    <Wrapper>
      <div className="text-[#333333] font-onest tracking-tight px-2 sm:px-3 md:px-4 xl:px-0 flex flex-col justify-start gap-y-[56px]">

        <h1 className="text-[35px] font-semibold">Meet our team</h1>

        <div
          className="relative flex flex-col md:flex-row lg:justify-between  bg-cardBackgroundLight rounded-2xl p-5 gap-4 lg:max-h-[457px]"
        >

          <div className="relative flex flex-col justify-between sm:min-w-[400px] max-w-[675px] lg:pl-4">
            <div >
              <h1 className="font-semibold font-inter text-[2rem] 
              tracking-[-1%]">DIROSE</h1>
              <p className="text-[#8E8E80]">Lodging management & Logistics Florida</p>
            </div>
            <div className="flex flex-col gap-7 max-w-[497px]">
              <p className="text-[28px] font-medium font-inter leading-10 tracking-[-1%]">Professional Cleaning, Maintenance, and Renovations team</p>
            </div>

          </div>
          <div className="flex justify-center bg-white max-w-[517px] px-[89px] py-[123px] rounded-2xl">
            <img src="/images/drose-logo.png" alt="" className="w-full max-w-[339px]" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};


export default MeetOurTeam;