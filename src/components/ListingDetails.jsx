import { TbAirConditioning } from "react-icons/tb";

const ListingDetails = () => {
  return (
    <div id="listing-details" className="tracking-[-1%] space-y-8">
      <h1 className="text-xl font-semibold tracking-[-2%]">Details</h1>
      <div className="grid grid-cols-2 gap-3 ">
        <div className="lg:max-w-[318px] flex flex-row items-center p-3 rounded-2xl bg-[#F9F9F9] space-x-3">
          <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-white">
            <TbAirConditioning size={22} color="black" />
          </div>
          <p>Air conditioning</p>
        </div>
        <div className="lg:max-w-[318px] flex flex-row items-center p-3 rounded-2xl bg-[#F9F9F9] space-x-3">
          <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-white">
            <TbAirConditioning size={22} color="black" />
          </div>
          <p>Air conditioning</p>
        </div>
        <div className="lg:max-w-[318px] flex flex-row items-center p-3 rounded-2xl bg-[#F9F9F9] space-x-3">
          <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-white">
            <TbAirConditioning size={22} color="black" />
          </div>
          <p>Air conditioning</p>
        </div>
        <div className="lg:max-w-[318px] flex flex-row items-center p-3 rounded-2xl bg-[#F9F9F9] space-x-3">
          <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-white">
            <TbAirConditioning size={22} color="black" />
          </div>
          <p>Air conditioning</p>
        </div>
        <div className="lg:max-w-[318px] flex flex-row items-center p-3 rounded-2xl bg-[#F9F9F9] space-x-3">
          <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-white">
            <TbAirConditioning size={22} color="black" />
          </div>
          <p>Air conditioning</p>
        </div>
        <div className="lg:max-w-[318px] flex flex-row items-center p-3 rounded-2xl bg-[#F9F9F9] space-x-3">
          <div className="flex flex-row items-center justify-center h-[42px] w-[42px] rounded-xl bg-white">
            <TbAirConditioning size={22} color="black" />
          </div>
          <p>Air conditioning</p>
        </div>
      </div>
      <button className="font-semibold text-[13px] gap-x-2 py-2 px-[10px] border-[0.6px] border-[#D7DBE8] w-fit rounded-2xl tracking-normal">
        Show all amenities (25)
      </button>
    </div>
  );
};

export default ListingDetails;