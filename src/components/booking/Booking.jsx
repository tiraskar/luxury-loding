import { LuBath, LuUsers } from "react-icons/lu";
import { TbBed } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TokenDiscount from "./TokenDiscount";
import { formateDate } from "../../helper/date";
import { formattedPrice } from "../../helper/formatter";
import { calculateBookingPrice, clearBookingDateSelection, setCheckBookingParams } from "../../redux/slices/bookingSlice";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import GuestSelector from "../common/GuestSelector";
import CustomCalendar from "./CustomCalender";
import { IoClose } from "react-icons/io5";
import dayjs from "dayjs";
const Booking = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { listingInfo, listingCalender } = useSelector(state => state.listing);
  const { bookingPrice,
    totalDiscountPrice, isValidToken, bookingGuests } = useSelector(state => state.booking);
  const [isGuestChanged, setIsGuestChanged] = useState(false);
  const [openGuestDropdown, setOpenDropDown] = useState(false);
  const images = listingInfo?.images || [];
  const { checkBookingParams } = useSelector(state => state.booking);
  const [dateRange, setDateRange] = useState({
    start: dayjs(checkBookingParams.checkIn),
    end: dayjs(checkBookingParams.checkOut),
  });
  const [isDateRangedChanged, setIsDateRangeChanged] = useState(false)

  const [rangeStart, setRangeStart] = useState(dayjs(checkBookingParams.checkIn));
  const [rangeEnd, setRangeEnd] = useState(dayjs(checkBookingParams.checkOut));
  const [hoveredDate, setHoveredDate] = useState(null);


  const checkOutRef = useRef(null);
  const checkInRef = useRef(null);
  const [openCheckIn, setOpenCheckIn] = useState(false);
  //eslint-disable-next-line
  const [openCheckOut, setOpenCheckOut] = useState(false);


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
      guests: Number(Number(bookingGuests.adults) + Number(bookingGuests.children)),
      pet: bookingGuests?.pets || null,
      checkIn: formateDate(new Date(checkBookingParams.checkIn)),
      checkOut: formateDate(new Date(checkBookingParams.checkOut)),
      listingId: Number(listingInfo.id)
    }));
    setIsGuestChanged(false)
    setIsDateRangeChanged(false);
  }

  useEffect(() => {
    if (isDateRangedChanged && !openCheckIn && !openCheckOut) {
      updateBooking()
    }

  }, [isDateRangedChanged, openCheckIn, openCheckOut]);


  useEffect(() => {
    if (isGuestChanged && !openGuestDropdown) {
      const handler = setTimeout(() => {
        updateBooking();
      }, 500);

      return () => clearTimeout(handler);
    }
  }, [isGuestChanged, openGuestDropdown, isDateRangedChanged]);

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
    setIsDateRangeChanged(true);
  };

  const handleDateClear = () => {
    setRangeStart(null);
    setRangeEnd(null);
    setHoveredDate(null);
    dispatch(clearBookingDateSelection());
  };

  useEffect(() => {
    if (rangeStart && rangeEnd) {
      dispatch(setCheckBookingParams({ name: 'checkIn', value: rangeStart }));
      dispatch(setCheckBookingParams({ name: 'checkOut', value: rangeEnd }));
      setOpenCheckIn(false);
      setOpenCheckOut(false);
    }

  }, [dispatch, rangeEnd, rangeStart]);

  return (
    <div className="relative space-y-6 md:space-y-8 px-1 xs:px-2 sm:px-0 pt-5">
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
                    className="outline-none max-w-[117px]  text-[1rem]"
                    onClick={() => {
                      setOpenCheckIn(true);
                      setOpenCheckOut(false);
                    }}

                    placeholder="MM/DD/YYYY"
                  />
                  {checkBookingParams.checkIn && (
                    <IoClose
                      onClick={() => handleDateClear()}
                      className="absolute  size-3  right-0 top-1.5 cursor-pointer text-gray-400 text-white bg-buttonPrimary rounded-full"
                    />
                  )}
                </div>
                <div className="z-auto">
                  <div ref={checkInRef}>
                    {openCheckIn &&
                      <CustomCalendar
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
                <CiCalendar size={18} /> <p>Check out</p>
              </p>
              <div className="font-semibold pl-6 ">
                <div className="relative max-w-[117px]">
                  <input
                    value={`${checkBookingParams.checkOut ? format(checkBookingParams.checkOut, "MM/dd/yyyy") : ""}`}
                    readOnly
                    className="outline-none max-w-[117px]  text-[1rem]"
                    onClick={() => {
                      setOpenCheckIn(true);
                      setOpenCheckOut(false);
                    }}

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
            setIsGuestChanged={setIsGuestChanged}
          />

        </div>
        {checkBookingParams.checkIn && checkBookingParams.checkOut && <div className="flex flex-col space-y-4 md:space-y-6 my-10">
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
        </div>}

        {checkBookingParams.checkIn && checkBookingParams.checkOut && isValidToken && totalDiscountPrice !== 0 &&
          <div className="flex justify-between">
            <p className="text-sm font-[#8E8E80]">Discount</p>
            <p className=" text-sm sm:text-lg font-bold text-[#333333]">- $ {formattedPrice(totalDiscountPrice)}</p>
          </div>
        }
        {checkBookingParams.checkIn && checkBookingParams.checkOut && <div className="flex justify-between items-center mt-2">
          <p className="text sm font-[#8E8E80]">
            Total</p>
          <p className="font-bold text-[#333333] text-xl sm:text-2xl flex items-baseline space-x-2">
            <span>${formattedPrice(bookingPrice?.totalPrice)}</span>
          </p>

        </div>}
        {pathname.includes('booking') && <TokenDiscount
          listingId={listingInfo.id}
          checkInDate={dayjs(checkBookingParams.checkIn)}
          checkOutDate={dayjs(checkBookingParams.checkOut)}
          totalPrice={bookingPrice?.totalPrice}
          guestNumber={bookingGuests.adults + bookingGuests.children}
        />}
        <p className="text-[#666666] mt-10 mb-3">Any questions? Call us
          <a href="tel:(813) 531-8988" className="text-black cursor-pointer"> (813) 531-8988</a></p>
      </div>
    </div>
  );
};

export default Booking;
