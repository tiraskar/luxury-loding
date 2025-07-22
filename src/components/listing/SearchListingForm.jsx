import { useDispatch, useSelector } from "react-redux";
import { clearSearchCheckInCheckOutDate, getLocationOnSearch, resetSearchedLocation, searchListing, setSearchListingParams, toggleIsSearchedOnSingleListing, toggleSelectedSearchLocation, updateSearchedLocation } from "../../redux/slices/listingSlice";
// import DatePicker from "react-datepicker";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
// import { CiLocationOn } from "react-icons/ci";

import { DateRange } from 'react-date-range';

import format from 'date-fns/format';
import { addDays } from 'date-fns';
import { IoClose } from "react-icons/io5";
import SearchListingMobileView from "./SearchListingMobileView";
import { debounce } from "lodash";
import { MapPin } from "lucide-react";


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
  const { searchListingParams, isHomePageLoading, listingLocationList, isSearchHomePageOpen, searchedLocation, searchedLocationList } = useSelector(state => state.listing)

  // const minDateCheckIn = new Date(Date.now());
  const [filteredLocation, setSearchFilterLocation] = useState([]);
  const [showLocationFilter, setShowLocationFilter] = useState(false)


  const handleInputChange = (name, value) => {
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
  const debouncedSearch = useCallback(
    debounce((value) => {
      value && dispatch(getLocationOnSearch(value)).unwrap().then((res) => {
        if (res.length > 0) {
          setShowLocationFilter(true);
          dispatch(toggleSelectedSearchLocation(res[0]));
        }
      });
      if (value === '') dispatch(resetSearchedLocation());
    }, 500),
    [] // DO NOT include `searchedLocation` here
  );


  const handleSearchLocation = (value) => {
    dispatch(updateSearchedLocation(value));
    debouncedSearch(value); // Debounced call
    dispatch(toggleSelectedSearchLocation(null));
  };

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const handleCheckboxChange = (city) => {
    setSelectedLocations((prev) => {
      if (prev.includes(city)) {
        const location = prev.filter((c) => c !== city);
        handleInputChange('location', location);
        return location;// remove
      } else {
        const location = [...prev, city];
        handleInputChange('location', location);
        return location; // add
      }
    });
  };


  const handleSearchChange = (value) => {
    setSearchQuery(value);
    const filterLocation = listingLocationList.map((location) => {
      const stateMatch = location.state.toLowerCase().includes(value.toLowerCase());

      if (stateMatch) return location;

      const filteredCities = location.cities.filter((cityObj) =>
        cityObj.city.toLowerCase().includes(value.toLowerCase())
      );

      if (filteredCities.length > 0) {
        return { ...location, cities: filteredCities };
      }

      return null;
    }).filter((location) => location !== null);

    setSearchFilterLocation(filterLocation);
  };

  const clearSelectedLocations = () => {
    setSelectedLocations([]);
    handleInputChange('location', []);
    handleSearchLocation('');
  };

  const handleRemoveLocation = (locationToRemove) => {
    const updatedLocations = selectedLocations.filter(loc => loc !== locationToRemove);
    handleInputChange('location', updatedLocations);
    setSelectedLocations(updatedLocations);
    handleSearchLocation('');
  };

  return (
    <>
      {isSearchHomePageOpen && <SearchListingMobileView
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
      />}
    <div
      style={{ boxShadow: "0px 4px 26px 0px rgba(96, 96, 82, 0.24), 0px 0px 0px 6px rgba(255, 255, 255, 0.32)" }}
      className="hidden xs:flex flex-col font-onest items-center bg-white rounded-3xl  shadow-lg">

      <form action="" className=" xs:flex sm:flex-row xs:flex-nowrap items-center xs:space-x-3 py-0.5 lg:w-[822px] h-auto  lg:h-[73px] sm:mr-4 ">


          <div ref={filterRef} className="justify-start text-start lg:w-[153.25px] h-[69px] flex flex-col gap-y-2   md:px-5 sm:px-3 xs:px-2  py-3">
          <SearchInputLabel
            text="Where to go?"
            htmlFor="location"
            />
            {selectedLocations.length == 0 ? <input type="text"
              value={searchedLocation}
              placeholder="Anywhere"
              onChange={(e) => handleSearchLocation(e.target.value)}
              className="outline-none w-[101px]  lg:w-full text-[1rem] tracking-[-0.16px] font-inter lg:pl-1 h-[19px] "
              onFocus={() => setShowLocationFilter(true)}
            />
              :
              <div
                onClick={() => setShowLocationFilter(true)}
                className="flex  overflow-x-scroll gap-2 outline-none w-[101px]  lg:w-full text-[1rem] tracking-[-0.16px] font-inter lg:pl-1 h-[19px] ">
                {selectedLocations?.slice().reverse().map((location, index) => (
                  <div key={index} className="relative flex flex-row w-fit items-center bg-buttonPrimary text-white rounded-full px-2 py-0.5 whitespace-nowrap">
                    {location}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveLocation(location);
                      }}
                      className="ml-1 text-white font-bold"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>}

            {showLocationFilter && (
              <div
                className="
                    absolute w-full lg:w-1/2 mt-16 z-50
                    max-h-[500px] -ml-3
                    bg-white
                    rounded-xl shadow-2xl
                    overflow-hidden flex flex-col
                    transition-all duration-300 ease-in-out
                  "
              >
                {searchedLocation ?
                  <ul className="space-y-3 p-4 overflow-scroll max-h-96">
                    {searchedLocationList?.map((location, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          dispatch(toggleSelectedSearchLocation(location));
                          dispatch(updateSearchedLocation(location.location));
                          setShowLocationFilter(false);
                          document.getElementById('dropDownInputRef').blur();
                        }}
                        className={`
                        group
                        cursor-pointer
                        bg-cardBackgroundLight/50
                        hover:bg-buttonPrimary/20
                        active:bg-buttonPrimary/20
                        rounded-2xl
                        px-5 py-3
                        flex items-center
                        gap-4
                        transition-all duration-200 ease-out
                        hover:scale-[1.01]
                      `}
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-buttonPrimary/10 rounded-full  flex items-center justify-center shadow-sm">
                          <div className="w-8 h-8  flex items-center justify-center">
                            <MapPin className="w-full h-full text-buttonPrimary" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="block text-gray-900 font-medium text-base leading-tight">
                            {location.location}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  :

                  <>
                    {/* Sticky Search Header */}
                    <div className="sticky top-0 z-10 bg-white border-b border-buttonPrimary px-4 py-3 flex items-center gap-2">
                      <div className="relative flex-1">
                        <svg
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                          />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search by city or state..."
                          value={searchQuery}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          className="
                        w-full pl-10 pr-4 py-2
                        rounded-full
                        border border-buttonPrimary
                        focus:outline-none 
                        text-sm
                        placeholder-gray-400
                        transition
                      "
                        />
                      </div>
                      <button
                        type="button"
                        onClick={clearSelectedLocations}
                        className="text-sm text-red-500 hover:underline whitespace-nowrap ml-2"
                      >
                        Clear{selectedLocations.length > 0 && ` (${selectedLocations.length})`}
                      </button>
                    </div>

                    {/* Scrollable Locations */}
                    <div className="overflow-y-auto flex-1">
                      <ul className="divide-y divide-buttonPrimary/50">
                        {filteredLocation.map((location, index) => (
                          <li key={index} className="bg-white px-4 py-4">
                            <p className="text-base font-semibold text-textDark mb-3 border-l-4 border-textDark pl-2">
                              {location.state}
                            </p>
                            <ul className="flex flex-wrap gap-3">
                              {location?.cities
                                ?.slice()
                                .sort((a, b) => a.city.localeCompare(b.city))
                                .map((cityObj, cityIndex) => {
                                  const isSelected = selectedLocations?.includes(cityObj.city);
                                  return (
                                    <li
                                      key={cityIndex}
                                      onClick={() => handleCheckboxChange(cityObj.city)}
                                      className={`
                                    cursor-pointer
                                    text-center
                                    px-3 py-2
                                    rounded-full
                                    text-sm
                                    font-medium
                                    border border-buttonPrimary
                                    transition
                                    ${isSelected
                                      ? 'bg-buttonPrimary text-white '
                                      : 'text-textDark border-buttonPrimary hover:bg-buttonPrimary hover:text-white'}
                                  `}
                                    >
                                      {cityObj.city}
                                    </li>
                                  );
                                })}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>}
              </div>
            )}


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
    </>
  );
};

export default SearchListingForm;

