import { useDispatch, useSelector } from "react-redux";
import { clearSearchCheckInCheckOutDate, searchListing, setSearchListingParams, toggleIsSearchedOnSingleListing, toggleIsSearchHomePageOpen } from "../../redux/slices/listingSlice";
import { SearchInputLabel } from "./SearchListingForm";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { toast } from "react-toastify";
import { CiLocationOn } from "react-icons/ci";
import { addDays, format } from "date-fns";
import { DateRange } from "react-date-range";
import { IoClose } from "react-icons/io5";


const SearchListingMobileView = () => {
  const dispatch = useDispatch();
  const { searchListingParams, isHomePageLoading, listingLocationList } = useSelector(state => state.listing);

  const [filteredLocation, setSearchFilterLocation] = useState([]);
  const [showLocationFilter, setShowLocationFilter] = useState(false)

  const handleInputChange = (name, value) => {
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
    dispatch(toggleIsSearchedOnSingleListing(true));
  };

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
    <div className="xs:hidden fixed inset-0 bg-black bg-opacity-50 flex  justify-center  items-center  z-50 text-[#333333] transition-all delay-500 ease-in-out">
      <div className="relative w-full bg-white rounded-2xl shadow-lg z-10 py-2 mx-5 xss:mx-7 ">
        <div className="flex justify-between items-center px-4 py-2">
          <h2 className="text-[18px] font-medium font-inter tracking-[-2%]">Search listing</h2>
          <button
            className="text-3xl font-normal opacity-50"
            onClick={() => dispatch(toggleIsSearchHomePageOpen(false))}
          >
            &times;
          </button>
        </div>

        <div className="min-w-full h-px bg-[#E0E0E0]"></div>
        <div className="space-y-[9px] px-5 font-inter tracking-[-1%] py-4">
          <form action="" className="grid grid-cols-2 items-center">

            <div className=" flex-1 justify-start text-start lg:w-[153.25px] h-[69px] flex flex-col gap-y-2   md:px-5 sm:px-3 xs:px-2 lg:px-7 py-3">
              <SearchInputLabel
                text="Where to go?"
                htmlFor="location"
              />
              <input type="text"
                value={searchListingParams.location}
                placeholder="Anywhere"
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="text-[1rem] tracking-[-0.16px] font-inter h-[19px]"
                onFocus={() => setShowLocationFilter(true)}
              />
              {showLocationFilter &&
                <div
                  ref={filterRef}
                  className="bg-white text-textDark z-40 absolute min-w-[300px] xl:min-w-[350px] sm:max-w-[400px] max-h-80 overflow-hidden overflow-y-scroll mt-16 py-2 rounded-lg shadow-lg ">
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


            <div className="justify-start text-start lg:w-[153.25px] h-[69px] flex flex-col md:px-5 sm:px-3 xs:px-2 lg:px-7 py-3 gap-y-[6px]">
              <SearchInputLabel
                text="Check in"
                htmlFor="checkIn"
              />
              <div className="relative w-[101px] lg:w-[105px] text-[15px] lg:text-[1rem] tracking-[-0.16px] font-inter h-[19px]">
                <input
                  value={`${searchListingParams.checkIn ? format(searchListingParams.checkIn, "MM/dd/yyyy") : ""}`}
                  readOnly
                  className="outline-none w-[101px] lg:w-[105px] text-[15px] lg:text-[1rem] tracking-[-0.16px] font-inter h-[19px]"
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
              <div className="absolute top-0">
                <div ref={checkInRef}>
                  {openCheckIn &&
                    <DateRange
                      showClearButton={true}
                      onChange={item => setRange([item.selection])}
                      editableDateInputs={false}
                      moveRangeOnFirstSelection={true}
                      ranges={range}
                      months={2}
                      direction='vertical'
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


            <div className="justify-start text-start lg:w-[153.25px] h-[69px] flex flex-col md:px-5 sm:px-3 xs:px-2 lg:px-7  py-3 gap-y-[6px]">
              <SearchInputLabel
                text="Check out"
                htmlFor="checkOut"
              />
              <div className="relative w-[101px] lg:w-[105px] text-[15px] lg:text-[1rem] tracking-[-0.16px] font-inter h-[19px]">
                <input
                  value={`${searchListingParams.checkOut ? format(searchListingParams.checkOut, "MM/dd/yyyy") : ""}`}
                  readOnly
                  className="outline-none w-[101px] lg:w-[105px] text-[15px] lg:text-[1rem] tracking-[-0.16px] font-inter h-[19px]"
                  onClick={() => setOpenCheckIn(openCheckIn => !openCheckIn)}
                  placeholder="MM/DD/YYYY"
                />
                {searchListingParams.checkOut && (
                  <IoClose
                    onClick={() => handleClear()}
                    className="absolute  size-3  right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
                  />
                )}
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
          </form>
          <button
            onClick={(e) => handleSearch(e)}
            disabled={isHomePageLoading}
            className="  text-white bg-buttonPrimary rounded-xl px-8 py-2 lg:py-4 lg:mt-0 w-full justify-center items-center h-[43px]">
            {isHomePageLoading ? <div className="flex justify-center"><LoadingSpinner /></div> : "Search"}
          </button>
        </div>
      </div>
    </div >
  );
};

export default SearchListingMobileView;