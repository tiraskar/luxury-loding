import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Booking from "./Booking";
import { PiDog } from "react-icons/pi";
import { TbSmoking } from "react-icons/tb";
import { LuMusic4 } from "react-icons/lu";

const BookingListing = () => {
  return (
    <div className="flex justify-between font-inter">
      <div className=" flex justify-center w-full">
        <div className=" max-w-[652px] space-y-10">
          <p className="flex items-center text-xs text-[#A1A196] gap-1">
            Home <GoDotFill /> Listing <GoDotFill className="text-black" />
            <span className="text-black">Booking</span>
          </p>

          <div className="flex  justify-between items-center min-w-[652px]">
            <div className="">
              <div className="flex items-center space-x-2">
                <MdKeyboardArrowLeft size={24} />
                <h1 className="text-xl font-onest tracking-tight font-semibold">Things to remember</h1>
              </div>
            </div>
            <div className="flex  items-center gap-4">
              <div className="flex items-center space-x-2">
                <p className="flex justify-center items-center w-6 h-6 text-xs bg-black text-white rounded-full">1</p>
                <h1>Remember</h1>
              </div>
              <div className="w-full h-px bg-[#E0E0E0] px-4 "></div>
              <div className="flex items-center space-x-2 opacity-30">
                <p className="flex justify-center items-center w-6 h-6 text-xs bg-black text-white rounded-full">2</p>
                <h1>Payment</h1>
              </div>
            </div>
          </div>
          <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

          <div className="flex flex-col gap-y-10">
            <div className="flex gap-3">
              <div className="lg:max-w-[318px] flex  rounded-2xl space-x-3 ">
                <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-[#F5F5EF]">
                  <LuMusic4 size={22} color="black" />
                </div>
              </div>
              <div className=" space-y-[6px]">
                <h1 className="text-sm font-semibold tracking-[-1%]">Music</h1>
                <p className="text-xs leading-5 ">
                  Please be considerate of your neighbors and mindful of noise levels.
                  Noise violations may result in fines. Please also note we do not
                  provide speakers or sound systems.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="lg:max-w-[318px] flex  rounded-2xl space-x-3 ">
                <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-[#F5F5EF]">
                  <TbSmoking size={22} color="black" />
                </div>
              </div>
              <div className=" space-y-[6px]">
                <h1 className="text-sm font-semibold tracking-[-1%]">Smoking</h1>
                <p className="text-xs leading-5 ">
                  This is a smoke-free home. Violation of the no-smoking policy will
                  result in a $500 fee for additional cleaning and other related
                  costs, in addition to the Guest being responsible for any damages
                  attributable to smoking beyond said fee.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="lg:max-w-[318px] flex  rounded-2xl space-x-3 ">
                <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-[#F5F5EF]">
                  <PiDog size={22} color="black" />
                </div>
              </div>
              <div className=" space-y-[6px]">
                <h1 className="text-sm font-semibold tracking-[-1%]">Pets</h1>
                <p className="text-xs leading-5 ">
                  Please be considerate of your neighbors and mindful of noise levels.
                  Noise violations may result in fines. Please also note we do not
                  provide speakers or sound systems.
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs leading-6 ">
            {
              `
              By clicking the button below, I agree to Luxury Lodging's terms & conditions, guest agreement and cancellation policy, I am aware that I must be at least 21 to book this stay. I agree to pay the total amount shown, which includes service fees. Contact us if you have any questions!
              `
            }
          </p>
          <div className="pt-80">
            <button className="py-3 px-7 bg-black text-white rounded-[14px] ">Agree and continue</button>
          </div>
        </div>

      </div>
      <div className="">

        <Booking />
      </div>
    </div>
  );
};

export default BookingListing;