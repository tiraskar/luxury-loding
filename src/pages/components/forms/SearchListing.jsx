import { GoDotFill } from "react-icons/go";
import { Wrapper } from "../../../components";
import { RiFilter2Line } from "react-icons/ri";

const SearchListing = () => {
  return (
    <Wrapper>
      <div className="space-y-6">
        <p className="flex items-center text-xs text-[#A1A196] gap-1">
          Home <GoDotFill />
          <span className="text-black">Listing</span>
        </p>
        <form className="flex flex-wrap justify-between items-center gap-3 bg-[#F9F9F9] p-4 rounded-2xl font-onest tracking-[-1%] ">
          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" htmlFor="location">Where to go?</label>
            <input type="text" id="location" placeholder="Anywhere" className="bg-[#F9F9F9] outline-none font-inter text-[#8A8A8A] text-[1rem]" />
          </div>
          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" htmlFor="check-in">Check in</label>
            <input type="text" id="check-in" placeholder="MM.DD.YYYY" className="bg-[#F9F9F9] outline-none font-inter text-[#8A8A8A] text-[1rem]" />
          </div>
          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" htmlFor="check-out">Check out</label>
            <input type="text" id="check-out" placeholder="MM.DD.YYYY" className="bg-[#F9F9F9] outline-none font-inter text-[#8A8A8A] text-[1rem]" />
          </div>
          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" htmlFor="guest">Guest</label>
            <input type="text" id="guest" placeholder="Any" className="bg-[#F9F9F9] outline-none font-inter text-[#8A8A8A] text-[1rem]" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button className="text-black bg-white border-[0.6px] border-[#D7DBE8] rounded-xl px-4 py-4 h-fit flex items-center justify-center text-[13px] font-medium w-[100px]">
              <RiFilter2Line size={20} />Filters
            </button>
            <button className="text-white bg-buttonPrimary rounded-xl px-8 py-4 h-fit sm:w-auto w-[117px]">Search</button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default SearchListing;
