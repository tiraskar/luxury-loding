import { GoDotFill } from "react-icons/go";
import { Wrapper } from "..";
import { RiFilter2Line } from "react-icons/ri";
import { useState } from "react";
import FilterListing from "./FilterListing";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableListing } from "../../redux/slices/listingSlice";
import DatePicker from "react-datepicker";

const FilterableSearchListing = () => {

  const dispatch = useDispatch();

  const { searchLoading } = useSelector(state => state.listing)

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '',
  });

  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();

  const formateDate = (value) => {
    // Remove all characters except numbers and dashes
    const cleanValue = value.replace(/[^\d-]/g, '');

    return cleanValue;
  }

  const handleInputChange = (name, value) => {
    if (name === 'guests') {
      const numericValue = Math.min(Math.max(parseInt(value, 10), 0), 50); // Constrain between 0 and 50
      setFormValues(prev => ({ ...prev, [name]: numericValue }));
    } else if (name === 'checkIn' || name === 'checkOut') {
      setFormValues(prev => ({ ...prev, [name]: formateDate(value) }));
    }
    else {
      setFormValues(prev => ({ ...prev, [name]: value }));
    }
  };



  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchAvailableListing(formValues));
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
            {/* <input
              id="check-in"
              type="text"
              value={formValues.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
              placeholder="YYYY-MM-DD"
              className="search-input"
            /> */}
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              dateFormat="dd.MM.YYYY"
              placeholderText="DD.MM.YYYY"
              backgroundColor="transparent"
              className="search-input"
            />
          </div>

          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" htmlFor="check-out">Check out</label>
            {/* <input
              id="check-out"
              type="text"
              value={formValues.checkOut}
              onChange={(e) => handleInputChange('checkOut', e.target.value)}
              placeholder="YYYY-MM-DD"
              className="search-input" /> */}
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              dateFormat="dd.MM.YYYY"
              placeholderText="DD.MM.YYYY"
              className="search-input"
            />
          </div>

          <div className="flex flex-col w-full sm:max-w-[150px] md:max-w-[153px] text-sm gap-2">
            <label className="text-sm font-semibold" htmlFor="guest">Guest</label>
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
              className="flex flex-row space-x-1 text-white bg-buttonPrimary rounded-xl px-8 py-3 sm:py-4 h-fit sm:w-auto w-[117px]">
              {!searchLoading && "Search"} {searchLoading && <div className="w-6 h-6 relative">
                <button className="absolute inset-0 w-full h-full border-4 border-dotted  border-white border-opacity-100 rounded-full animate-spin"></button>
              </div>}

            </button>

            {/* <div className="w-6 h-6 border-4 border-t-4 border-buttonPrimary border-opacity-50 border-t-transparent rounded-full animate-spin">

            </div> */}



          </div>
        </form>
        {isFilterOpen && <FilterListing setIsFilterOpen={setIsFilterOpen} />}
      </div>
    </Wrapper>
  );
};

export default FilterableSearchListing;
