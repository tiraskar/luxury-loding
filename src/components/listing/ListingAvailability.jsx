import axios from "axios";
import Calendar from "react-calendar";
import { baseUrl } from "../../config/baseurl";
import { useEffect, useState } from "react";
import { formateDate } from "../../helper/date";

const ListingAvailability = () => {
  const [availabilityData, setAvailabilityData] = useState([]);
  const [currentStartDate, setCurrentStartDate] = useState(new Date());
  const [nextStartDate, setNextStartDate] = useState(new Date());

  const fetchData = async () => {
    const response = await axios.get(`${baseUrl}/listing/getcalendar/169542?startDate=2024-08-01`);
    setAvailabilityData(response.data);
  };

  useEffect(() => {
    fetchData();
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
    console.log(formattedDate);
    const availability = availabilityData.find(
      (item) => item.date === formattedDate
    );
    if (availability && availability.isAvailable === 1) return true;
    if (availability && availability.isAvailable === 0) return false;
    if (!availability) return true;
  };

  const tileDisabled = ({ date }) => {
    console.log(date);
    return !isDateAvailable(date);
  };

  return (
    <div id="listing-availability" className="lg:max-w-[652px] space-y-8 font-inter text-[#333333] tracking-tight">
      <h1 className="text-xl font-semibold">Availability</h1>
      <div className="flex space-x-3 border-black shadow-md px-[2px] rounded-2xl overflow-hidden font-inter text-textDark text-sm">

        {availabilityData.length > 0 && (
          <>
            <Calendar
              defaultView="month"
              maxDetail="month"
              minDate={new Date()}
              tileDisabled={tileDisabled}
              className={''}
            />
            <Calendar
              defaultView="month"
              maxDetail="month"
              minDate={futureDate()}
              activeStartDate={nextStartDate}
              onActiveStartDateChange={({ activeStartDate }) =>
                setNextStartDate(activeStartDate)
              }
              tileDisabled={tileDisabled}
              className={''}
            />
          </>
        )}

      </div>
    </div>
  );
};

export default ListingAvailability;
