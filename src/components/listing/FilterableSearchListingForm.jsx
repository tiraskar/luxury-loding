import { GoDotFill } from "react-icons/go";
import { Wrapper } from "..";
import { RiFilter2Line } from "react-icons/ri";
import { useState } from "react";
import FilterListing from "./FilterListing";

const FilterableSearchListing = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const inputCss = "bg-[#F9F9F9] outline-none font-inter text-[#8A8A8A] text-[1rem]"

  const [formValues, setFormValues] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '',
  });

  const handleInputChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <Wrapper>
      <div className="space-y-6">
        <p className="flex items-center text-xs text-[#A1A196] gap-1">
          Home <GoDotFill />
          <span className="text-black">Listing</span>
        </p>

        <form onSubmit={() => console.log('listing form submitted')}
          className=" grid grid-cols-2  sm:flex flex-wrap justify-between items-center gap-3 bg-[#F9F9F9] p-4 rounded-2xl font-onest tracking-[-1%] ">

          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" htmlFor="location">Where to go?</label>
            <input
              id="location"
              type="text"
              value={formValues.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Anywhere"
              className="search-input" />
          </div>

          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" htmlFor="check-in">Check in</label>
            <input
              id="check-in"
              type="text"
              value={formValues.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
              placeholder="MM.DD.YYYY"
              className="search-input"
            />
          </div>

          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" htmlFor="check-out">Check out</label>
            <input
              id="check-out"
              type="text"
              value={formValues.checkOut}
              onChange={(e) => handleInputChange('checkOut', e.target.value)}
              placeholder="MM.DD.YYYY"
              className="search-input" />
          </div>

          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" htmlFor="guest">Guest</label>
            <input
              type="text"
              id="guests"
              value={formValues.guests}
              onChange={(e) => handleInputChange('guests', e.target.value)}
              placeholder="Any"
              className="search-input"
            />
          </div>

          <div className="flex flex-row gap-2 w-full sm:w-auto">
            <button type="button"
              onClick={() => setIsFilterOpen(true)}
              className="text-black bg-white border-[0.6px] border-[#D7DBE8] rounded-xl px-4 py-3 sm:py-4 h-fit flex items-center justify-center text-[13px] font-medium w-[100px]">

              <RiFilter2Line size={20} />Filters

            </button>
            <button className="text-white bg-buttonPrimary rounded-xl px-8 py-3 sm:py-4 h-fit sm:w-auto w-[117px]">Search</button>
          </div>
        </form>
        {isFilterOpen && <FilterListing setIsFilterOpen={setIsFilterOpen} />}
      </div>
    </Wrapper>
  );
};

export default FilterableSearchListing;
