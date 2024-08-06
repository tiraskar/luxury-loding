import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchListing } from "../../redux/slices/listingSlice";
import DatePicker from "react-datepicker";
import { formateDate } from "../../helper/date";
import LoadingSpinner from "../ui/LoadingSpinner";



const SearchListingForm = () => {

  const dispatch = useDispatch();
  const { loading, minDate } = useSelector(state => state.listing)

  const [formValues, setFormValues] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '',
  });

  // const [isSearchable, setIsSearchable] = useState(false)

  const handleInputChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(searchListing({
      location: formValues.location,
      checkIn: formateDate(formValues.checkIn),
      checkOut: formateDate(formValues.checkOut),
      guests: parseInt(formValues.guests),
    }));
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
              value={formValues.location}
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
              selected={formValues.checkIn}
              onChange={(date) => handleInputChange('checkIn', date)}
              className="outline-none rounded-md py-1 w-full box-border overflow-hidden"
              dateFormat="dd.MM.YYYY"
              placeholderText="MM.DD.YYYY"
              minDate={minDate}
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
              selected={formValues.checkOut}
              onChange={(date) => handleInputChange('checkOut', date)}
              className="outline-none rounded-md py-1 w-full box-border overflow-hidden"
              dateFormat="dd.MM.YYYY"
              placeholderText="DD.MM.YYYY"
              minDate={minDate}
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
              value={formValues.guests}
              onChange={(e) => handleInputChange('guests', e.target.value)}
              placeholder="Any"
              className="outline-none rounded-md py-1 w-full box-border overflow-hidden"
            />
          </div>
        </div>
        <button
          onClick={(e) => handleSearch(e)}
          className="block md:hidden text-white bg-buttonPrimary rounded-xl px-8 py-2 h-fit lg:mt-0 lg:w-auto w-full">
          Search
        </button>
      </form>

      <button
        onClick={(e) => handleSearch(e)}
        className=" hidden md:block text-white bg-buttonPrimary rounded-xl px-8 py-2 lg:py-4 h-fit  lg:mt-0 lg:w-auto w-full">
        {loading ? <LoadingSpinner /> : "Search"}
      </button>
    </div>
  );
};

export default SearchListingForm;