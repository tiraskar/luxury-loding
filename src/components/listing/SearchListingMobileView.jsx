import { useDispatch, useSelector } from "react-redux";
import { searchListing, setSearchListingParams, toggleIsSearchedOnSingleListing, toggleIsSearchHomePageOpen } from "../../redux/slices/listingSlice";
import { SearchInputLabel } from "./SearchListingForm";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import LoadingSpinner from "../ui/LoadingSpinner";
import { toast } from "react-toastify";
import { CiLocationOn } from "react-icons/ci";


const SearchListingMobileView = () => {
  const dispatch = useDispatch();
  const { searchListingParams, isHomePageLoading, listingLocationList } = useSelector(state => state.listing);
  const [minDateCheckOut, setMinDateCheckOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));

  const [filteredLocation, setSearchFilterLocation] = useState([]);
  const [showLocationFilter, setShowLocationFilter] = useState(false)

  const minDateCheckIn = new Date(Date.now());
  const handleInputChange = (name, value) => {
    if (name == 'checkIn') {
      const checkInDate = new Date(value);
      setMinDateCheckOut(new Date(checkInDate.setDate(checkInDate.getDate() + 1)));
    }
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
                  className="bg-white text-textDark z-40 absolute min-w-[250px] sm:max-w-[400px] max-h-56 overflow-hidden overflow-y-scroll mt-16 py-2 rounded-lg shadow-lg px-2">
                  <ul className="space-y-1 text-sm">
                    {filteredLocation?.map((location, index) => (
                      <ul key={index} className="ml-1 space-y-1">
                        {location.cities.map((cityObj, cityIndex) => (
                          <li key={cityIndex} className="flex items-center space-x-1 cursor-pointer"
                            onClickCapture={() => {
                              handleInputChange('location', cityObj.city);
                              setShowLocationFilter(false);
                            }}
                          >
                            <CiLocationOn className="text-buttonPrimary text-xs" />
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
              <DatePicker
                type="text"
                selected={searchListingParams.checkIn}
                dateFormat="MM/dd/YYYY"
                placeholderText="MM/DD/YYYY"
                minDate={minDateCheckIn}
                className="outline-none w-[105px] text-[1rem] tracking-[-0.16px] font-inter h-[19px]"
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
                      e.target.value += '/';
                    } else if (value.length === 5) {
                      e.target.value += '/';
                    }
                  }
                }}
              />

            </div>


            <div className="justify-start text-start lg:w-[153.25px] h-[69px] flex flex-col md:px-5 sm:px-3 xs:px-2 lg:px-7  py-3 gap-y-[6px]">
              <SearchInputLabel
                text="Check out"
                htmlFor="checkOut"
              />
              <DatePicker
                type="text"
                selected={searchListingParams.checkOut}
                dateFormat="MM/dd/YYYY"
                placeholderText="MM/DD/YYYY"
                minDate={minDateCheckOut}
                className="outline-none w-[105px] text-[1rem] tracking-[-0.16px] font-inter h-[19px]"
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
                      e.target.value += '/';
                    } else if (value.length === 5) {
                      e.target.value += '/';
                    }
                  }
                }}
              />
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