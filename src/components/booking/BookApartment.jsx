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
import { toast } from "react-toastify";

const BookApartment = ({ listingInfo }) => {

  const dispatch = useDispatch();

  // const [isBookingAvailable, setIsBookingAvailable] = useState(false)

  const { checkBookingParams, isListingBookingAvailable, loading, bookingNotAvailableAlertDialog } = useSelector(state => state.booking);

  const handleInputChange = (name, value) => {
    dispatch(setCheckBookingParams({ name, value }));
  };

  const minDateCheckIn = new Date();


  const minDateCheckOut = checkBookingParams.checkIn !== "" ? new Date(checkBookingParams.checkIn).setDate(checkBookingParams.checkIn.getDate() + 1) : new Date(minDateCheckIn).setDate(minDateCheckIn.getDate() + 1);



  useEffect(() => {
    handleInputChange('guests', listingInfo.guestsIncluded);
    handleInputChange('listingId', listingInfo.id);
    handleInputChange('checkIn', minDateCheckIn);
  }, [listingInfo]);

  const handleSubmit = () => {

    toast.dismiss();
    // const checkInAvailability = isDateAvailable(checkBookingParams.checkIn);
    // const checkOutAvailability = isDateAvailable(checkBookingParams.checkOut);

    // if (!checkInAvailability || !checkOutAvailability) {
    //   setIsBookingAvailable(true);
    //   toast.info("Please provide available date!!!");
    // } else {
    //   setIsBookingAvailable(true);
    // }

    if ((checkBookingParams.checkIn && !checkBookingParams.checkOut) || (checkBookingParams.checkOut && !checkBookingParams.checkIn)) {
      return toast.info("Provide check-in and check-out date.");
    }
    if (checkBookingParams.checkIn > checkBookingParams.checkOut) return toast.info("Please provide valid date for checkout!!!")
    dispatch(checkListingBookingAvailability());
  };

  const handleCloseAlert = () => {
    dispatch(toggleBookingNotAvailableAlertDialog());
  };

  const query = new URLSearchParams({
    checkIn: formateDate(checkBookingParams.checkIn),
    checkOut: formateDate(checkBookingParams.checkOut),
    guests: checkBookingParams.guests
  });


  const { listingAvailableCalender } = useSelector(state => state.listing);

  const isDateAvailable = (date) => {
    const formattedDate = formateDate(date);
    const availability = listingAvailableCalender?.find(
      (item) => item.date === formattedDate
    );
    return availability?.isAvailable == 0 ? 0 : 1;
  };


  return (
    <div className="font-inter tracking-[-1%]">
      <div className="bg-[#F9F9F9] py-5 px-4 rounded-2xl xxs:w-[345px] xs:w-[429px] lg:min-h-[404px]">
        <h1 className="font-onest tracking-normal font-medium text-xl">Book {listingInfo.propertyType}</h1>
        <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

        {bookingNotAvailableAlertDialog && <AlertDialog
          onSubmit={handleCloseAlert}
          warningMessage='Dates Unavailable for Booking'
          message={`The dates you've selected, from ${formateDate(checkBookingParams.checkIn)} to ${formateDate(checkBookingParams.checkOut)}, are not available for booking at this time. 
          We invite you to choose alternative dates. Thank you for your understanding.`}
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
                  minDate={minDateCheckIn}
                  disabled={loading}
                  placeholderText="DD.MM.YYYY"
                  filterDate={isDateAvailable}
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
                  minDate={minDateCheckOut}
                  disabled={loading}
                  placeholderText="DD.MM.YYYY"
                  filterDate={isDateAvailable}
                />
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
            <div className="flex text-[#8A8A8A] space-x-2 items-center">
              <LuUser2 size={18} className="mr-1" />Guests
            </div>
            <div className={`flex  space-x-2 font-semibold ${checkBookingParams.guests >= 10 ? "pl-4" : "pl-0"} `}>
              <input
                id="guest-booking"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                max={50}
                min={0}
                step={1}
                value={checkBookingParams.guests}
                disabled={loading}
                onChange={(e) => {
                  if (e.target.value > 50) {
                    handleInputChange('guests', 50);
                  } else {
                    handleInputChange('guests', e.target.value);
                  }
                }}

                placeholder=""
                autoFocus
                className="bg-white outline-none min-w-[20px] max-w-[20px] text-right"
              />

              {/* {listingInfo.guestsIncluded >= 1 ? listingInfo.guestsIncluded : 0} */}
              <p
                onClick={() => {
                  document.getElementById('guest-booking').focus();
                }}
                className="cursor-text select-none"
              >
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
            onClick={() => localStorage.setItem('listingId', listingInfo.id)}
            className="flex flex-row items-center justify-center text-white bg-buttonPrimary text-sm  py-[14px] rounded-xl">
            Continue Booking
          </Link>
          }
          {!isListingBookingAvailable &&
            <button
              onClick={() => handleSubmit()}
              disabled={loading}
              className={`flex flex-row items-center justify-center text-white bg-textDark text-sm  py-[14px] rounded-xl`}>
              {!isListingBookingAvailable && !loading ? "Check availability" : `Checking`} &nbsp;&nbsp;
              {loading && <LoadingSpinner />}
            </button>
          }
        </div>

      </div>
      <div className="flex justify-center text-center py-4">
        <p className="text-[#666666]">Any question? Call us <a href="tel:+8776408777" className="text-black cursor-pointer">(877) 640-8777</a>
        </p>
      </div>
    </div>
  );
};

BookApartment.propTypes = {
  listingInfo: PropTypes.object.isRequired,
};

export default BookApartment;