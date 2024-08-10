
import Calendar from "react-calendar";

const ListingAvailability = () => {

  const futureDate = () => {
    const today = new Date();
    const futureDate = new Date(today.setMonth(today.getMonth() + 1));
    return futureDate;
  };


  return (
    <div id="listing-availability" className="lg:max-w-[652px] space-y-8 font-inter text-[#333333] tracking-tight">
      <h1 className="text-xl font-semibold">Availability</h1>
      <div className="flex space-x-3 border-black shadow-md px-[2px] rounded-2xl overflow-hidden font-inter text-textDark text-sm">
        <Calendar
          defaultView="month"
          maxDetail="month"
          minDate={new Date()}
          className={''}
        />
        <Calendar
          defaultView="month"
          maxDetail="month"
          activeStartDate={futureDate()}
          className={''}
        />

      </div>
      {/* <CustomCalendar /> */}

    </div>
  );
};

export default ListingAvailability;