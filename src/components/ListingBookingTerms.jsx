import { LuMusic4 } from "react-icons/lu";
import { TbSmoking } from "react-icons/tb";
import { PiDog } from "react-icons/pi";
const ListingBookingTerms = () => {
  return (
    <div className="lg:max-w-[652px] space-y-8 font-inter text-[#333333] tracking-tight">
      <h1 className="text-xl font-semibold">Booking terms</h1>
      <div className="flex lg:max-w-[652px]">
        <div className="lg:max-w-[318px] flex  p-3 rounded-2xl space-x-3 ">
          <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-[#F5F5EF]">
            <LuMusic4 size={22} color="black" />
          </div>
        </div>
        <div className="mt-3 space-y-[6px]">
          <h1 className="text-sm font-semibold tracking-[-1%]">Music</h1>
          <p className="text-xs leading-5 ">
            Please be considerate of your neighbors and mindful of noise levels.
            Noise violations may result in fines. Please also note we do not
            provide speakers or sound systems.
          </p>
        </div>
      </div>
      <div className="flex lg:max-w-[652px]">
        <div className="lg:max-w-[318px] flex  p-3 rounded-2xl space-x-3 ">
          <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-[#F5F5EF]">
            <TbSmoking size={22} color="black" />
          </div>
        </div>
        <div className="mt-3 space-y-[6px]">
          <h1 className="text-sm font-semibold tracking-[-1%]">Smoking</h1>
          <p className="text-xs leading-5 ">
            This is a smoke-free home. Violation of the no-smoking policy will
            result in a $500 fee for additional cleaning and other related
            costs, in addition to the Guest being responsible for any damages
            attributable to smoking beyond said fee.
          </p>
        </div>
      </div>
      <div className="flex lg:max-w-[652px]">
        <div className="lg:max-w-[318px] flex  p-3 rounded-2xl space-x-3 ">
          <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-[#F5F5EF]">
            <PiDog size={22} color="black" />
          </div>
        </div>
        <div className="mt-3 space-y-[6px]">
          <h1 className="text-sm font-semibold tracking-[-1%]">Pets</h1>
          <p className="text-xs leading-5 ">
            Please be considerate of your neighbors and mindful of noise levels.
            Noise violations may result in fines. Please also note we do not
            provide speakers or sound systems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingBookingTerms;
