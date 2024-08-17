import { useDispatch, useSelector } from "react-redux";
import { searchListing, setSearchListingParams, toggleIsSearchedOnSingleListing } from "../../redux/slices/listingSlice";
import DatePicker from "react-datepicker";
import LoadingSpinner from "../ui/LoadingSpinner";
import { notifyToastMessage } from "../ui/CustomToast";
import { useState } from "react";
import PropTypes from "prop-types";

const SearchInputLabel = ({ text, htmlFor }) => {
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
  const [minDateCheckOut, setMinDateCheckOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1)))
  const dispatch = useDispatch();
  const { isHomePageSearch, searchListingParams } = useSelector(state => state.listing)

  const minDateCheckIn = new Date(Date.now());


  const handleInputChange = (name, value) => {
    if (name == 'checkIn') {
      const checkInDate = new Date(value);
      setMinDateCheckOut(new Date(checkInDate.setDate(checkInDate.getDate() + 1)));
    }
    dispatch(setSearchListingParams({ name, value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if ((searchListingParams.checkIn && !searchListingParams.checkOut) || (searchListingParams.checkOut && !searchListingParams.checkIn)) {
      return notifyToastMessage("Provide check-in and check-out date.");
    }
    dispatch(searchListing());
    dispatch(toggleIsSearchedOnSingleListing(true))
  }

  return (
    <div
      style={{ boxShadow: "0px 4px 26px 0px rgba(96, 96, 82, 0.24), 0px 0px 0px 6px rgba(255, 255, 255, 0.32)" }}
      className="flex flex-col font-onest items-center bg-white rounded-3xl  shadow-lg ">

      <form action="" className=" grid grid-cols-2 md:flex md:flex-wrap md:flex-grow-0 md:justify-around items-center space-x-3 py-0.5 lg:w-[822px] h-auto  lg:h-[73px] mr-4">

        <div className="justify-start w-[153.25px] h-[69px] flex flex-col gap-y-2 px-7 py-3">
          <SearchInputLabel
            text="Where to go?"
            htmlFor="location"
          />
          <input type="text"
            value={searchListingParams.location}
            placeholder="Anywhere"
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="outline-none  w-full text-[1rem] tracking-[-0.16px] font-inter pl-1 h-[19px]"
          />
        </div>

        <div className="h-10 w-px  bg-textDark bg-opacity-10 hidden lg:block "></div>

        <div className="justify-start text-start w-[153.25px] h-[69px] flex flex-col px-7 py-3 gap-y-[6px]">
          <SearchInputLabel
            text="Check in"
            htmlFor="checkIn"
          />
          <DatePicker type="text"
            selected={searchListingParams.checkIn}
            onChange={(date) => handleInputChange('checkIn', date)}
            dateFormat="dd.MM.YYYY"
            placeholderText="MM.DD.YYYY"
            minDate={minDateCheckIn}
            className="outline-none w-[101px]  text-[1rem] tracking-[-0.16px] font-inter  h-[19px]"
          />
        </div>

        <div className="h-10 w-px  bg-textDark bg-opacity-10 hidden lg:block "></div>

        <div className="justify-start text-start w-[153.25px] h-[69px] flex flex-col px-7 py-3 gap-y-[6px]">
          <SearchInputLabel
            text="Check out"
            htmlFor="checkOut"
          />
          <DatePicker type="text"
            selected={searchListingParams.checkOut}
            onChange={(date) => handleInputChange('checkOut', date)}
            dateFormat="dd.MM.YYYY"
            placeholderText="MM.DD.YYYY"
            minDate={minDateCheckOut}
            className="outline-none  w-[101px]  text-[1rem] tracking-[-0.16px] font-inter  h-[19px]"
          />
        </div>

        <div className="justify-start text-start w-[153.25px] h-[69px] flex flex-col gap-y-2 px-7 py-3">
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
          onClick={(e) => handleSearch(e)}
          className="hidden md:flex text-white bg-buttonPrimary rounded-xl px-8 py-2 lg:py-4 lg:mt-0 w-auto justify-center items-center h-[43px]">
          {isHomePageSearch ? <LoadingSpinner /> : "Search"}
        </button>

      </form>
      <button
        onClick={(e) => handleSearch(e)}
        className="block lg:hidden text-white bg-buttonPrimary rounded-xl px-8 py-2 lg:py-4 lg:mt-0 w-full justify-center items-center h-[43px]">
        {isHomePageSearch ? <LoadingSpinner /> : "Search"}
      </button>


    </div >
  );
};

export default SearchListingForm;






{/* <form className="flex flex-col md:flex-row  items-center  w-full ">
        <div className="flex items-center justify-center overflow-hidden">
          <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 items-center space-y-1 w-[97.3px]">
            <label className="font-semibold h-[18px] text-sm">
              Where to go?
            </label>
            <input
              type="text"
              placeholder="Anywhere"
              value={searchListingParams.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
            />
          </div>

          <div className="h-10 w-px  bg-textDark bg-opacity-10 hidden lg:block "></div>
          <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 space-y-1 w-[97.3px]">
            <label className="font-semibold h-[18px]">
              Check in
            </label>
            <DatePicker
              selected={searchListingParams.checkIn}
              onChange={(date) => handleInputChange('checkIn', date)}
              dateFormat="dd.MM.YYYY"
              placeholderText="MM.DD.YYYY"
              minDate={minDateCheckIn}
              className="outline-none rounded-md  py-1  text-[1rem] tracking-[-0.16px] font-inter w-[101px]"
            />
          </div>

          <div className="h-10 w-px mx-4 bg-textDark bg-opacity-10 hidden lg:block "></div>
          <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 space-y-1 w-[97.3px]">
            <label className="font-semibold h-[18px]">
              Check out
            </label>
            <DatePicker
              selected={searchListingParams.checkOut}
              onChange={(date) => handleInputChange('checkOut', date)}
              dateFormat="dd.MM.YYYY"
              placeholderText="MM.DD.YYYY"
              minDate={minDateCheckOut}
              className="outline-none rounded-md  py-1  text-[1rem] tracking-[-0.16px] font-inter w-[101px]"
            />
          </div>

          <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
            <label className="font-semibold h-[18px]">
              Guests
            </label>
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
              className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
            />
          </div>
        </div>

        <button
          onClick={(e) => handleSearch(e)}
          className="flex md:hidden text-white bg-buttonPrimary rounded-xl px-8 py-4 h-fit lg:mt-0 lg:w-auto w-full  justify-center items-center">
          {isHomePageSearch ? <LoadingSpinner /> : "Search"}
        </button>
      </form>

      <button
        onClick={(e) => handleSearch(e)}
        className=" hidden md:flex text-white bg-buttonPrimary rounded-xl px-8 py-2 lg:py-4 lg:mt-0 lg:w-auto w-full justify-center items-center h-[43px]">
        {isHomePageSearch ? <LoadingSpinner /> : "Search"}
      </button> */}


{/* <form className="flex flex-col md:flex-row   w-full ">
        <div className="flex items-center overflow-hidden pt-3">
          <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
            <label className="font-semibold h-[18px]">
              Where to go?
            </label>
            <input
              type="text"
              placeholder="Anywhere"
              value={searchListingParams.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
            />
          </div>

          <div className="h-10 w-px  bg-textDark bg-opacity-10 hidden lg:block "></div>
          <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
            <label className="font-semibold h-[18px]">
              Check in
            </label>
            <DatePicker
              selected={searchListingParams.checkIn}
              onChange={(date) => handleInputChange('checkIn', date)}
              dateFormat="dd.MM.YYYY"
              placeholderText="MM.DD.YYYY"
              minDate={minDateCheckIn}
              className="outline-none rounded-md  py-1  text-[1rem] tracking-[-0.16px] font-inter w-[101px]"
            />
          </div>

          <div className="h-10 w-px mx-4 bg-textDark bg-opacity-10 hidden lg:block "></div>
          <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
            <label className="font-semibold h-[18px]">
              Check out
            </label>
            <DatePicker
              selected={searchListingParams.checkOut}
              onChange={(date) => handleInputChange('checkOut', date)}
              dateFormat="dd.MM.YYYY"
              placeholderText="MM.DD.YYYY"
              minDate={minDateCheckOut}
              className="outline-none rounded-md  py-1  text-[1rem] tracking-[-0.16px] font-inter w-[101px]"
            />
          </div>

          <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
            <label className="font-semibold h-[18px]">
              Guests
            </label>
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
              className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
            />
          </div>
        </div>

        <button
          onClick={(e) => handleSearch(e)}
          className="flex md:hidden text-white bg-buttonPrimary rounded-xl px-8 py-4 h-fit lg:mt-0 lg:w-auto w-full  justify-center items-center">
          {isHomePageSearch ? <LoadingSpinner /> : "Search"}
        </button>
      </form>

      <button
        onClick={(e) => handleSearch(e)}
        className=" hidden md:flex text-white bg-buttonPrimary rounded-xl px-8 py-2 lg:py-4 lg:mt-0 lg:w-auto w-full justify-center items-center h-[43px]">
        {isHomePageSearch ? <LoadingSpinner /> : "Search"}
      </button> */}




{/* <button
  onClick={(e) => handleSearch(e)}
  className=" hidden md:flex text-white bg-buttonPrimary rounded-xl px-8 py-2 lg:py-4 lg:mt-0 lg:w-auto w-full justify-center items-center h-[43px]">
  {isHomePageSearch ? <LoadingSpinner /> : "Search"}
</button> */}

{/* <form className="flex flex-col md:flex-row  lg:gap-4 w-full ">
        <div className="flex items-center overflow-hidden pt-3">
          <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
            <label className="font-semibold h-[18px]">
              Where to go?
            </label>
            <input
              type="text"
              placeholder="Anywhere"
              value={searchListingParams.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
            />
          </div>

          <div className="h-10 w-px mx-4 bg-textDark bg-opacity-10 hidden lg:block "></div>
          <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
            <label className="font-semibold h-[18px]">
              Check in
            </label>
            <DatePicker
              selected={searchListingParams.checkIn}
              onChange={(date) => handleInputChange('checkIn', date)}
              dateFormat="dd.MM.YYYY"
              placeholderText="MM.DD.YYYY"
              minDate={minDateCheckIn}
              className="outline-none rounded-md  py-1  text-[1rem] tracking-[-0.16px] font-inter w-[101px]"
            />
          </div>

          <div className="h-10 w-px mx-4 bg-textDark bg-opacity-10 hidden lg:block "></div>
          <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px]">
            <label className="font-semibold h-[18px]">
              Check out
            </label>
            <DatePicker
              selected={searchListingParams.checkOut}
              onChange={(date) => handleInputChange('checkOut', date)}
              dateFormat="dd.MM.YYYY"
              placeholderText="MM.DD.YYYY"
              minDate={minDateCheckOut}
              className="outline-none rounded-md  py-1  text-[1rem] tracking-[-0.16px] font-inter w-[101px]"
            />
          </div>
        </div>


        <div className="flex flex-col lg:mb-0 text-sm text-start h-[69px] mx-7 my-3 space-y-1 w-[97.3px] pt-3">
          <label className="font-semibold h-[18px]">
            Guests
          </label>
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
            className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
          />
        </div>
        <button
          onClick={(e) => handleSearch(e)}
          className="flex md:hidden text-white bg-buttonPrimary rounded-xl px-8 py-4 h-fit lg:mt-0 lg:w-auto w-full  justify-center items-center mr-4">
          {isHomePageSearch ? <LoadingSpinner /> : "Search"}
        </button>
      </form> */}

{/* <div className="h-10 w-px mx-4 bg-textDark bg-opacity-10 hidden lg:block my-4"></div>
        <div className="grid grid-cols-2 sm:flex sm:flex-row">
          <div className="flex flex-col lg:mb-0 lg:max-w-[153px] text-sm text-start h-[69px] px-7 py-3 space-y-1  w-[97.3px]">
            <label className="font-semibold h-[18px]">
              Check Out
            </label>
            <DatePicker
              selected={searchListingParams.checkOut}
              onChange={(date) => handleInputChange('checkOut', date)}
              dateFormat="dd.MM.YYYY"
              placeholderText="DD.MM.YYYY"
              minDate={minDateCheckOut}
              className="outline-none rounded-md  py-1  text-[1rem] tracking-[-0.16px] font-inter w-[101px] "
            />
          </div>
          <div className="flex flex-col lg:mb-0 lg:max-w-[153px] text-sm text-start h-[69px] px-7 py-3 space-y-1">
            <label className="block font-semibold h-[18px]">
              Guest
            </label>
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
              className="outline-none rounded-md font-inter py-1 w-full text-[1rem] tracking-[-0.16px font-inter]"
            />
          </div>
        </div> */}