import { useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
//eslint-disable-next-line
import { checkListingBookingAvailability, clearBookingDateSelection, setCheckBookingParams, toggleBookingNotAvailableAlertDialog } from "../../redux/slices/bookingSlice";
//eslint-disable-next-line
import LoadingSpinner from "../ui/LoadingSpinner";
import AlertDialog from "../ui/AlertDialog";
import { formateDate } from "../../helper/date";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addDays, format } from "date-fns";
import { DateRange } from "react-date-range";
import { toggleDateRangedPickedForBooking } from "../../redux/slices/bookingSlice";
import { IoClose } from "react-icons/io5";
import BookApartmentMap from "./BookApartmentMap";

const BookApartment = ({ listingInfo }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //eslint-disable-next-line
  const { checkBookingParams, isListingBookingAvailable, loading, bookingNotAvailableAlertDialog, isDateRangedPickedFromAvailability } = useSelector(state => state.booking);

  const { listingAvailableCalender } = useSelector(state => state.listing);

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

    if (checkBookingParams.guests == "") return toast.info("Please provide guest count");

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


  const getUnavailableDates = () => {
    return listingAvailableCalender
      .filter(item => item.isAvailable === 0)
      .map(item => new Date(item.date));
  };


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
      dispatch(setCheckBookingParams({ name: 'checkIn', value: range[0].startDate }));
      dispatch(setCheckBookingParams({ name: 'checkOut', value: range[0].endDate }));
    }
    if (openCheckOut && range[0].endDate) {
      dispatch(setCheckBookingParams({ name: 'checkOut', value: range[0].endDate }));
      dispatch(setCheckBookingParams({ name: 'checkIn', value: range[0].startDate }));
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

  useEffect(() => {
    if (isDateRangedPickedFromAvailability) {
      setRange([
        {
          startDate: checkBookingParams.checkIn ? new Date(checkBookingParams.checkIn) : new Date(),
          endDate: checkBookingParams.checkOut ? new Date(checkBookingParams.checkOut) : new Date(),
          key: 'selection',
        },
      ]);
    }
  }, [isDateRangedPickedFromAvailability, checkBookingParams.checkIn, checkBookingParams.checkOut]);

  const handleClear = () => {
    dispatch(clearBookingDateSelection());
    setRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]);
  }


  return (
    <div className="font-inter tracking-[-1%]">
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
                      onClick={() => handleClear()}
                      className="absolute  size-3  right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
                    />
                  )}
                </div>
                <div className="calendarWrap ml-24 xxs:ml-32 lg:ml-0">
                  <div ref={checkInRef}>
                    {openCheckIn &&
                      <DateRange
                        showClearButton={true}
                        onChange={item => {
                          dispatch(toggleDateRangedPickedForBooking('bookingDatePick'));
                          setRange([item.selection]);
                        }}
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
                      disabledDates={getUnavailableDates()}
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
                      onClick={() => handleClear()}
                      className="absolute  size-3  right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
                    />
                  )}
                </div>
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

        <div className="grid space-y-2 xxs:space-y-0 xxs:grid-cols-1">
          {/* {isListingBookingAvailable && */}
          <button
            type="button"
            onClick={(e) => {
              if (!checkBookingParams.checkIn || !checkBookingParams.checkOut) {
                return setOpenCheckIn(openCheckIn => !openCheckIn);
              }
              handleSubmit(e);
              // localStorage.setItem('listingId', listingInfo.id);
            }}
            className="flex flex-row items-center justify-center text-white bg-black text-sm  py-[14px] rounded-xl">
            Book Now
          </button>
          {/* } */}
          {/* {!isListingBookingAvailable &&
            <button
              onClick={() => {
                if (!checkBookingParams.checkIn || !checkBookingParams.checkOut) {
                  return setOpenCheckIn(openCheckIn => !openCheckIn);
                }
                handleSubmit();
              }}
              disabled={loading}
              className={`flex flex-row items-center justify-center text-white bg-textDark text-sm  py-[14px] rounded-xl`}>
              {!isListingBookingAvailable && !loading ? "Check availability" : `Checking`} &nbsp;&nbsp;
              {loading && <LoadingSpinner />}
            </button>
          } */}
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