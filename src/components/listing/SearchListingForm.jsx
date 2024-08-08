import { useDispatch, useSelector } from "react-redux";
import { searchListing, setSearchListingParams } from "../../redux/slices/listingSlice";
import DatePicker from "react-datepicker";
import LoadingSpinner from "../ui/LoadingSpinner";
import { notifyToastMessage } from "../ui/CustomToast";



const SearchListingForm = () => {

  const dispatch = useDispatch();
  const { isSearchListing, searchListingParams } = useSelector(state => state.listing)

  const minDateCheckIn = new Date(Date.now());

  const minDateCheckOut = searchListingParams.checkIn !== "" ? new Date(searchListingParams.checkIn).setDate(searchListingParams.checkIn.getDate() + 1) : new Date(minDateCheckIn).setDate(minDateCheckIn.getDate() + 1);

  const handleInputChange = (name, value) => {
    dispatch(setSearchListingParams({ name, value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if ((searchListingParams.checkIn && !searchListingParams.checkOut) || (searchListingParams.checkOut && !searchListingParams.checkIn)) {
      return notifyToastMessage("Provide check-in and check-out date.");
    }
    dispatch(searchListing());
  }

  return (
    <div className="flex flex-col font-onest lg:flex-row lg:justify-between items-center bg-white min-h-[73px] rounded-2xl -mb-[20%] sm:-mb-[5rem] md:-mb-[3rem] lg:-mb-[2rem] shadow-lg max-w-[832px] mx-auto px-4 py-2 md:py-3">
      <form className="flex flex-col md:flex-row lg:items-center lg:gap-4 w-full">
        <div className="flex items-center">
          <div className="flex flex-col mb-4 lg:mb-0 lg:max-w-[153px] text-sm text-start pl-7">
            <label className="font-semibold">
              Where to go?
            </label>
            <input
              type="text"
              placeholder="Anywhere"
              value={searchListingParams.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="outline-none rounded-md py-1 w-full"
            />
          </div>
          <div className="h-10 w-px bg-textDark bg-opacity-10 hidden lg:block my-4"></div>
          <div className="flex flex-col mb-4 lg:mb-0 lg:max-w-[153px] text-sm text-start pl-7">
            <label className="font-semibold">
              Check in
            </label>
            <DatePicker
              selected={searchListingParams.checkIn}
              onChange={(date) => handleInputChange('checkIn', date)}
              className="outline-none rounded-md py-1 w-full box-border overflow-hidden"
              dateFormat="dd.MM.YYYY"
              placeholderText="MM.DD.YYYY"
              minDate={minDateCheckIn}
            />
          </div>
        </div>

        <div className="h-10 w-px bg-textDark bg-opacity-10 hidden lg:block  my-4"></div>
        <div className="grid grid-cols-2 sm:flex sm:flex-row">
          <div className="flex flex-col mb-4 lg:mb-0 lg:max-w-[153px] text-sm text-start pl-7">
            <label className="font-semibold">
              Check Out
            </label>
            <DatePicker
              selected={searchListingParams.checkOut}
              onChange={(date) => handleInputChange('checkOut', date)}
              className="outline-none rounded-md py-1 w-full box-border overflow-hidden"
              dateFormat="dd.MM.YYYY"
              placeholderText="DD.MM.YYYY"
              minDate={minDateCheckOut}
            />
          </div>
          <div className="flex flex-col mb-4 lg:mb-0 lg:max-w-[153px] text-sm text-start pl-7">
            <label className="block font-semibold">
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
              className="outline-none rounded-md py-1 w-full box-border overflow-hidden"
            />
          </div>
        </div>
        <button
          onClick={(e) => handleSearch(e)}
          className="flex md:hidden text-white bg-buttonPrimary rounded-xl px-8 py-2 h-fit lg:mt-0 lg:w-auto w-full  justify-center items-center">
          Search
        </button>
      </form>

      <button
        onClick={(e) => handleSearch(e)}
        className=" hidden md:flex text-white bg-buttonPrimary rounded-xl px-8 py-2 lg:py-4 h-fit  lg:mt-0 lg:w-auto w-full justify-center items-center">
        {isSearchListing ? <LoadingSpinner /> : "Search"}
      </button>
    </div>
  );
};

export default SearchListingForm;