import { useDispatch, useSelector } from "react-redux";
import CustomCalendar from "../booking/CustomCalender";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { clearBookingDateSelection, setCheckBookingParams } from "../../redux/slices/bookingSlice";

const ListingAvailability = () => {
  const { isCalenderLoading, listingCalender } = useSelector(state => state.listing);

  const dispatch = useDispatch();

  //eslint-disable-next-line
  const { checkBookingParams } = useSelector(state => state.booking);
  const [dateRange, setDateRange] = useState({
    start: dayjs(checkBookingParams.checkIn),
    end: dayjs(checkBookingParams.checkOut),
    }
  );
  const [rangeStart, setRangeStart] = useState(checkBookingParams.checkIn ? dayjs(checkBookingParams.checkIn) : checkBookingParams.checkIn);
  const [rangeEnd, setRangeEnd] = useState(checkBookingParams.checkOut ? dayjs(checkBookingParams.checkOut) : checkBookingParams.checkOut);
  const [hoveredDate, setHoveredDate] = useState(null);


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
  };

  useEffect(() => {
    if (rangeStart && rangeEnd) {
      dispatch(setCheckBookingParams({ name: 'checkIn', value: rangeStart }));
      dispatch(setCheckBookingParams({ name: 'checkOut', value: rangeEnd }));
    }

  }, [dispatch, rangeEnd, rangeStart]);

  useEffect(() => {
    setDateRange({
      start: checkBookingParams.checkIn ? dayjs(checkBookingParams.checkIn) : null,
      end: checkBookingParams.checkOut ? dayjs(checkBookingParams.checkOut) : null,
    });

    setRangeStart(checkBookingParams.checkIn ? dayjs(checkBookingParams.checkIn) : null);
    setRangeEnd(checkBookingParams.checkOut ? dayjs(checkBookingParams.checkOut) : null);

  }, [checkBookingParams.checkIn, checkBookingParams.checkOut]);



  return (
    <div id="Availability" className="lg:max-w-[652px] mx-auto space-y-8 font-inter text-[#333333] tracking-tight">
      <h1 className="text-xl font-semibold">Availability</h1>
      {isCalenderLoading && <p className="py-10">Loading <span className=" animate-bounce">...</span></p>}

      <div className="flex justify-center md:max-w-full min-h-[400px]">
        <div className="relative flex justify-center sm:justify-start mt-4 w-full h-full mx-auto">
          {listingCalender && (
            <CustomCalendar
              calendarId='availabilityCalendar'
              listingCalendar={listingCalender}
              onSelectRange={handleRangeSelection}
              updateDate={handleUpdateDate}
              selectedRange={dateRange}
              showFooter={false}
              clearDates={handleDateClear}
              rangeStart={rangeStart}
              setRangeStart={setRangeStart}
              rangeEnd={rangeEnd}
              setRangeEnd={setRangeEnd}
              hoveredDate={hoveredDate}
              setHoveredDate={setHoveredDate}
              dateClear={handleDateClear}
              disableDateSelection={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingAvailability;

