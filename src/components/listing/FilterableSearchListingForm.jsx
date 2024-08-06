import { GoDotFill } from "react-icons/go";
import { Wrapper } from "..";
import { RiFilter2Line } from "react-icons/ri";
import { useState } from "react";
import FilterListing from "./FilterListing";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableListing } from "../../redux/slices/listingSlice";
import DatePicker from "react-datepicker";
import { formateDate } from "../../helper/date";
import LoadingSpinner from "../ui/LoadingSpinner";

const FilterableSearchListing = () => {

  const dispatch = useDispatch();

  const { loading, minDate } = useSelector(state => state.listing)

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '',
  });


  const handleInputChange = (name, value) => {
    if (name === 'guests') {
      // Constrain between 0 and 50
      const numericValue = Math.min(Math.max(parseInt(value, 10), 0), 50);
      setFormValues(prev => ({ ...prev, [name]: numericValue }));
    }
    else {
      setFormValues(prev => ({ ...prev, [name]: value }));
    }
  };



  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchAvailableListing({
      location: formValues.location,
      checkIn: formateDate(formValues.checkIn),
      checkOut: formateDate(formValues.checkOut),
      guests: parseInt(formValues.guests),
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
            <label className="text-sm font-semibold" >Where to go?</label>
            <input
              type="text"
              value={formValues.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Anywhere"
              className="search-input" />
          </div>

          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" >Check in</label>
            <DatePicker
              selected={formValues.checkIn}
              onChange={(date) => handleInputChange('checkIn', date)}
              dateFormat="dd.MM.YYYY"
              placeholderText="DD.MM.YYYY"
              backgroundColor="transparent"
              minDate={minDate}
              className="search-input"
            />
          </div>

          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" >Check out</label>
            <DatePicker
              selected={formValues.checkOut}
              onChange={(date) => handleInputChange('checkOut', date)}
              dateFormat="dd.MM.YYYY"
              placeholderText="DD.MM.YYYY"
              minDate={minDate}
              className="search-input"
            />
          </div>

          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" >Guest</label>
            <input
              type="number"
              id="guests"
              inputMode="numeric"
              pattern="[0-9]*"
              max={50}
              min={0}
              step={1}
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
            <button
              onClick={(e) => handleSearch(e)}
              className="flex flex-row justify-center space-x-1 text-white bg-buttonPrimary rounded-xl px-8 py-3 sm:py-4 h-fit sm:w-auto min-w-[117px]">
              {!loading && "Search"} {loading && <LoadingSpinner />}

            </button>
          </div>
        </form>
        {isFilterOpen && <FilterListing setIsFilterOpen={setIsFilterOpen} />}
      </div>
    </Wrapper>
  );
};

export default FilterableSearchListing;
