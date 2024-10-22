import { useDispatch, useSelector } from "react-redux";
import { clearSearchCheckInCheckOutDate, searchListing, setSearchListingParams, toggleIsSearchedOnSingleListing } from "../../redux/slices/listingSlice";
// import DatePicker from "react-datepicker";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { CiLocationOn } from "react-icons/ci";

import { DateRange } from 'react-date-range';

import format from 'date-fns/format';
import { addDays } from 'date-fns';
import { IoClose } from "react-icons/io5";


export const SearchInputLabel = ({ text, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="font-semibold h-[18px] text-sm tracking-[-0.16px]"
    >
      {text}
    </label>
  );
};

SearchInputLabel.propTypes = {
  text: PropTypes.string.isRequired,
  htmlFor: PropTypes.string,
}


const SearchListingForm = () => {
  // const [minDateCheckOut, setMinDateCheckOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1)))
  const dispatch = useDispatch();
  const { searchListingParams, isHomePageLoading, listingLocationList } = useSelector(state => state.listing)

  // const minDateCheckIn = new Date(Date.now());
  const [filteredLocation, setSearchFilterLocation] = useState([]);
  const [showLocationFilter, setShowLocationFilter] = useState(false)


  const handleInputChange = (name, value) => {
    // if (name == 'checkIn') {
    //   const checkInDate = new Date(value);
    //   setMinDateCheckOut(new Date(checkInDate.setDate(checkInDate.getDate() + 1)));
    // }

    if (name === 'location') {
      const filterLocation = listingLocationList.map((location) => {

        const stateMatch = location.state.toLowerCase().includes(value.toLowerCase());


        if (stateMatch) {
          return location;
        }

        // Filter the cities based on the value
        const filteredCities = location.cities.filter((cityObj) =>
          cityObj.city.toLowerCase().includes(value.toLowerCase())
        );

        // Return the location with only filtered cities if city matches
        if (filteredCities.length > 0) {
          return {
            ...location,
            cities: filteredCities, // Only the filtered cities
          };
        }
        return null; // Exclude location if no match is found
      }).filter(location => location !== null); // Remove null entries

      // Update the filtered location list
      setSearchFilterLocation(filterLocation);
    }

    dispatch(setSearchListingParams({ name, value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    toast.dismiss();
    if ((searchListingParams.checkIn && !searchListingParams.checkOut) || (searchListingParams.checkOut && !searchListingParams.checkIn)) {
      return toast.info("Provide check-in and check-out date.");
    }
    dispatch(searchListing());
    dispatch(toggleIsSearchedOnSingleListing(true))
  }

  useEffect(() => {
    if (listingLocationList.length > 0) {
      setSearchFilterLocation(listingLocationList);
    } else {
      setSearchFilterLocation([]);
    }
  }, [listingLocationList]);

  //track div using ref
  const filterRef = useRef(null);

  //close the filter outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowLocationFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterRef]);

  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection'
    }
  ]);


  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpenCheckIn(false);
      setOpenCheckOut(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (checkInRef.current && !checkInRef.current.contains(e.target)) {
      setOpenCheckIn(false);
    }
    if (checkOutRef.current && !checkOutRef.current.contains(e.target)) {
      setOpenCheckOut(false);
    }
  };

  useEffect(() => {

    if (openCheckIn && range[0].startDate) {
      dispatch(setSearchListingParams({ name: 'checkIn', value: range[0].startDate }));
      dispatch(setSearchListingParams({ name: 'checkOut', value: range[0].endDate }));
    }
    if (openCheckOut && range[0].endDate) {
      dispatch(setSearchListingParams({ name: 'checkOut', value: range[0].endDate }));
      dispatch(setSearchListingParams({ name: 'checkIn', value: range[0].startDate }));
    }
  }, [range[0].startDate, range[0].endDate]);

  const [direction, setDirection] = useState('horizontal');
  useEffect(() => {
    const updateDirection = () => {
      if (window.innerWidth <= 640) {
        setDirection('vertical');
      } else {
        setDirection('horizontal');
      }
    };
    updateDirection();
    window.addEventListener('resize', updateDirection);
    return () => {
      window.removeEventListener('resize', updateDirection);
    };
  }, []);

  const handleClear = () => {
    dispatch(clearSearchCheckInCheckOutDate());
    setRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]);
  }

  return (
    <div
      style={{ boxShadow: "0px 4px 26px 0px rgba(96, 96, 82, 0.24), 0px 0px 0px 6px rgba(255, 255, 255, 0.32)" }}
      className="hidden xs:flex flex-col font-onest items-center bg-white rounded-3xl  shadow-lg">

      <form action="" className=" xs:flex sm:flex-row xs:flex-nowrap items-center xs:space-x-3 py-0.5 lg:w-[822px] h-auto  lg:h-[73px] sm:mr-4 ">

        <div className="justify-start text-start lg:w-[153.25px] h-[69px] flex flex-col gap-y-2   md:px-5 sm:px-3 xs:px-2  py-3">
          <SearchInputLabel
            text="Where to go?"
            htmlFor="location"
          />
          <input type="text"
            value={searchListingParams.location}
            placeholder="Anywhere"
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="outline-none w-[101px]  lg:w-full text-[1rem] tracking-[-0.16px] font-inter lg:pl-1 h-[19px] "
            onFocus={() => setShowLocationFilter(true)}
          />
          {showLocationFilter &&
            <div
              ref={filterRef}
              className="bg-white text-textDark z-40 absolute min-w-[350px] sm:max-w-[400px] max-h-80 overflow-hidden overflow-y-scroll mt-16 py-2 rounded-lg shadow-lg ">
              <ul className=" text-sm">
                {filteredLocation?.map((location, index) => (
                  <ul key={index} className=" space-y-1">
                    {location.cities.map((cityObj, cityIndex) => (
                      <li key={cityIndex} className="flex items-center space-x-1 cursor-pointer hover:bg-cardBackgroundLight py-2 rounded-md px-2"
                        onClick={() => {
                          handleInputChange('location', cityObj.city);
                          setShowLocationFilter(false);
                        }}
                      >
                        <CiLocationOn className="text-buttonPrimary text-lg" />
                        <span>{cityObj.city}, {location.state}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </ul>
            </div>
          }
        </div>

        <div className="h-10 w-px  bg-textDark bg-opacity-10 hidden sm:block "></div>

        <div className="justify-start text-start lg:w-[153.25px] h-[69px] flex flex-col md:px-5 sm:px-3 xs:px-2 lg:px-7 py-3 gap-y-[6px]">
          <SearchInputLabel
            text="Check in"
            htmlFor="checkIn"
          />
          <div className="relative w-[101px] lg:w-[105px] text-[15px] lg:text-[1rem] tracking-[-0.16px] font-inter h-[19px]">
            <input
              value={`${searchListingParams.checkIn ? format(searchListingParams.checkIn, "MM/dd/yyyy") : ""}`}
              readOnly
              className="outline-none w-[101px] lg:w-[105px]"
              onClick={() => setOpenCheckIn(openCheckIn => !openCheckIn)}
              placeholder="MM/DD/YYYY"
            />
            {searchListingParams.checkIn && (
              <IoClose
                onClick={() => handleClear()}
                className="absolute  size-3  right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
              />
            )}
          </div>

          <div className="calendarWrap ml-10 mt-7">
            <div ref={checkInRef}>
              {openCheckIn &&
                <DateRange
                  showClearButton={true}
                  onChange={item => setRange([item.selection])}
                  editableDateInputs={false}
                  moveRangeOnFirstSelection={true}
                  ranges={range}
                  months={2}
                  direction={direction}
                  className="calendarElement"
                  minDate={new Date()}
                  showDateDisplay={false}
                  showMonthAndYearPickers={false}
                  rangeColors={["#B69F6F"]}
                />
              }
            </div>

          </div>

        </div>

        <div className="h-10 w-px  bg-textDark bg-opacity-10 hidden sm:block "></div>

        <div className="justify-start text-start lg:w-[153.25px] h-[69px] flex flex-col md:px-5 sm:px-3 xs:px-2 lg:px-7  py-3 gap-y-[6px]">
          <SearchInputLabel
            text="Check out"
            htmlFor="checkOut"
          />
          <div className="relative w-[101px] lg:w-[105px] text-[15px] lg:text-[1rem] tracking-[-0.16px] font-inter h-[19px] pr-8 ">
            <input
              value={`${searchListingParams.checkOut ? format(searchListingParams.checkOut, "MM/dd/yyyy") : ""}`}
              readOnly
              className="outline-none w-[101px] lg:w-[105px]" // Added padding-right for the icon space
              onClick={() => setOpenCheckOut(openCheckOut => !openCheckOut)}
              placeholder="MM/DD/YYYY"
            />

            {searchListingParams.checkOut && (
              <IoClose
                onClick={() => handleClear()}
                className="absolute  size-3  right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
              />
            )}
          </div>
          <div className="calendarWrap mt-7">
            <div ref={checkOutRef}>
              {openCheckOut &&
                <DateRange
                  showClearButton={true}
                  retainEndDateOnFirstSelection
                  onChange={item => setRange([item.selection])}
                  editableDateInputs={false}
                  moveRangeOnFirstSelection={true}
                  ranges={range}
                  months={2}
                  direction={direction}
                  className="calendarElement"
                  minDate={new Date}
                  showDateDisplay={false}
                  showMonthAndYearPickers={false}
                  rangeColors={["#B69F6F"]}
                />
              }
            </div>

          </div>
        </div>

        <div className="justify-start text-start lg:w-[153.25px] h-[69px] flex flex-col gap-y-2 md:px-5 sm:px-3 xs:px-2 lg:px-7 py-3">
          <SearchInputLabel
            text="Guests"
            htmlFor="guests"
          />
          <input
            id="guest"
            type="number"
            inputMode="numeric"
            pattern="\d*"
            max={50}
            min={0}
            value={searchListingParams.guests}
            onChange={(e) => handleInputChange('guests', e.target.value)}
            placeholder="Any"
            className="outline-none rounded-md py-1 w-full text-[1rem] tracking-[-0.16px] font-inter  h-[19px]"
          />
        </div>

        <button
          disabled={isHomePageLoading}
          onClick={(e) => handleSearch(e)}
          className="hidden sm:flex text-white bg-buttonPrimary rounded-xl px-6 lg:px-8 py-2 lg:py-4 lg:mt-0 w-auto justify-center items-center h-[43px]">
          {isHomePageLoading ? <LoadingSpinner /> : "Search"}
        </button>

      </form>
      <button
        onClick={(e) => handleSearch(e)}
        disabled={isHomePageLoading}
        className="block sm:hidden  text-white bg-buttonPrimary rounded-xl px-8 py-2 lg:py-4 lg:mt-0 w-full justify-center items-center h-[43px]">
        {isHomePageLoading ? <div className="flex justify-center"><LoadingSpinner /></div> : "Search"}
      </button>
    </div >
  );
};

export default SearchListingForm;

