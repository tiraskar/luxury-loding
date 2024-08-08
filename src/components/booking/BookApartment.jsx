import { useEffect } from "react";
import { CiCalendar } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { checkListingBookingAvailability, setCheckBookingParams, toggleBookingNotAvailableAlertDialog } from "../../redux/slices/bookingSlice";
import LoadingSpinner from "../ui/LoadingSpinner";
import AlertDialog from "../ui/AlertDialog";
import { formateDate } from "../../helper/date";
import { Link } from "react-router-dom";

const BookApartment = ({ listingInfo }) => {

  const dispatch = useDispatch();

  const { checkBookingParams, isListingBookingAvailable, loading, bookingNotAvailableAlertDialog } = useSelector(state => state.booking)

  const handleInputChange = (name, value) => {
    dispatch(setCheckBookingParams({ name, value }));
  };

  const minDate = new Date();

  useEffect(() => {
    handleInputChange('guests', listingInfo.guestsIncluded);
    handleInputChange('listingId', listingInfo.id);
    handleInputChange('checkIn', minDate);
    handleInputChange('checkOut', minDate);
  }, [listingInfo]);

  const handleSubmit = () => {
    dispatch(checkListingBookingAvailability());
  };

  const handleCloseAlert = () => {
    dispatch(toggleBookingNotAvailableAlertDialog());
  };

  const query = new URLSearchParams({
    checkIn: formateDate(checkBookingParams.checkIn),
    checkOut: formateDate(checkBookingParams.checkOut),
    guests: checkBookingParams.guests
  })

  return (
    <div className="font-inter tracking-[-1%]">
      <div className="bg-[#F9F9F9] py-5 px-4 rounded-2xl xxs:w-[345px] xs:w-[429px] lg:min-h-[404px]">
        <h1 className="font-onest tracking-normal font-medium text-xl">Book {listingInfo.propertyType}</h1>
        <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

        {bookingNotAvailableAlertDialog && <AlertDialog
          onSubmit={handleCloseAlert}
          warningMessage='Date not available for booking'
          message={`Booking not available between check in : ${formateDate(checkBookingParams.checkIn)} and ${formateDate(checkBookingParams.checkOut)} checkout. Check for other dates. Thank you`}
        />}

        <div className="space-y-2">
          <div className="grid xs:grid-cols-2 gap-[10px]">
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p className="text-sm">Check in</p>
              </p>
              <div className="font-semibold pl-6">
                <DatePicker
                  selected={checkBookingParams.checkIn}
                  onChange={(date) => handleInputChange('checkIn', date)}
                  className="outline-none max-w-[117px]  text-[1rem]"
                  dateFormat="dd.MM.YYYY"
                  minDate={minDate}
                  placeholderText="DD.MM.YYYY"
                />
              </div>
            </div>
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px]">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p className="text-sm">Check out</p>
              </p>
              <div className="font-semibold pl-6">
                <DatePicker
                  selected={checkBookingParams.checkOut}
                  onChange={(date) => handleInputChange('checkOut', date)}
                  className="outline-none max-w-[117px] text-[1rem]"
                  dateFormat="dd.MM.YYYY"
                  minDate={checkBookingParams.checkIn ? checkBookingParams.checkIn : minDate}
                  placeholderText="DD.MM.YYYY"
                />
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
            <div className="flex text-[#8A8A8A] space-x-2 items-center">
              <LuUser2 size={18} className="mr-1" />Guests
            </div>
            <div className={`flex  space-x-1 font-semibold ${checkBookingParams.guests >= 10 ? "pl-6" : "pl-4"} `}>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                max={50}
                min={0}
                step={1}
                value={checkBookingParams.guests}
                onChange={(e) => {
                  if (e.target.value > listingInfo.guestsIncluded) {
                    handleInputChange('guests', listingInfo.guestsIncluded);
                  } else {
                    handleInputChange('guests', e.target.value);
                  }
                }}

                placeholder=""
                autoFocus
                className="bg-white outline-none min-w-[10px] max-w-[20px] text-right"
              />

              {/* {listingInfo.guestsIncluded >= 1 ? listingInfo.guestsIncluded : 0} */}
              <p>
                {checkBookingParams.guests > 1 ? "guests" : "guest"}
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-full h-px bg-[#E0E0E0] my-[30px]"></div>

        <div className="grid space-y-2 xxs:space-y-0 xxs:grid-cols-2">
          <div className="flex items-center">
            <p className="text-[#333333] font-bold text-2xl">${listingInfo.price}</p>
            <p className="text-[#8E8E80] text-sm ">&nbsp;/ per night</p>
          </div>

          {isListingBookingAvailable && <Link
            to={`/listing/${listingInfo.id}/booking?${query}`}
            type="button"
            className="flex flex-row items-center justify-center text-white bg-buttonPrimary text-sm  py-[14px] rounded-xl">
            Continue Booking
          </Link>
          }
          {!isListingBookingAvailable &&
            <button
              onClick={() => handleSubmit()}

              className={`flex flex-row items-center justify-center text-white bg-textDark text-sm  py-[14px] rounded-xl`}>
              {!isListingBookingAvailable && !loading ? "Check availability" : `Checking`} &nbsp;&nbsp;
              {loading && <LoadingSpinner />}
            </button>
          }
        </div>

      </div>
      <div className="flex justify-center text-center py-4">
        <p className="text-[#666666]">Any question? Call us <span className="text-black">(877) 640-8777</span></p>
      </div>
    </div>
  );
};

BookApartment.propTypes = {
  listingInfo: PropTypes.object.isRequired,
}

export default BookApartment;