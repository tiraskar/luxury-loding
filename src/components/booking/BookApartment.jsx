import { useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { clearBookingDateSelection, setCheckBookingParams, setIsBooking, toggleBookingNotAvailableAlertDialog } from "../../redux/slices/bookingSlice"; import AlertDialog from "../ui/AlertDialog";
import { formateDate } from "../../helper/date";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { IoClose } from "react-icons/io5";
import BookApartmentMap from "./BookApartmentMap";
import GuestSelector from "../common/GuestSelector";
import CustomCalendar from "./CustomCalender";
import dayjs from "dayjs";

const BookApartment = ({ listingInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //eslint-disable-next-line
  const [isGuestChanged, setIsGuestChanged] = useState(false);
  const [openGuestDropdown, setOpenDropDown] = useState(false);
  //eslint-disable-next-line
  const { checkBookingParams, bookingNotAvailableAlertDialog } = useSelector(state => state.booking);
  const [dateRange, setDateRange] = useState({
    start: dayjs(checkBookingParams.checkIn),
    end: dayjs(checkBookingParams.checkOut),
  }
  );
  const [rangeStart, setRangeStart] = useState(checkBookingParams.checkIn ? dayjs(checkBookingParams.checkIn) : checkBookingParams.checkIn);
  const [rangeEnd, setRangeEnd] = useState(checkBookingParams.checkOut ? dayjs(checkBookingParams.checkOut) : checkBookingParams.checkOut);
  const [hoveredDate, setHoveredDate] = useState(null);
  const { listingCalender } = useSelector(state => state.listing);

  const handleInputChange = (name, value) => {
    dispatch(setCheckBookingParams({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();
    if (!checkBookingParams.checkIn || !checkBookingParams.checkOut) {
      document.getElementById('bookingCheckIn').focus();
    }
    if ((checkBookingParams.checkIn && !checkBookingParams.checkOut) || (checkBookingParams.checkOut && !checkBookingParams.checkIn)) {
      return toast.info("Provide check-in and check-out date.");
    }
    if (checkBookingParams.checkIn > checkBookingParams.checkOut) return toast.info("Please provide valid date for checkout!!!")

    // if (checkBookingParams.guests == "") return toast.info("Please provide guest count");
    dispatch(setIsBooking(true))
    navigate(`/listing/${listingInfo.id}/booking?${query}`);

  };

  const handleCloseAlert = () => {
    dispatch(toggleBookingNotAvailableAlertDialog());
  };

  const query = new URLSearchParams({
    checkIn: formateDate(checkBookingParams.checkIn),
    checkOut: formateDate(checkBookingParams.checkOut),
    guests: checkBookingParams.guests
  });


  useEffect(() => {
    handleInputChange('guests', listingInfo.personCapacity);
    handleInputChange('listingId', listingInfo.id);
  }, [listingInfo]);



  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const [openCheckIn, setOpenCheckIn] = useState(false);
  //eslint-disable-next-line
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

  const handleRangeSelection = (clickedDate) => {
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      // Start new range
      setDateRange({ start: clickedDate, end: null });
    } else if (!dateRange.end && clickedDate.isAfter(dateRange.start, "day")) {
      // End selected
      const newRange = { ...dateRange, end: clickedDate };
      setDateRange(newRange);
    } else {
      // Reset or invalid range
      setDateRange({ start: clickedDate, end: null });
    }
  };

  const handleUpdateDate = (data) => {
    dispatch(setCheckBookingParams({ name: 'checkIn', value: data.start }));
    dispatch(setCheckBookingParams({ name: 'checkOut', value: data.end }));

  };

  const handleDateClear = () => {
    setRangeStart(null);
    setRangeEnd(null);
    setHoveredDate(null);
    dispatch(clearBookingDateSelection());
  }

  useEffect(() => {
    if (rangeStart && rangeEnd) {
      dispatch(setCheckBookingParams({ name: 'checkIn', value: rangeStart }));
      dispatch(setCheckBookingParams({ name: 'checkOut', value: rangeEnd }));
      setOpenCheckIn(false);
      setOpenCheckOut(false);
    }

  }, [dispatch, rangeEnd, rangeStart])


  return (
    <div className=" font-inter tracking-[-1%]">
      <div className="bg-[#F9F9F9] py-5 px-4 rounded-2xl w-full sm:w-[429px] lg:min-h-[404px]">
        <h1 className="font-onest tracking-normal font-medium text-xl">Book Now</h1>
        <div className="min-w-full h-px bg-[#E0E0E0] my-[22px] px-4"></div>

        {bookingNotAvailableAlertDialog && <AlertDialog
          onSubmit={handleCloseAlert}
          warningMessage='Dates Unavailable for Booking'
          message={`The dates you've selected, from ${formateDate(checkBookingParams.checkIn)} to ${formateDate(checkBookingParams.checkOut)}, are not available for booking at this time. 
          We invite you to choose alternative dates. Thank you for your understanding.`}
        />}

        <div className="space-y-2">
          {listingInfo &&
            <div>
              <BookApartmentMap listingInfo={listingInfo} />
            </div>
          }
          <div className="grid xs:grid-cols-2 gap-[10px]">
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p className="text-sm">Check in</p>
              </p>
              <div className="font-semibold pl-6">
                <div className="relative max-w-[117px]">
                  <input
                    id="bookingCheckIn"
                    value={`${checkBookingParams.checkIn ? format(checkBookingParams.checkIn, "MM/dd/yyyy") : ""}`}
                    readOnly
                    className="outline-none max-w-[117px]  text-[1rem]"
                    onClick={() => setOpenCheckIn(openCheckIn => !openCheckIn)}
                    placeholder="MM/DD/YYYY"
                  />
                  {checkBookingParams.checkIn && (
                    <IoClose
                      onClick={() => handleDateClear()}
                      className="absolute  size-3  right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
                    />
                  )}
                </div>

                <div className="">
                  <div ref={checkInRef}>
                    {openCheckIn &&
                      <CustomCalendar
                        calendarId='bookApartmentCalender'
                        listingCalendar={listingCalender}
                        onSelectRange={handleRangeSelection}
                        updateDate={handleUpdateDate}
                        selectedRange={dateRange}
                        showFooter={true}
                        clearDates={handleDateClear}
                        rangeStart={rangeStart}
                        setRangeStart={setRangeStart}
                        rangeEnd={rangeEnd}
                        setRangeEnd={setRangeEnd}
                        hoveredDate={hoveredDate}
                        setHoveredDate={setHoveredDate}
                        dateClear={handleDateClear}
                      />
                    }
                  </div>

                </div>

              </div>
            </div>
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px]">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p className="text-sm">Check out</p>
              </p>
              <div className="font-semibold pl-6 ">
                <div className="relative max-w-[117px]">
                  <input
                    value={`${checkBookingParams.checkOut ? format(checkBookingParams.checkOut, "MM/dd/yyyy") : ""}`}
                    readOnly
                    className="outline-none max-w-[117px]  text-[1rem]"
                    onClick={() => setOpenCheckIn(openCheckIn => !openCheckIn)}
                    placeholder="MM/DD/YYYY" />
                  {checkBookingParams.checkOut && (
                    <IoClose
                      onClick={() => handleDateClear()}
                      className="absolute  size-3  right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <GuestSelector
            openGuestDropdown={openGuestDropdown}
            setOpenDropDown={setOpenDropDown}
            setIsGuestChanged={setIsGuestChanged} />
        </div> 

        <div className="min-w-full h-px bg-[#E0E0E0] my-[30px]"></div>

        <div className="grid space-y-2 xxs:space-y-0 xxs:grid-cols-1">
          {/* {isListingBookingAvailable && */}
          <button
            type="button"
            onClick={(e) => {
              if (!checkBookingParams.checkIn || !checkBookingParams.checkOut) {
                return setOpenCheckIn(openCheckIn => !openCheckIn);
              }
              handleSubmit(e);
            }}
            className="flex flex-row items-center justify-center text-white bg-black text-sm  py-[14px] rounded-xl cursor-pointer">
            Book Now
          </button>
        </div>

      </div>
      <div className="flex justify-center text-center py-4">
        <p className="text-[#666666]">Any questions? Call us <a href="tel:(813) 531-8988" className="text-black cursor-pointer">(813) 531-8988</a>
        </p>
      </div>
    </div>
  );
};

BookApartment.propTypes = {
  listingInfo: PropTypes.object.isRequired,
};

export default BookApartment;