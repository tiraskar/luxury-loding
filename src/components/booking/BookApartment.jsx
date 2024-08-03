import { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import { Link } from "react-router-dom";

const BookApartment = () => {

  const [isBookingAvailable, setIBookingAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkBookingAvailability = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIBookingAvailable(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="font-inter tracking-[-1%]">
      <div className="bg-[#F9F9F9] py-5 px-4 rounded-2xl w-full lg:min-w-[429px]">
        <h1 className="font-onest tracking-normal font-medium text-xl">Book apartment</h1>
        <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p>Check in</p>
              </p>
              <p className="font-semibold pl-6">14.08.2024</p>
            </div>
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px]">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p>Check out</p>
              </p>
              <p className="font-semibold pl-6">14.08.2024</p>
            </div>
          </div>

          <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
            <p className="flex text-[#8A8A8A] space-x-2 items-center">
              <LuUser2 size={18} /> <p>Guests</p>
            </p>
            <p className="font-semibold pl-6">3 Guests</p>
          </div>
        </div>

        <div className="min-w-full h-px bg-[#E0E0E0] my-[30px]"></div>

        <div className="grid grid-cols-2">
          <div className="flex items-center">
            <p className="text-[#333333] font-bold text-2xl">$220</p>
            <p className="text-[#8E8E80] text-sm ">&nbsp;/ per night</p>
          </div>
          <Link
            to={`/listing/${7}/booking`}
            onClick={() => checkBookingAvailability()}
            className={`flex flex-row items-center justify-center ${isBookingAvailable ? "bg-textDark" : "bg-textDark"} text-white text-sm  py-[14px] rounded-xl`}>
            {!isBookingAvailable ? "Check availability" : "Continue booking"}
            {isLoading && <p> ...</p>}
          </Link>
        </div>

      </div>
      <div className="flex justify-center text-center py-4">
        <p className="text-[#666666]">Any question? Call us <span className="text-black">(877) 640-8777</span></p>
      </div>
    </div>
  );
};

export default BookApartment;