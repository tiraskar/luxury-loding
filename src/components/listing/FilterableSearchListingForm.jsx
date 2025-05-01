import { GoDotFill } from "react-icons/go";
import { Wrapper } from "..";
import { RiFilter2Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import FilterListing from "./FilterListing";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchCheckInCheckOutDate,
  fetchAvailableListing,
  fetchListingList,
  fetchListingLocationList,
  setSearchListingParams,
  toggleFilterOpen,
} from "../../redux/slices/listingSlice";
import LoadingSpinner from "../ui/LoadingSpinner";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
// import { CiLocationOn } from "react-icons/ci";

import { DateRange } from 'react-date-range';

import format from 'date-fns/format';
import { addDays } from 'date-fns';
import { IoClose } from "react-icons/io5";


const FilterableSearchListing = () => {

  const dispatch = useDispatch();

  const {
    isFetchAvailableListing,
    searchListingParams,
    searchFilter,
    isFilterOpen,
    isFetchListing,
    listingLocationList
  } = useSelector((state) => state.listing);

  const [filteredLocation, setSearchFilterLocation] = useState([]);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showLocationLargeFilterLargeScreen, setShowLocationFilterLargeScreen] = useState(false);

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const checkInSmallScreenRef = useRef(null);
  const checkOutSmallScreenRef = useRef(null);
  const checkInLargeScreenRef = useRef(null);
  const checkOutLargeScreenRef = useRef(null);
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')

  const [openCheckInLargeScreen, setOpenCheckInLargeScreen] = useState(false);
  const [openCheckOutLargeScreen, setOpenCheckOutLargeScreen] = useState(false);
  const [openCheckInSmallScreen, setOpenCheckInSmallScreen] = useState(false);
  const [openCheckOutSmallScreen, setOpenCheckOutSmallScreen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const handleInputChange = (name, value) => {
    if (name === "location") {
      // const filterLocation = listingLocationList
      //   .map((location) => {
      //     const stateMatch = location.state
      //       .toLowerCase()
      //       .includes(value.toLowerCase());

      //     if (stateMatch) return location;

      //     const filteredCities = location.cities.filter((cityObj) =>
      //       cityObj.city.toLowerCase().includes(value.toLowerCase())
      //     );

      //     if (filteredCities.length > 0) {
      //       return { ...location, cities: filteredCities };
      //     }
      //     return null;
      //   })
      //   .filter((location) => location !== null);

      // setSearchFilterLocation(filterLocation);
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

  useEffect(() => {
    if (listingLocationList.length > 0) {
      setSearchFilterLocation(listingLocationList);
    } else {
      setSearchFilterLocation([]);
    }
  }, [listingLocationList]);

  useEffect(() => {
    dispatch(fetchListingLocationList());
  }, []);

  const filterRef = useRef(null);
  const filterRefLargeScreen = useRef(null);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpenCheckIn(false);
      setOpenCheckOut(false);
      setSearchFilterLocation(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowLocationFilter(false);
      }
      if (filterRefLargeScreen.current && !filterRefLargeScreen.current.contains(event.target)) {
        setShowLocationFilterLargeScreen(false);
      }
      if (checkInRef.current && !checkInRef.current.contains(event.target)) {
        setOpenCheckIn(false);
      }

      if (checkOutRef.current && !checkOutRef.current.contains(event.target)) {
        setOpenCheckOut(false);
      }
      if (checkInSmallScreenRef.current && !checkInSmallScreenRef.current.contains(event.target)) {
        setOpenCheckInSmallScreen(false);
      }
      if (checkOutSmallScreenRef.current && !checkOutSmallScreenRef.current.contains(event.target)) {
        setOpenCheckOutSmallScreen(false);
      }

      if (checkInLargeScreenRef.current && !checkInLargeScreenRef.current.contains(event.target)) {
        setOpenCheckInLargeScreen(false);

      }
      if (checkOutLargeScreenRef.current && !checkOutLargeScreenRef.current.contains(event.target)) {
        setOpenCheckOutLargeScreen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", hideOnEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", hideOnEscape);

    };
  }, [filterRef, checkInRef, checkOutRef, checkInSmallScreenRef, checkOutSmallScreenRef, checkInLargeScreenRef, checkOutLargeScreenRef, filterRefLargeScreen]);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (openCheckIn || openCheckInSmallScreen || openCheckInLargeScreen && range[0].startDate) {
      dispatch(
        setSearchListingParams({ name: "checkIn", value: range[0].startDate })
      );
      dispatch(
        setSearchListingParams({ name: "checkOut", value: range[0].endDate })
      );
    }
    if (openCheckOut || openCheckOutSmallScreen || openCheckOutLargeScreen && range[0].endDate) {
      dispatch(
        setSearchListingParams({ name: "checkOut", value: range[0].endDate })
      );
      dispatch(
        setSearchListingParams({ name: "checkIn", value: range[0].startDate })
      );
    }
  }, [range[0].startDate, range[0].endDate]);

  const [direction, setDirection] = useState("horizontal");
  useEffect(() => {
    const updateDirection = () => {
      if (window.innerWidth <= 640) {
        setDirection("vertical");
      } else {
        setDirection("horizontal");
      }
    };
    updateDirection();
    window.addEventListener("resize", updateDirection);
    return () => {
      window.removeEventListener("resize", updateDirection);
    };
  }, []);

  const handleClear = () => {
    if (checkInRef.current) checkInRef.current.value = "";
    if (checkOutRef.current) checkOutRef.current.value = "";
    setOpenCheckIn(false);
    setOpenCheckOut(false);

    if (checkInSmallScreenRef.current) checkInSmallScreenRef.current.value = "";
    if (checkOutSmallScreenRef.current) checkOutSmallScreenRef.current.value = "";
    setOpenCheckInSmallScreen(false);
    setOpenCheckOutSmallScreen(false);


    if (checkInLargeScreenRef.current) checkInLargeScreenRef.current.value = "";
    if (checkOutLargeScreenRef.current) checkOutLargeScreenRef.current.value = "";
    setOpenCheckInLargeScreen(false);
    setOpenCheckOutLargeScreen(false);


    dispatch(clearSearchCheckInCheckOutDate());
    setRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };


  return (
    <Wrapper>
      <div className=" space-y-4 sm:space-y-6">
        <p className="flex items-center text-sm font-medium font-inter tracking-[-0.16px] text-[#A1A196] gap-x-0.5 h-[17px]">
          Home <GoDotFill className="h-2 text-black" />
          <span className="text-black">Listings</span>
        </p>

        <form
          className="md:gap-x-4 grid grid-cols-2 xs:flex md:space-x-0 xs:justify-between lg:grid lg:grid-cols-12 bg-[#F9F9F9] rounded-2xl font-onest tracking-[-1%] md:h-[77px] px-4 xs:px-2 md:px-4 "
        >

          <div className="block lg:hidden min-w-[110px] max-w-[150px]  py-4 h-[45px]">
            <Location
              searchListingParams={searchListingParams}
              handleInputChange={handleInputChange} 
              setShowLocationFilter={setShowLocationFilter}
              filteredLocation={filteredLocation}
              showLocationFilter={showLocationFilter}
              filterRef={filterRef}
              setSearchFilterLocation={setSearchFilterLocation}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <div className="block lg:hidden pt-[15px] pb-[17px]">
            <CheckInSmallScreen
              checkInRef={checkInSmallScreenRef}
              range={range}
              setRange={setRange}
              direction={direction}
              openCheckIn={openCheckInSmallScreen}
              setOpenCheckIn={setOpenCheckInSmallScreen}
              openCheckOut={openCheckOutSmallScreen}
              setOpenCheckOut={setOpenCheckOutSmallScreen}
              searchListingParams={searchListingParams}
              handleClear={handleClear}
            />
          </div>
          <div className="block lg:hidden pt-[15px] pb-[17px]">
            <CheckOutSmallScreen
              checkOutRef={checkOutSmallScreenRef}
              range={range}
              setRange={setRange}
              direction={direction}
              openCheckOut={openCheckOutSmallScreen}
              setOpenCheckOut={setOpenCheckOutSmallScreen}
              searchListingParams={searchListingParams}
              handleClear={handleClear}
              openCheckIn={openCheckInSmallScreen}
              setOpenCheckIn={setOpenCheckInSmallScreen}
            />

          </div>
          <div className="block lg:hidden pt-[15px] pb-[17px]">
            <Guests
              searchListingParams={searchListingParams}
              handleInputChange={handleInputChange}
            />

          </div>
          <div className="hidden sm:block md:block lg:hidden pt-[17px] pb-[17px]">
            <SearchButton
              isFetchAvailableListing={isFetchAvailableListing}
              handleSearch={handleSearch}
              dispatch={dispatch}
              toggleFilterOpen={toggleFilterOpen}
              isFetchListing={isFetchListing}
            />

          </div>

          <div className="hidden lg:flex lg:col-span-2">
            <div className=" lg:w-full lg:max-w-full   lg:py-4 h-[45px]">
              <LocationLargeScreen
                filterRef={filterRefLargeScreen}
                handleInputChange={handleInputChange}
                setShowLocationFilter={setShowLocationFilterLargeScreen}
                filteredLocation={filteredLocation}
                showLocationFilter={showLocationLargeFilterLargeScreen}
                setSearchFilterLocation={setSearchFilterLocation}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>

          {/*lg screen*/}

          <div className="hidden justify-between lg:flex xl:hidden flex-row lg:space-x-[100px]  xl:space-x-[173px] md:col-span-10 items-center">
            <div className="">
              <CheckInLargeScreen
                checkInRef={checkInLargeScreenRef}
                range={range}
                setRange={setRange}
                direction={direction}
                openCheckIn={openCheckInLargeScreen}
                setOpenCheckIn={setOpenCheckInLargeScreen}
                openCheckOut={openCheckOutLargeScreen}
                setOpenCheckOut={setOpenCheckOutLargeScreen}
                searchListingParams={searchListingParams}
                handleClear={handleClear}
              />
            </div>

            <div className="">
              <CheckOutLargeScreen
                checkOutRef={checkOutLargeScreenRef}
                range={range}
                setRange={setRange} 
                direction={direction}
                openCheckOut={openCheckOutLargeScreen}
                setOpenCheckOut={setOpenCheckOutLargeScreen}
                searchListingParams={searchListingParams}
                handleClear={handleClear}
                openCheckIn={openCheckInLargeScreen}
                setOpenCheckIn={setOpenCheckInLargeScreen}
              />
            </div>

            <div className="pt-[15px] pb-[17px]">
              <Guests
                searchListingParams={searchListingParams}
                handleInputChange={handleInputChange}
              />
            </div>

            <div className="hidden sm:block pt-[17px] pb-[17px]">
              <SearchButton
                isFetchAvailableListing={isFetchAvailableListing}
                handleSearch={handleSearch}
                dispatch={dispatch}
                toggleFilterOpen={toggleFilterOpen}
                isFetchListing={isFetchListing}
              />
            </div>
          </div>

          {/*xl screen */}
          <div className="hidden justify-end  xl:flex flex-row  xl:space-x-[173px] md:col-span-10">
            <div className="hidden lg:flex flex-row  md:space-x-[40px] lg:space-x-[100px] xl:space-x-[173px] pt-[15px] pb-[17px]">
              <div className="">
                <CheckIn
                  checkInRef={checkInRef}
                  range={range}
                  setRange={setRange}
                  direction={direction}
                  openCheckIn={openCheckIn}
                  setOpenCheckIn={setOpenCheckIn}
                  openCheckOut={openCheckOut}
                  setOpenCheckOut={setOpenCheckOut}
                  searchListingParams={searchListingParams}
                  handleClear={handleClear}
                />
              </div>
              <div className="">
                <CheckOut
                  checkOutRef={checkOutRef}
                  range={range}
                  setRange={setRange}
                  direction={direction}
                  openCheckOut={openCheckOut}
                  setOpenCheckOut={setOpenCheckOut}
                  searchListingParams={searchListingParams}
                  handleClear={handleClear}
                  openCheckIn={openCheckIn}
                  setOpenCheckIn={setOpenCheckIn}
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
        <div className="flex gap-x-4 sm:hidden ">
          <button
            type="button"
            onClick={() => dispatch(toggleFilterOpen())}
            className="text-black bg-white border-[0.6px] border-[#D7DBE8] rounded-xl px-4 py-3 sm:py-4 h-[43px] flex items-center justify-center text-[13px] font-medium w-full min-w-[100px] space-x-2"
          >
            <RiFilter2Line size={20} /> Filters
          </button>
          <button
            disabled={isFetchListing || isFetchAvailableListing}
            onClick={(e) => handleSearch(e)}
            className="flex items-center flex-row justify-center space-x-1 text-white bg-buttonPrimary rounded-xl px-4 md:px-8 py-3 sm:py-4 w-full min-w-[117px] h-[43px]"
          >
            {!isFetchAvailableListing && "Search"}
            {isFetchAvailableListing && <LoadingSpinner />}
          </button>
        </div>
        {isFilterOpen && <FilterListing />}
      </div>
    </Wrapper>
  );
};

