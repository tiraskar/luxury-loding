import { GoDotFill } from "react-icons/go";
import { Wrapper } from "..";
import { RiFilter2Line } from "react-icons/ri";
import { useState } from "react";
import FilterListing from "./FilterListing";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAvailableListing,
  fetchListingList,
  setSearchListingParams,
  toggleFilterOpen,
} from "../../redux/slices/listingSlice";
import DatePicker from "react-datepicker";
// import { formateDate } from "../../helper/date";
import LoadingSpinner from "../ui/LoadingSpinner";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

const FilterableSearchListing = () => {
  const [minDateCheckOut, setMinDateCheckOut] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );

  const dispatch = useDispatch();

  const {
    isFetchAvailableListing,
    searchListingParams,
    searchFilter,
    isFilterOpen,
    isFetchListing
  } = useSelector((state) => state.listing);

  // const [isFilterOpen, setIsFilterOpen] = useState(false);

  const minDateCheckIn = new Date(Date.now());

  const handleInputChange = (name, value) => {
    if (name == "checkIn") {
      const checkInDate = new Date(value);
      setMinDateCheckOut(
        new Date(checkInDate.setDate(checkInDate.getDate() + 1))
      );
    }
    dispatch(setSearchListingParams({ name, value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (
      (searchListingParams.checkIn && !searchListingParams.checkOut) ||
      (searchListingParams.checkOut && !searchListingParams.checkIn)
    ) {
      return toast.info("Provide check-in and check-out date.");
    }

    if (
      searchListingParams.location ||
      searchListingParams.checkIn ||
      searchListingParams.checkOut ||
      searchListingParams.guests ||
      !searchFilter
    ) {
      return dispatch(fetchAvailableListing());
    }

    dispatch(fetchListingList());
  };

  return (
    <Wrapper>
      <div className="space-y-6">
        <p className="flex items-center text-sm font-medium font-inter tracking-[-0.16px] text-[#A1A196] gap-x-0.5 h-[17px]">
          Home <GoDotFill className="h-2 text-black" />
          <span className="text-black">Listings</span>
        </p>

        <form
          // className=" grid grid-cols-2  sm:flex flex-wrap justify-between items-center gap-3 bg-[#F9F9F9] p-4 rounded-2xl font-onest tracking-[-1%] md:h-[77px]"
          className=" grid grid-cols-2 gap-x-4 xs:flex md:space-x-0 xs:flex-wrap sm:justify-between lg:grid lg:grid-cols-12 bg-[#F9F9F9] rounded-2xl font-onest tracking-[-1%] md:h-[77px] px-4 "
        >

          <div className="block lg:hidden max-w-[150px]  py-4 h-[45px]">
            <Location
              searchListingParams={searchListingParams}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="block lg:hidden pt-[15px] pb-[17px]">
            <CheckIn
              searchListingParams={searchListingParams}
              handleInputChange={handleInputChange}
              minDateCheckIn={minDateCheckIn}
            />
          </div>
          <div className="block lg:hidden pt-[15px] pb-[17px]">
            <CheckOut
              searchListingParams={searchListingParams}
              handleInputChange={handleInputChange}
              minDateCheckOut={minDateCheckOut}
            />

          </div>
          <div className="block lg:hidden pt-[15px] pb-[17px]">
            <Guests
              searchListingParams={searchListingParams}
              handleInputChange={handleInputChange}
            />

          </div>
          <div className="block lg:hidden pt-[17px] pb-[17px]">
            <SearchButton
              isFetchAvailableListing={isFetchAvailableListing}
              handleSearch={handleSearch}
              dispatch={dispatch}
              toggleFilterOpen={toggleFilterOpen}
              isFetchListing={isFetchListing}
            />

          </div>

          <div className="hidden lg:flex lg:col-span-2">
            <div className="max-w-[150px]   lg:py-4 h-[45px]">
              <Location
                searchListingParams={searchListingParams}
                handleInputChange={handleInputChange}
              />
            </div>
          </div>

          <div className="hidden justify-end lg:flex flex-row  lg:space-x-[100px] xl:space-x-[173px] md:col-span-10">
            <div className="hidden lg:flex flex-row  md:space-x-[40px] lg:space-x-[100px] xl:space-x-[173px] pt-[15px] pb-[17px]">
              <div className="">
                <CheckIn
                  searchListingParams={searchListingParams}
                  handleInputChange={handleInputChange}
                  minDateCheckIn={minDateCheckIn}
                />
              </div>
              <div className="">
                <CheckOut
                  searchListingParams={searchListingParams}
                  handleInputChange={handleInputChange}
                  minDateCheckOut={minDateCheckOut}
                />
              </div>
            </div>

            <div className="hidden lg:flex flex-wrap  lg:space-x-[70px] xl:space-x-[121px] ">
              <div className="pt-[15px] pb-[17px]">
                <Guests
                  searchListingParams={searchListingParams}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="pt-[17px] pb-[17px]">
                <SearchButton
                  isFetchAvailableListing={isFetchAvailableListing}
                  handleSearch={handleSearch}
                  dispatch={dispatch}
                  toggleFilterOpen={toggleFilterOpen}
                  isFetchListing={isFetchListing}
                />
              </div>

            </div>
          </div>
        </form>
        {isFilterOpen && <FilterListing />}
      </div>
    </Wrapper>
  );
};

export default FilterableSearchListing;



const SearchButton = ({ isFetchAvailableListing, handleSearch, dispatch, toggleFilterOpen, isFetchListing }) => {
  return (
    <div className=" flex flex-row gap-3 w-full sm:w-auto ">
      <button
        type="button"
        onClick={() => dispatch(toggleFilterOpen())}
        className="text-black bg-white border-[0.6px] border-[#D7DBE8] rounded-xl px-4 py-3 sm:py-4 h-[43px] flex items-center justify-center text-[13px] font-medium lg:w-[100px] space-x-2"
      >
        <RiFilter2Line size={20} /> <span className="block sm:hidden lg:block">Filters</span>
      </button>
      <button
        disabled={isFetchListing || isFetchAvailableListing}
        onClick={(e) => handleSearch(e)}
        className="flex items-center flex-row justify-center space-x-1 text-white bg-buttonPrimary rounded-xl px-8 py-3 sm:py-4  sm:w-auto min-w-[117px] h-[43px]"
      >
        {!isFetchAvailableListing && "Search"}{" "}
        {isFetchAvailableListing && <LoadingSpinner />}
      </button>
    </div>
  );
};

SearchButton.propTypes = {
  isFetchAvailableListing: PropTypes.bool,
  handleSearch: PropTypes.func,
  dispatch: PropTypes.func,
  toggleFilterOpen: PropTypes.func,
  isFetchListing: PropTypes.bool,
};

const Location = ({ searchListingParams, handleInputChange }) => {
  return (
    <div className="flex flex-col w-full text-sm gap-1.5 ">
      <label className="text-sm font-semibold">Where to go?</label>
      <input
        type="text"
        value={searchListingParams.location}
        onChange={(e) => handleInputChange("location", e.target.value)}
        placeholder="Anywhere"
        className="search-input"
      />
    </div>
  );
}

Location.propTypes = {
  searchListingParams: PropTypes.object,
  handleInputChange: PropTypes.func,
};

const Guests = ({ searchListingParams, handleInputChange }) => {
  return (
    <div className=" grid grid-flow-col space-x-4 items-center w-[62px] ">
      <div className="h-10 w-px  bg-textDark bg-opacity-10 hidden lg:block "></div>
      <div className="flex flex-col  text-sm gap-1.5 h-[45px]">
        <label className="text-sm font-semibold">Guests</label>
        <input
          type="number"
          id="guests"
          inputMode="numeric"
          pattern="[0-9]*"
          max={50}
          min={0}
          step={1}
          value={searchListingParams.guests}
          onChange={(e) =>
            handleInputChange("guests", e.target.value)
          }
          placeholder="Any"
          className="search-input "
        />
      </div>
    </div>
  );
};

Guests.propTypes = {
  searchListingParams: PropTypes.object,
  handleInputChange: PropTypes.func,
};


const CheckOut = ({ handleInputChange, minDateCheckOut, searchListingParams }) => {
  return (
    <div className=" lg:grid lg:grid-flow-col lg:space-x-4 items-center w-[117px] h-[45px]">
      <div className="h-10 w-px  bg-textDark bg-opacity-10 hidden lg:block "></div>
      <div className="flex flex-col w-[117px] text-sm gap-1.5 ">
        <label className="text-sm font-semibold">Check out</label>
        <DatePicker
          selected={searchListingParams.checkOut}
          // onChange={(date) => handleInputChange("checkOut", date)}
          dateFormat="MM.dd.YYYY"
          placeholderText="MM.DD.YYYY"
          minDate={minDateCheckOut}
          className="search-input max-w-[117px]"
          onChange={(date) => {
            if (date && date instanceof Date && !isNaN(date)) {
              const currentYear = new Date().getFullYear();
              if (date.getFullYear() >= currentYear) {
                if (date > searchListingParams.checkIn) {
                  handleInputChange('checkOut', date);
                } else {
                  handleInputChange('checkOut', "");
                }
              } else {
                handleInputChange('checkOut', "");
              }
            } else {
              handleInputChange('checkOut', "");
            }
          }}
          onBlur={(e) => {
            const date = new Date(e.target.value);
            if (date && date instanceof Date && !isNaN(date)) {
              const currentYear = new Date().getFullYear();
              if (date.getFullYear() >= currentYear) {
                if (date > searchListingParams.checkIn) {
                  handleInputChange('checkOut', date);
                } else {
                  handleInputChange('checkOut', "");
                }
              } else {
                handleInputChange('checkOut', "");
              }
            } else {
              handleInputChange('checkOut', "");
            }
          }}
          onKeyDown={(e) => {
            const value = e.target.value;
            if (!/[0-9.]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'].includes(e.key)) {
              e.preventDefault();
            }
            if (e.key !== 'Backspace' && e.key !== 'Delete') {
              if (value.length === 2) {
                e.target.value += '.';
              } else if (value.length === 5) {
                e.target.value += '.';
              }
            }
          }}
        />
      </div>
    </div>
  );
};

CheckOut.propTypes = {
  handleInputChange: PropTypes.func,
  minDateCheckOut: PropTypes.object,
  searchListingParams: PropTypes.object,
};


const CheckIn = ({ searchListingParams, handleInputChange, minDateCheckIn }) => {
  return (
    <div className=" lg:grid lg:grid-flow-col lg:space-x-4 items-center w-[117px] h-[45px]">
      <div className="hidden lg:block h-10 w-px bg-textDark bg-opacity-10 "></div>
      <div className="flex flex-col w-full text-sm gap-1.5 ">
        <label className="text-sm font-semibold">Check in</label>
        <DatePicker
          selected={searchListingParams.checkIn}
          // onChange={(date) => handleInputChange("checkIn", date)}
          dateFormat="MM.dd.YYYY"
          placeholderText="MM.DD.YYYY"
          backgroundColor="transparent"
          minDate={minDateCheckIn}
          className="search-input max-w-[117px]"
          onChange={(date) => {
            if (date && date instanceof Date && !isNaN(date)) {
              const currentYear = new Date().getFullYear();
              if (date.getFullYear() >= currentYear) {
                handleInputChange('checkIn', date);
                if (searchListingParams.checkOut && date >= searchListingParams.checkOut) {
                  handleInputChange('checkOut', "");
                }
              } else {
                handleInputChange('checkIn', "");
              }
            } else {
              handleInputChange('checkIn', "");
            }
          }}
          onBlur={(e) => {
            const date = new Date(e.target.value);
            if (date && date instanceof Date && !isNaN(date)) {
              const currentYear = new Date().getFullYear();
              if (date.getFullYear() >= currentYear) {
                handleInputChange('checkIn', date);
              } else {
                handleInputChange('checkIn', "");
              }
            } else {
              handleInputChange('checkIn', "");
            }
          }}
          onKeyDown={(e) => {
            const value = e.target.value;
            if (!/[0-9.]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'].includes(e.key)) {
              e.preventDefault();
            }
            if (e.key !== 'Backspace' && e.key !== 'Delete') {
              if (value.length === 2) {
                e.target.value += '.';
              } else if (value.length === 5) {
                e.target.value += '.';
              }
            }
          }}
        />
      </div>
    </div>
  );
};

CheckIn.propTypes = {
  handleInputChange: PropTypes.func,
  minDateCheckIn: PropTypes.object,
  searchListingParams: PropTypes.object,
};