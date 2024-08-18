import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { formateDate } from "../../helper/date";
import { useSelector } from "react-redux";
const ListingAvailability = () => {

  const { listingAvailableCalender, isCalenderLoading } = useSelector(state => state.listing);

  const [nextStartDate, setNextStartDate] = useState(new Date());

  useEffect(() => {
    const date = futureDate();
    setNextStartDate(date);
  }, [])

  const futureDate = () => {
    const today = new Date();
    const futureDate = new Date(today.setMonth(today.getMonth() + 1));
    return futureDate;
  };

  const isDateAvailable = (date) => {
    const formattedDate = formateDate(date);
    const availability = listingAvailableCalender.find(
      (item) => item.date === formattedDate
    );
    if (availability && availability.isAvailable === 1) return true;
    if (availability && availability.isAvailable === 0) return false;
    if (!availability) return true;
  };

  const tileDisabled = ({ date }) => {
    return !isDateAvailable(date);
  };

  return (
    <div id="listing-availability" className="lg:max-w-[652px] space-y-8 font-inter text-[#333333] tracking-tight">
      <h1 className="text-xl font-semibold">Availability</h1>
      {isCalenderLoading && <p className="py-10">Loading <span className=" animate-bounce">...</span></p>}
      <div className="flex space-x-3 border-black shadow-md px-[2px] rounded-2xl overflow-hidden font-inter text-textDark text-sm">

        {listingAvailableCalender.length > 0 && (
          <>
            <Calendar
              defaultView="month"
              maxDetail="month"
              minDate={new Date()}
              tileDisabled={tileDisabled}
              className={'font-inter text-[15px] font-medium capitalize'}
              next2Label={null}
              prev2Label={null}
              calendarType="hebrew"
              goToRangeStartOnSelect={false}
              showNeighboringCentury={false}
              showNeighboringDecade={false}
            />
            <Calendar
              defaultView="month"
              maxDetail="month"
              minDate={new Date()}
              activeStartDate={nextStartDate}
              onActiveStartDateChange={({ activeStartDate }) =>
                setNextStartDate(activeStartDate)
              }
              tileDisabled={tileDisabled}
              className={['font-inter text-[15px] font-medium capitalize']}
              next2Label={null}
              prev2Label={null}
              calendarType="hebrew"
              goToRangeStartOnSelect={false}
              showNeighboringCentury={false}
              showNeighboringDecade={false}
            />
          </>
        )}

      </div>
    </div>
  );
};

export default ListingAvailability;
