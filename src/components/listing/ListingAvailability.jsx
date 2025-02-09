import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCheckBookingParams } from "../../redux/slices/bookingSlice";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import { toggleDateRangedPickedForBooking } from "../../redux/slices/bookingSlice";

const ListingAvailability = () => {
  const { listingAvailableCalender, isCalenderLoading, listingUnavailableCalender, listingCheckOutAvailableDate } = useSelector(state => state.listing);

  const { checkBookingParams, isDateRangedPickedFromAvailability, isDateRangedPickedFromBooking } = useSelector(state => state.booking);
  const dispatch = useDispatch();

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection'
    }
  ]);

  useEffect(() => {
    const { startDate, endDate } = range[0];
    if (isDateRangedPickedFromAvailability && startDate) {
      dispatch(setCheckBookingParams({ name: 'checkIn', value: startDate }));
    }
    if (isDateRangedPickedFromAvailability && endDate) {
      dispatch(setCheckBookingParams({ name: 'checkOut', value: endDate }));
    }
  }, [range[0].startDate, range[0].endDate]);

  const getUnavailableDates = () => {
    return listingAvailableCalender
      .filter(item => item.isAvailable === 0)
      .map(item => new Date(item.date));
  };

  const [direction, setDirection] = useState('horizontal');

  useEffect(() => {
    const updateDirection = () => {
      if (window.innerWidth <= 450) {
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
    // if (isDateRangedPickedFromBooking) {
    setRange([
      {
        startDate: checkBookingParams.checkIn ? new Date(checkBookingParams.checkIn) : new Date(),
        endDate: checkBookingParams.checkOut ? new Date(checkBookingParams.checkOut) : new Date(),
        key: 'selection',
      },
    ]);
    // }
  }, [isDateRangedPickedFromBooking, checkBookingParams.checkIn, checkBookingParams.checkOut]);

  return (
    <div id="Availability" className="lg:max-w-[652px] mx-auto space-y-8 font-inter text-[#333333] tracking-tight">
      <h1 className="text-xl font-semibold">Availability</h1>
      {isCalenderLoading && <p className="py-10">Loading <span className=" animate-bounce">...</span></p>}

      <div className="flex justify-center md:max-w-full ">
        <div className="relative flex justify-center sm:justify-start mt-4 w-full mx-auto">
          {listingAvailableCalender.length > 0 && (  
            <DateRange
              onChange={item => {
                dispatch(toggleDateRangedPickedForBooking('availabilityDatePick'));
                setRange([item.selection]);
              }}
              months={2}
              editableDateInputs={false}
              moveRangeOnFirstSelection={false}
              className="border-[1.5px] border-buttonPrimary rounded-2xl xs:w-full max-w-[650px] "
              minDate={new Date()}
              ranges={range}
              rangeColors={["#B69F6F"]}
              showDateDisplay={false}
              direction={direction}
              showMonthAndYearPickers={false}
              disabledDates={listingUnavailableCalender}
              dayContentRenderer={(date) => {
                const isCheckOutAvailable = listingCheckOutAvailableDate.some(d =>
                  new Date(d).toDateString() === date.toDateString()
                );
                return (
                  <span
                    style={{
                      opacity: isCheckOutAvailable ? 0.5 : 1,
                      padding: "5px",
                      position: "relative",
                      cursor: isCheckOutAvailable ? "pointer" : "default",
                    }}
                    className={isCheckOutAvailable ? "checkout-tooltip z-50 " : ""}
                  >
                    {date.getDate()}
                    {isCheckOutAvailable && (
                      <span className="tooltip-text overflow-visible z-50">Check-out Only</span>
                    )}
                  </span>

                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingAvailability;


// "react-date-range": "^2.0.1",