export default FilterableSearchListing;



const SearchButton = ({ isFetchAvailableListing, handleSearch, dispatch, toggleFilterOpen, isFetchListing }) => {
  return (
    <div className=" flex flex-row gap-2 md:gap-3 w-full sm:w-auto ">
      <button
        type="button"
        onClick={() => dispatch(toggleFilterOpen())}
        className="text-black bg-white border-[0.6px] border-[#D7DBE8] rounded-xl px-4 py-3 sm:py-4 h-[43px] flex items-center justify-center text-[13px] font-medium lg:w-[100px] space-x-2"
      >
        <RiFilter2Line size={20} /> <span className="hidden md:block">Filters</span>
      </button>
      <button
        disabled={isFetchListing || isFetchAvailableListing}
        onClick={(e) => handleSearch(e)}
        className="flex items-center flex-row justify-center space-x-1 text-white bg-buttonPrimary rounded-xl px-4 md:px-8 py-3 sm:py-4  sm:w-auto md:min-w-[117px] h-[43px]"
      >
        {!isFetchAvailableListing && "Search"}
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

const Location = ({
  handleInputChange,
  setShowLocationFilter,
  filteredLocation,
  showLocationFilter,
  filterRef,
  setSearchFilterLocation,
  //eslint-disable-next-line
  selectedLocations, setSelectedLocations, searchQuery, setSearchQuery
}) => {
  const { searchListingParams, listingLocationList } = useSelector(state => state.listing);


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

  const clearSelectedLocations = () => {
    setSelectedLocations([]);
    handleInputChange('location', []);
  };

  const handleRemoveLocation = (locationToRemove) => {
    const updatedLocations = selectedLocations.filter(loc => loc !== locationToRemove);
    handleInputChange('location', updatedLocations);
    setSelectedLocations(updatedLocations);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    const filterLocation = listingLocationList?.map((location) => {
      const stateMatch = location?.state?.toLowerCase()?.includes(value.toLowerCase());

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

  return (
    <div className="relative flex flex-col w-full text-sm gap-1.5">
      <label className="text-sm font-semibold">Where to go?</label>

      {selectedLocations.length === 0 ? (
        <input
          type="text"
          value={searchListingParams.location}
          onClick={() => document.getElementById('dropDownInputRef').focus()}
          placeholder="Anywhere"
          className="search-input"
          onFocus={() => setShowLocationFilter(true)}
        />
      ) : (
        <div
          onClick={() => setShowLocationFilter(true)}
          className="flex gap-2 overflow-x-scroll text-sm font-inter p-1 "
        >
          {selectedLocations?.slice()?.reverse().map((location, index) => (
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
        </div>
      )}

      {showLocationFilter && (
        <div
          ref={filterRef}
          className="bg-white absolute w-full min-w-[320px] max-w-[400px] max-h-80 overflow-y-scroll mt-16 rounded-md shadow-lg z-50"
        >
          <div className="flex items-center justify-between p-2 border-b">
            <input
              id="dropDownInputRef"
              type="text"
              placeholder="Search by city or state"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-3/5 border px-2 py-1 rounded-md outline-none text-sm"
            />
            <button
              type="button"
              onClick={clearSelectedLocations}
              className="text-sm text-red-500 hover:underline"
            >
              Clear Filter{selectedLocations.length > 0 && ` (${selectedLocations.length})`}
            </button>
          </div>

          <ul className="p-2 space-y-3">
            {filteredLocation?.map((location, index) => (
              <li key={index}>
                <p className="font-semibold text-gray-700">{location.state}</p>
                <ul className="pl-3 space-y-1 mt-1">
                  {location?.cities?.map((cityObj, cityIndex) => {
                    const isChecked = selectedLocations.includes(cityObj.city);
                    return (
                      <li key={cityIndex} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(cityObj.city)}
                        />
                        <label
                          className="text-sm cursor-pointer"
                          onClick={() => handleCheckboxChange(cityObj.city)}
                        >
                          {cityObj.city}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


Location.propTypes = {
  handleInputChange: PropTypes.func,
  setShowLocationFilter: PropTypes.func,
  filteredLocation: PropTypes.array,
  showLocationFilter: PropTypes.bool,
  filterRef: PropTypes.any,
  setSearchFilterLocation: PropTypes.func,
  selectedLocations: PropTypes.array,
  setSelectedLocations: PropTypes.func
};

//eslint-disable-next-line
const LocationLargeScreen = ({ handleInputChange, setShowLocationFilter, filteredLocation, showLocationFilter, filterRef, setSearchFilterLocation, selectedLocations, setSelectedLocations, searchQuery, setSearchQuery }) => {

  const { searchListingParams, listingLocationList } = useSelector(state => state.listing);



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
    const filterLocation = listingLocationList?.map((location) => {
      const stateMatch = location?.state?.toLowerCase()?.includes(value.toLowerCase());

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
  };

  const handleRemoveLocation = (locationToRemove) => {
    const updatedLocations = selectedLocations.filter(loc => loc !== locationToRemove);
    handleInputChange('location', updatedLocations);
    setSelectedLocations(updatedLocations);
  };


  return (
    <div ref={filterRef} className="relative  flex flex-col w-full text-sm gap-1.5 ">
      <label className="text-sm font-semibold">Where to go?</label>
      {selectedLocations?.length == 0 ? <input
        type="text"
        value={searchListingParams.location}
        onClick={() => {
          document.getElementById('dropDownInputRef').focus();

        }}
        placeholder="Anywhere"
        className="search-input"
        onFocus={() => {
          setShowLocationFilter(true);
        }}
      />
        :
        <div
          onClick={() => setShowLocationFilter(true)}
          className="flex gap-2 overflow-x-scroll text-sm font-inter p-1 "
        >
          {selectedLocations?.slice()?.reverse().map((location, index) => (
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
        </div>
      }

      {showLocationFilter && (
        <div
          className="bg-white absolute w-[500px]  mt-16 rounded-md shadow-lg max-h-80 overflow-y-scroll z-50"
        >
          {/* Search Input */}
          <div className="flex flex-row items-center justify-between p-2 border-b">
            <input
              id="dropDownInputRef"
              type="text"
              placeholder="Search by city or state"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-3/4 border px-2 py-1 rounded-md outline-none text-sm"
            />
            {/* Clear Filter Button */}
            <div className=" text-right">
              <button
                type="button"
                onClick={() => clearSelectedLocations()}
                className="text-sm text-red-500 hover:underline items-center"
              >
                Clear Filter{selectedLocations.length > 0 && `(${selectedLocations.length})`}
              </button>
            </div>
          </div>

          {/* Filtered Locations */}
          <ul className="p-2 space-y-3">
            {filteredLocation?.map((location, index) => (
              <li key={index}>
                <p className="font-semibold text-gray-700">{location.state}</p>
                <ul className="pl-3 space-y-1 mt-1">
                  {location?.cities?.map((cityObj, cityIndex) => {
                    const isChecked = selectedLocations?.includes(cityObj.city);
                    return (
                      <li key={cityIndex} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(cityObj.city)}
                        />
                        <label className="text-sm cursor-pointer" onClick={() => handleCheckboxChange(cityObj.city)}>
                          {cityObj.city}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>


        </div>
      )}
    </div>
  );
};

LocationLargeScreen.propTypes = {
  handleInputChange: PropTypes.func,
  setShowLocationFilter: PropTypes.func,
  filteredLocation: PropTypes.array,
  showLocationFilter: PropTypes.bool,
  filterRef: PropTypes.any,
  selectedLocations: PropTypes.array,
  setSelectedLocations: PropTypes.func
};

const Guests = ({ searchListingParams, handleInputChange }) => {
  return (
    <div className="grid grid-flow-col sm:space-x-4 items-center w-[62px] ">
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

const CheckOut = ({
  searchListingParams,
  setOpenCheckOut,
  openCheckOut,
  setRange,
  direction,
  range,
  handleClear,
  setOpenCheckIn,
  checkOutRef
}) => {
  return (
    <div className="lg:grid lg:grid-flow-col lg:space-x-4 items-center w-[117px] h-[45px]">
      <div className="h-10 w-px bg-textDark bg-opacity-10 hidden lg:block"></div>
      <div className="flex flex-col w-[117px] text-sm gap-1.5">
        <label className="text-sm font-semibold">Check out</label>
        <div className="relative max-w-[117px]">
          <input
            value={`${searchListingParams.checkOut ? format(searchListingParams.checkOut, "MM/dd/yyyy") : ""}`}
            readOnly
            className="search-input max-w-[117px]"
            onClick={() => {
              setOpenCheckOut(openCheckOut => !openCheckOut);
              setOpenCheckIn(false);
            }}
            placeholder="MM/DD/YYYY"
          />
          {searchListingParams.checkOut && (
            <IoClose
              onClick={handleClear}
              className="absolute size-3 right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
            />
          )}
        </div>
        <div className="calendarWrap ml-32 xs:ml-10 mt-7">
          <div ref={checkOutRef}>
            {openCheckOut && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


CheckOut.propTypes = {
  searchListingParams: PropTypes.object.isRequired,
  setOpenCheckOut: PropTypes.func.isRequired,
  openCheckOut: PropTypes.bool.isRequired,
  setRange: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  range: PropTypes.array.isRequired,
  handleClear: PropTypes.func.isRequired,
  setOpenCheckIn: PropTypes.func,
  checkOutRef: PropTypes.any

};


const CheckIn = ({

  setOpenCheckIn,
  openCheckIn,
  setRange,
  direction,
  range,
  handleClear,
  setOpenCheckOut,
  checkInRef
}) => {

  const { searchListingParams } = useSelector(state => state.listing);

  return (
    <div className="lg:grid lg:grid-flow-col lg:space-x-4 items-center w-[117px] h-[45px]">
      <div className="hidden lg:block h-10 w-px bg-textDark bg-opacity-10"></div>
      <div className="flex flex-col w-full text-sm gap-1.5">
        <label className="text-sm font-semibold">Check in</label>
        <div className="relative max-w-[117px]">
          <input
            value={`${searchListingParams.checkIn ? format(searchListingParams.checkIn, "MM/dd/yyyy") : ""}`}
            readOnly
            className="search-input max-w-[117px]"
            onClick={() => {
              setOpenCheckIn(openCheckIn => !openCheckIn);
              setOpenCheckOut(false);
            }}
            placeholder="MM/DD/YYYY"
          />
          {searchListingParams.checkIn && (
            <IoClose
              onClick={handleClear}
              className="absolute size-3 right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
            />
          )}
        </div>
        <div className="calendarWrap xs:ml-10 sm:ml-20 mt-7">
          {openCheckIn && (
            <div ref={checkInRef}>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CheckIn.propTypes = {
  handleInputChange: PropTypes.func,
  minDateCheckIn: PropTypes.object,
  searchListingParams: PropTypes.object,
  handleClear: PropTypes.func,
  openCheckIn: PropTypes.bool,
  setOpenCheckIn: PropTypes.func,
  setRange: PropTypes.func,
  direction: PropTypes.string,
  range: PropTypes.array,
  setOpenCheckOut: PropTypes.func,
  checkInRef: PropTypes.any
};



const CheckOutSmallScreen = ({
  // searchListingParams,
  setOpenCheckOut,
  openCheckOut,
  setRange,
  direction,
  range,
  handleClear,
  setOpenCheckIn,
  checkOutRef
}) => {

  const { searchListingParams } = useSelector(state => state.listing);
  return (
    <div className="lg:grid lg:grid-flow-col lg:space-x-4 items-center w-[117px] h-[45px]">
      <div className="h-10 w-px bg-textDark bg-opacity-10 hidden lg:block"></div>
      <div className="flex flex-col w-[117px] text-sm gap-1.5">
        <label className="text-sm font-semibold">Check out</label>
        <div className="relative max-w-[117px]">
          <input
            value={`${searchListingParams.checkOut ? format(searchListingParams.checkOut, "MM/dd/yyyy") : ""}`}
            readOnly
            className="search-input max-w-[117px]"
            onClick={() => {
              setOpenCheckOut(openCheckOut => !openCheckOut);
              setOpenCheckIn(false);
            }}
            placeholder="MM/DD/YYYY"
          />
          {searchListingParams.checkOut && (
            <IoClose
              onClick={handleClear}
              className="absolute size-3 right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
            />
          )}
        </div>
        <div className="calendarWrap ml-32 xs:ml-10 mt-7">
          <div ref={checkOutRef}>
            {openCheckOut && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


CheckOutSmallScreen.propTypes = {
  searchListingParams: PropTypes.object.isRequired,
  setOpenCheckOut: PropTypes.func.isRequired,
  openCheckOut: PropTypes.bool.isRequired,
  setRange: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  range: PropTypes.array.isRequired,
  handleClear: PropTypes.func.isRequired,
  setOpenCheckIn: PropTypes.func,
  checkOutRef: PropTypes.any

};


const CheckInSmallScreen = ({
  // searchListingParams,
  setOpenCheckIn,
  openCheckIn,
  setRange,
  direction,
  range,
  handleClear,
  setOpenCheckOut,
  checkInRef
}) => {

  const { searchListingParams } = useSelector(state => state.listing);
  return (
    <div className="lg:grid lg:grid-flow-col lg:space-x-4 items-center w-[117px] h-[45px]">
      <div className="hidden lg:block h-10 w-px bg-textDark bg-opacity-10"></div>
      <div className="flex flex-col w-full text-sm gap-1.5">
        <label className="text-sm font-semibold">Check in</label>
        <div className="relative max-w-[117px]">
          <input
            value={`${searchListingParams.checkIn ? format(searchListingParams.checkIn, "MM/dd/yyyy") : ""}`}
            readOnly
            className="search-input max-w-[117px]"
            onClick={() => {
              setOpenCheckIn(openCheckIn => !openCheckIn);
              setOpenCheckOut(false);
            }}
            placeholder="MM/DD/YYYY"
          />
          {searchListingParams.checkIn && (
            <IoClose
              onClick={handleClear}
              className="absolute size-3 right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
            />
          )}
        </div>
        <div className="calendarWrap xs:ml-10 sm:ml-20 mt-7">
          {openCheckIn && (
            <div ref={checkInRef}>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CheckInSmallScreen.propTypes = {
  handleInputChange: PropTypes.func,
  minDateCheckIn: PropTypes.object,
  searchListingParams: PropTypes.object,
  handleClear: PropTypes.func,
  openCheckIn: PropTypes.bool,
  setOpenCheckIn: PropTypes.func,
  setRange: PropTypes.func,
  direction: PropTypes.string,
  range: PropTypes.array,
  setOpenCheckOut: PropTypes.func,
  checkInRef: PropTypes.any
};


const CheckOutLargeScreen = ({
  // searchListingParams,
  setOpenCheckOut,
  openCheckOut,
  setRange,
  direction,
  range,
  handleClear,
  setOpenCheckIn,
  checkOutRef
}) => {
  const { searchListingParams } = useSelector(state => state.listing);
  return (
    <div className="lg:grid lg:grid-flow-col lg:space-x-4 items-center w-[117px] h-[45px]">
      <div className="h-10 w-px bg-textDark bg-opacity-10 hidden lg:block"></div>
      <div className="flex flex-col w-[117px] text-sm gap-1.5">
        <label className="text-sm font-semibold">Check out</label>
        <div className="relative max-w-[117px]">
          <input
            value={`${searchListingParams.checkOut ? format(searchListingParams.checkOut, "MM/dd/yyyy") : ""}`}
            readOnly
            className="search-input max-w-[117px]"
            onClick={() => {
              setOpenCheckOut(openCheckOut => !openCheckOut);
              setOpenCheckIn(false);
            }}
            placeholder="MM/DD/YYYY"
          />
          {searchListingParams.checkOut && (
            <IoClose
              onClick={handleClear}
              className="absolute size-3 right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
            />
          )}
        </div>
        <div className="calendarWrap ml-32 xs:ml-10 mt-7">
          <div ref={checkOutRef}>
            {openCheckOut && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


CheckOutLargeScreen.propTypes = {
  searchListingParams: PropTypes.object.isRequired,
  setOpenCheckOut: PropTypes.func.isRequired,
  openCheckOut: PropTypes.bool.isRequired,
  setRange: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  range: PropTypes.array.isRequired,
  handleClear: PropTypes.func.isRequired,
  setOpenCheckIn: PropTypes.func,
  checkOutRef: PropTypes.any

};


const CheckInLargeScreen = ({
  // searchListingParams,
  setOpenCheckIn,
  openCheckIn,
  setRange,
  direction,
  range,
  handleClear,
  setOpenCheckOut,
  checkInRef
}) => {

  const { searchListingParams } = useSelector(state => state.listing);

  return (
    <div className="lg:grid lg:grid-flow-col lg:space-x-4 items-center w-[117px] h-[45px]">
      <div className="hidden lg:block h-10 w-px bg-textDark bg-opacity-10"></div>
      <div className="flex flex-col w-full text-sm gap-1.5">
        <label className="text-sm font-semibold">Check in</label>
        <div className="relative max-w-[117px]">
          <input
            value={`${searchListingParams.checkIn ? format(searchListingParams.checkIn, "MM/dd/yyyy") : ""}`}
            readOnly
            className="search-input max-w-[117px]"
            onClick={() => {
              setOpenCheckIn(openCheckIn => !openCheckIn);
              setOpenCheckOut(false);
            }}
            placeholder="MM/DD/YYYY"
          />
          {searchListingParams.checkIn && (
            <IoClose
              onClick={handleClear}
              className="absolute size-3 right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
            />
          )}
        </div>
        <div className="calendarWrap xs:ml-10 sm:ml-20 mt-7">
          {openCheckIn && (
            <div ref={checkInRef}>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CheckInLargeScreen.propTypes = {
  handleInputChange: PropTypes.func,
  minDateCheckIn: PropTypes.object,
  searchListingParams: PropTypes.object,
  handleClear: PropTypes.func,
  openCheckIn: PropTypes.bool,
  setOpenCheckIn: PropTypes.func,
  setRange: PropTypes.func,
  direction: PropTypes.string,
  range: PropTypes.array,
  setOpenCheckOut: PropTypes.func,
  checkInRef: PropTypes.any
};