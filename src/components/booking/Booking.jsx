import { LuBath, LuUser2, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import TokenDiscount from "./TokenDiscount";
import { formateDate } from "../../helper/date";
import { formattedPrice } from "../../helper/formatter";
import { calculateBookingPrice, setCheckBookingParams, toggleDateRangedPickedForBooking } from "../../redux/slices/bookingSlice";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import { updatePaymentIntent } from "../../redux/slices/paymentSlice";
import { toLocalDate } from "../../utils/dateUtils";
const Booking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { listingInfo } = useSelector(state => state.listing);
  const { bookingPrice,
    loading,
    totalDiscountPrice, isValidToken } = useSelector(state => state.booking);

  const images = listingInfo?.images || [];
  const { checkBookingParams } = useSelector(state => state.booking);
  const { listingUnavailableCalender, listingCheckOutAvailableDate } = useSelector(state => state.listing);

  const [isDateRangedChange, setIsDateRangeChanged] = useState(false);

  const guestNumber = localStorage?.getItem('guests');
  const bookingCheckIn = localStorage?.getItem('checkIn');
  const bookingCheckOut = localStorage?.getItem('checkOut');

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection'
    }
  ]);

  const checkOutRef = useRef(null);
  const checkInRef = useRef(null);
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);



  useEffect(() => {
    if (openCheckIn && range[0].startDate) {
      dispatch(setCheckBookingParams({ name: 'checkIn', value: range[0].startDate }));
      dispatch(setCheckBookingParams({ name: 'checkOut', value: range[0].endDate }));
    }
  }, [range[0].startDate, range[0].endDate]);

  const [direction, setDirection] = useState('horizontal');

  useEffect(() => {
    if (checkBookingParams.checkIn && checkBookingParams.checkOut) {
      setRange([
        {
          startDate: checkBookingParams.checkIn ? new Date(checkBookingParams.checkIn) : new Date(),
          endDate: checkBookingParams.checkOut ? new Date(checkBookingParams.checkOut) : new Date(),
          key: 'selection',
        },
      ]);
    }
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


  const hideOnClickOutside = (e) => {
    const isCheckInCalendar = checkInRef.current?.contains(e.target);
    const isCheckOutCalendar = checkOutRef.current?.contains(e.target);
    const isCheckInInput = e.target.id === 'bookingCheckIn';
    const isCheckOutInput = e.target.id === 'bookingCheckOut';

    if (!isCheckInCalendar && !isCheckOutCalendar && !isCheckInInput && !isCheckOutInput) {
      setOpenCheckIn(false);
      setOpenCheckOut(false);
    }
  };

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpenCheckIn(false);
      setOpenCheckOut(false);
    }
  };

  const checkDateChange = (item) => {
    if (item) {
      setIsDateRangeChanged(true);
    }
  };


  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    return () => {
      document.removeEventListener("keydown", hideOnEscape, true);
      document.removeEventListener("click", hideOnClickOutside, true);
    };
  }, []);

  const updateBooking = () => {
    dispatch(calculateBookingPrice({
      listingId: Number(id),
      checkIn: formateDate(new Date(range[0].startDate)),
      checkOut: formateDate(new Date(range[0].endDate)),
      guests: Number(guestNumber),
    })).unwrap().then(response => {
      if (response) {
        dispatch(updatePaymentIntent({
          id: id,
          amount: Number(response.totalPrice),
          guests: Number(checkBookingParams.guests),
          checkIn: formateDate(new Date(range[0].startDate)),
          checkOut: formateDate(new Date(range[0].endDate)),
        }));
      }
    });
    setIsDateRangeChanged(false);
  }

  useEffect(() => {
    if (isDateRangedChange && !openCheckIn && !openCheckOut) {
      // dispatch(setIsBookingDetailsChange());
      updateBooking()
    }

  }, [isDateRangedChange, openCheckIn, openCheckOut]);


  const handleInputChange = (name, value) => {
    setGuestInput(value);
    dispatch(setCheckBookingParams({ name, value }));
  };

  const handleGuestChange = (e) => {
    let value = Number(e.target.value);
    if (value > 50) value = 50;
    if (value < 0) value = 0;
    setGuestInput(value); // Update state immediately but debounce API update
  };

  const [guestInput, setGuestInput] = useState(checkBookingParams.guests);

  useEffect(() => {
    const handler = setTimeout(() => {
      handleInputChange("guests", guestInput);
      updateBooking()
    }, 1500);

    return () => clearTimeout(handler);
  }, [guestInput]);



  return (
    <div className=" space-y-6 md:space-y-8 px-1 xs:px-2 sm:px-0 pt-5">
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
        <div className="xl:max-h-[145px] sm:max-w-[350px] lg:max-w-full xl:max-w-[207px]">
          <img src={images[0]?.url} alt="" className="w-full h-full object-cover rounded-xl" />
        </div>
        <div className="flex flex-col space-y-5 lg:h-[145px]">

          <h1 className="text-[1rem] font-inter tracking-[-1%] font-semibold leading-[22px] line-clamp-2 sm:line-clamp-none">
            {listingInfo.name}
          </h1>

          <div className="flex flex-col space-y-3">
            <div className="flex gap-x-3 text-[#8E8E80] items-center font-inter h-[15px] ">
              <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                <LuUsers size={14} /> {listingInfo.personCapacity} {listingInfo.personCapacity > 1 ? 'guests' : 'guest'}
              </div>

              <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                <TbBed size={14} /> {listingInfo.bedroomsNumber} {listingInfo.bedroomsNumber > 1 ? 'bedrooms' : 'bedroom'}

              </div>
              <div className="flex gap-1 items-center rounded-2xl text-[13px]">
                <LuBath size={14} /> {listingInfo.bathroomsNumber} {listingInfo.bathroomsNumber > 1 ? 'baths' : 'bath'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-full h-px bg-[#E0E0E0] my-6 px-4 "></div>
      <div className="max-w-[396px] flex flex-col justify-center ">
        <h1 className="font-onest tracking-normal font-medium text-xl pb-6">Book {listingInfo.propertyType}</h1>
        <div className="space-y-2 ">

          <div className="grid grid-cols-2 gap-[10px]">
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p>Check in</p>
              </p>
              <div
                className="font-semibold pl-6 ">
                <div
                  className="relative max-w-[117px] ">
                  <input
                    id="bookingCheckIn"
                    value={`${checkBookingParams.checkIn ? format(checkBookingParams.checkIn, "MM/dd/yyyy") : ""}`}
                    readOnly
                    onClickCapture={() => {
                      setOpenCheckIn(openCheckIn => !openCheckIn);
                      setOpenCheckOut(false);
                    }}
                    className="cursor-pointer outline-none max-w-[117px]  text-[1rem]"
                    placeholder="MM/DD/YYYY"
                  />
                </div>
                <div className="z-auto">
                  {openCheckIn &&
                    <div
                      ref={checkInRef}
                      className="calendarWrap ml-24 xxs:ml-32 lg:ml-0">
                      <DateRange
                        showClearButton={true}
                        onChange={(item) => {
                          dispatch(toggleDateRangedPickedForBooking('bookingDatePick'));
                          setRange([item.selection]);
                          checkDateChange([item.selection]);
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
                        disabledDates={listingUnavailableCalender.map(toLocalDate)}
                        dayContentRenderer={(date) => {
                          const isCheckOutAvailable = listingCheckOutAvailableDate.map(toLocalDate).some(d =>
                            new Date(d).toDateString() === date.toDateString()
                          );
                          return (
                            <span
                              style={{
                                opacity: isCheckOutAvailable ? 0.5 : 1,
                                padding: "5px",
                                position: "absolute",
                                cursor: isCheckOutAvailable ? "pointer" : "default",
                              }}
                              className={isCheckOutAvailable ? "checkout-tooltip z-50 " : ""}
                            >
                              {date.getDate()}
                              {isCheckOutAvailable && (
                                <span className="tooltip-text overflow-visible z-50">Check-in Unavailable</span>
                              )}
                            </span>

                          );
                        }}
                      />
                    </div>
                  }
                  {openCheckOut &&
                    <div
                      ref={checkOutRef}
                      className="calendarWrap ml-24 xxs:ml-32 lg:ml-0">
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
                        disabledDates={listingUnavailableCalender.map(toLocalDate)}
                        dayContentRenderer={(date) => {
                          const isCheckOutAvailable = listingCheckOutAvailableDate.map(toLocalDate).some(d =>
                            new Date(d).toDateString() === date.toDateString()
                          );
                          return (
                            <span
                              style={{
                                opacity: isCheckOutAvailable ? 0.5 : 1,
                                padding: "5px",
                                position: "absolute",
                                cursor: isCheckOutAvailable ? "pointer" : "default",
                              }}
                              className={isCheckOutAvailable ? "checkout-tooltip z-50 " : ""}
                            >
                              {date.getDate()}
                              {isCheckOutAvailable && (
                                <span className="tooltip-text overflow-visible z-50">Check-in Unavailable</span>
                              )}
                            </span>

                          );
                        }}
                      />
                    </div>

                  }
                </div>

              </div>
            </div>
            <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px]">
              <p className="flex text-[#8A8A8A] space-x-2 items-center">
                <CiCalendar size={18} /> <p>Check out</p>
              </p>
              <div className="font-semibold pl-6 ">
                <div className="relative max-w-[117px]">
                  <input
                    id="bookingCheckOut"
                    value={`${checkBookingParams.checkOut ? format(checkBookingParams.checkOut, "MM/dd/yyyy") : ""}`}
                    readOnly
                    className="cursor-pointer  outline-none max-w-[117px]  text-[1rem]"
                    onClick={() => {
                      setOpenCheckOut(openCheckOut => !openCheckOut);
                      setOpenCheckIn(false);
                    }}
                    placeholder="MM/DD/YYYY" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col rounded-2xl place-items-baseline px-3.5 py-5 space-y-[6px] ">
            <p className="flex text-[#8A8A8A] space-x-2 items-center">
              <LuUser2 size={18} /> <p>Guests</p>
            </p>
            <div className={`flex  space-x-2 font-semibold ${checkBookingParams.guests >= 10 ? "pl-4" : "pl-0"} `}>
              <input
                id="guest-booking"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                max={50}
                min={0}
                step={1}
                value={guestInput}
                disabled={loading}
                onChange={handleGuestChange}
                //   (e) => {
                //   if (e.target.value > 50) {
                //     handleInputChange('guests', 50);
                //   } else {
                //     handleInputChange('guests', e.target.value);
                //   }
                // }
                placeholder=""
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
            {/* <p className="font-semibold pl-6">{guestNumber}&nbsp;{guestNumber > 1 ? "Guests" : "Guest"}</p> */}
          </div>

        </div>
        <div className="flex flex-col space-y-4 md:space-y-6 my-10">
          {bookingPrice?.components?.price?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${total}</p>
              </div>
            );
          })}
          {bookingPrice?.components?.fee?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${total}</p>
              </div>
            );
          })
          }
          {bookingPrice?.components?.tax?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${formattedPrice(total)}</p>
              </div>
            );
          })
          }
          {bookingPrice?.components?.map(({ title, total }, index) => {
            return (
              <div key={index} className="flex items-center">
                <p className="pr-4">{title}</p>
                <div className="flex-grow flex space-x-2 items-center">
                  <div className="border-t border-dashed border-[#D3D3D3] flex-grow opacity-60" />
                </div>
                <p className="pl-4">${formattedPrice(total)}</p>
              </div>
            );
          })
          }
        </div>

        {isValidToken && totalDiscountPrice !== 0 &&
          <div className="flex justify-between">
            <p className="text-sm font-[#8E8E80]">Discount</p>
            <p className=" text-sm sm:text-lg font-bold text-[#333333]">- $ {formattedPrice(totalDiscountPrice)}</p>
          </div>
        }
        <div className="flex justify-between items-center mt-2">
          <p className="text sm font-[#8E8E80]">
            Total</p>
          <p className="font-bold text-[#333333] text-xl sm:text-2xl flex items-baseline space-x-2">
            <span>${formattedPrice(bookingPrice?.totalPrice)}</span>
          </p>

        </div>
        {pathname.includes('booking') && <TokenDiscount
          listingId={listingInfo.id}
          checkInDate={formateDate(new Date(bookingCheckIn))}
          checkOutDate={formateDate(new Date(bookingCheckOut))}
          totalPrice={bookingPrice?.totalPrice}
          guestNumber={guestNumber}
        />}
        <p className="text-[#666666] mt-10 mb-3">Any questions? Call us
          <a href="tel:(813) 531-8988" className="text-black cursor-pointer"> (813) 531-8988</a></p>
      </div>
    </div>
  );
};

export default Booking;
