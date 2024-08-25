import Calendar from "react-calendar";
// import { useEffect, useState } from "react";
import { formateDate } from "../../helper/date";
import { useSelector } from "react-redux";
const ListingAvailability = () => {

  const { listingAvailableCalender, isCalenderLoading } = useSelector(state => state.listing);

  // const [nextStartDate, setNextStartDate] = useState(new Date());

  // useEffect(() => {
  //   const date = futureDate();
  //   setNextStartDate(date);
  // }, [])

  // const futureDate = () => {
  //   const today = new Date();
  //   const futureDate = new Date(today.setMonth(today.getMonth() + 1));
  //   return futureDate;
  // };

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
    <div id="Availability" className="lg:max-w-[652px] space-y-8 font-inter text-[#333333] tracking-tight">
      <h1 className="text-xl font-semibold">Availability</h1>
      {isCalenderLoading && <p className="py-10">Loading <span className=" animate-bounce">...</span></p>}
      <div className="flex font-inter text-textDark text-sm ">

        {listingAvailableCalender.length > 0 && (
          <div className="flex justify-center md:max-w-[652px] md:max-h-[317px] overflow-hidden">
            <Calendar
              defaultView="month"
              maxDetail="month"
              minDate={new Date()}
              tileDisabled={tileDisabled}
              prev2Label={null}
              next2Label={null}
              showDoubleView
              calendarType="hebrew"
              goToRangeStartOnSelect={false}
              showNeighboringCentury={false}
              showNeighboringDecade={false}
              selectRange={false}
              className={['hidden md:block font-inter text-[15px] font-bold capitalize rounded-2xl overflow-hidden']}
              tileClassName={({ date }) => (tileDisabled({ date }) ? 'disabled-date' : '')}
            />
            <div className="overflow-hidden">
              <Calendar
                defaultView="month"
                maxDetail="month"
                minDate={new Date()}
                tileDisabled={tileDisabled}
                prev2Label={null}
                next2Label={null}
                calendarType="hebrew"
                goToRangeStartOnSelect={false}
                showNeighboringCentury={false}
                showNeighboringDecade={false}
                selectRange={false}
                className={['block md:hidden  font-inter text-[15px] font-bold capitalize rounded-2xl overflow-hidden']}
                tileClassName={({ date }) => (tileDisabled({ date }) ? 'disabled-date' : '')}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ListingAvailability;



{/* <Calendar
                defaultView="month"
                tileClassName={['font-bold']}
                maxDetail="month"
                minDate={new Date()}
                activeStartDate={nextStartDate}
                onActiveStartDateChange={({ activeStartDate }) =>
                  setNextStartDate(activeStartDate)
                }
                tileDisabled={tileDisabled}
                className={['font-inter text-[15px] font-medium capitalize border-0']}
                next2Label={null}
                prev2Label={null}
                prevLabel={null}
                calendarType="hebrew"
                goToRangeStartOnSelect={false}
                showNeighboringCentury={false}
                showNeighboringDecade={false}
            /> */}

{/* <Calendar
              defaultView="month"
              maxDetail="month"
              minDate={new Date()}
              tileDisabled={tileDisabled}
              prev2Label={null}
              next2Label={null}
              showDoubleView
              calendarType="hebrew"
              goToRangeStartOnSelect={false}
              showNeighboringCentury={false}
              showNeighboringDecade={false}
              selectRange={false}
              className={['font-inter text-[15px] font-medium capitalize rounded-2xl overflow-hidden']}
            /> */}