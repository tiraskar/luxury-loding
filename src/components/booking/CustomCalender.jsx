import { useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";

const CustomCalendar = ({ listingCalendar, onSelectRange, updateDate, showFooter, rangeStart, setRangeStart, rangeEnd, setRangeEnd, hoveredDate, setHoveredDate, dateClear }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const today = dayjs().startOf("day");

  const generateMonthDates = (month) => {
    const startOfMonth = month.startOf("month");
    const endOfMonth = month.endOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = endOfMonth.date();
    const allDates = [];

    for (let i = 0; i < startDay; i++) allDates.push(null);
    for (let d = 1; d <= daysInMonth; d++) allDates.push(month.date(d));
    while (allDates.length < 42) allDates.push(null);
    return allDates;
  };

  const isSelectableDate = (d) => {
    if (!d) return false;

    const dateStr = d.format("YYYY-MM-DD");
    if (d.isBefore(today, "day")) return false;

    const isAvailable = listingCalendar[dateStr]?.isAvailable === 1;
    const isCheckoutOnly = isCheckoutOnlyDate(d);

    if (!isAvailable && !isCheckoutOnly) return false;

    // Only allow checkout-only selection *if* rangeStart exists
    if (isCheckoutOnly && !rangeStart) return false;

    if (rangeStart && !rangeEnd) {
      if (d.isBefore(rangeStart, "day")) return false;

      // Check dates between rangeStart and d (exclusive)
      const sortedDates = Object.keys(listingCalendar)
        .filter((date) => {
          const dayDate = dayjs(date);
          return dayDate.isAfter(rangeStart, "day") && dayDate.isBefore(d, "day");
        })
        .sort((a, b) => dayjs(a).diff(dayjs(b)));

      for (let date of sortedDates) {
        const info = listingCalendar[date];
        if (info.isAvailable === 0) {
          return false;
        }
      }
    }

    return true;
  };

  const getHoveredRangeClass = (d) => {
    if (!rangeStart || rangeEnd || !hoveredDate) return "";

    if (d.isSame(rangeStart, "day")) return "";

    if (d.isAfter(rangeStart, "day") && (d.isBefore(hoveredDate, "day") || d.isSame(hoveredDate, "day"))) {
      // Check if any date between rangeStart and current date (exclusive) is unavailable
      const rangeDates = [];
      let tempDate = rangeStart.add(1, "day");
      while (tempDate.isBefore(hoveredDate, "day")) {
        rangeDates.push(tempDate);
        tempDate = tempDate.add(1, "day");
      }

      for (let date of rangeDates) {
        const dateStr = date.format("YYYY-MM-DD");
        if (listingCalendar[dateStr]?.isAvailable === 0) {
          return ""; // Stop hover range before the unavailable date
        }
      }

      return "bg-buttonPrimary bg-opacity-50 text-white";
    }

    return "";
  };



  const handleDateClick = (d) => {
    if (!isSelectableDate(d)) return;

    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(d);
      setRangeEnd(null);
      setHoveredDate(null);
      return;
    }

    if (rangeStart && !rangeEnd) {
      if (d.isBefore(rangeStart, "day")) {
        setRangeStart(d);
        return;
      }

      const minimumStay = listingCalendar[rangeStart.format("YYYY-MM-DD")]?.minimumStay || 0;
      const diffDays = d.diff(rangeStart, "day");

      if (diffDays < minimumStay + 1) {
        console.warn(`Minimum stay is ${minimumStay + 1} nights.`);
        return;
      }

      setRangeEnd(d);
      if (onSelectRange) onSelectRange({ start: rangeStart, end: d });
      if (updateDate) updateDate({ start: rangeStart.format("YYYY-MM-DD"), end: d.format("YYYY-MM-DD") });
    }
  };

  const getSelectedClass = (d) => {
    if (!rangeStart) return "";

    if (rangeStart && !rangeEnd) {
      if (d.isSame(rangeStart, "day")) return "bg-buttonPrimary text-white font-bold";
    }

    if (rangeStart && rangeEnd) {
      if (d.isSame(rangeStart, "day") || d.isSame(rangeEnd, "day"))
        return "bg-buttonPrimary text-white font-bold rounded-full";
      if (d.isAfter(rangeStart, "day") && d.isBefore(rangeEnd, "day"))
        return "bg-buttonPrimary bg-opacity-70 rounded-full text-white";
    }

    return "";
  };


  const isCheckoutOnlyDate = (d) => {
    if (!d) return false;
    const prevDate = d.subtract(1, "day").format("YYYY-MM-DD");
    const currDateStr = d.format("YYYY-MM-DD");

    const isCurrAvailable = listingCalendar[currDateStr]?.isAvailable === 1;
    const isPrevAvailable = listingCalendar[prevDate]?.isAvailable === 1;

    // If current date is available, it can't be checkout-only.
    if (isCurrAvailable) return false;

    // If prev is available, current is unavailable → checkout only.
    return isPrevAvailable && !isCurrAvailable;
  };

  const months = [currentMonth, currentMonth.add(1, "month")];


  return (
    <div className="absolute left-0 z-20 w-full max-w-xl p-6 border border-buttonPrimary bg-white rounded-3xl shadow">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4 ">
        <button
          className="flex items-center -ml-3 text-buttonPrimary hover:text-buttonPrimary/70 transition"
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        >
          <ChevronLeft className="mr-2" />
          {currentMonth.format("MMMM YYYY")}
        </button>

        <button
          className="flex items-center text-buttonPrimary hover:text-buttonPrimary/70 transition"
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
        >
          {currentMonth.add(1, "month").format("MMMM YYYY")}
          <ChevronRight className="ml-2" />
        </button>
      </div>

      {/* Months */}
      <div className="flex flex-col md:flex-row gap-4 font-onest">
        {months.map((month, i) => {
          const allDates = generateMonthDates(month);
          return (
            <div key={i} className="flex-1">
              <div className="grid grid-cols-7 text-buttonPrimary font-semibold gap-1 text-center text-sm mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {allDates.map((d, idx) => {
                  if (!d) return <div key={idx} className="p-2" />;

                  const dateStr = d.format("YYYY-MM-DD");
                  const disabled = !isSelectableDate(d);

                  const isHovering = !rangeEnd && rangeStart && d.isAfter(rangeStart, "day");
                  const showTooltip = isHovering;
                  const hoverTooltipId = `hover-tooltip-${dateStr}`;

                  return (
                    <div
                      key={dateStr}
                      data-tooltip-id={hoverTooltipId}
                      data-tooltip-content={
                        showTooltip
                          ? `Minimum stay is ${(listingCalendar[rangeStart?.format("YYYY-MM-DD")]?.minimumStay || 0) + 1
                          } nights`
                          : isCheckoutOnlyDate(d) && !rangeStart
                            ? "Check-in unavailable"
                            : disabled
                              ? "Unavailable"
                              : ""
                      }

                      className={`relative w-8 h-8 flex items-center justify-center text-center text-xs select-none

                        ${disabled && !(isCheckoutOnlyDate(d) && !rangeStart) ? "opacity-50 line-through cursor-not-allowed text-black" : "cursor-pointer"}
                        ${isCheckoutOnlyDate(d) && !rangeStart ? "opacity-50" : ""}

                        ${getSelectedClass(d)} ${getHoveredRangeClass(d)}
                        hover:brightness-90 transition
                      `}
                      onClick={() => handleDateClick(d)}
                      onMouseEnter={() => {
                        if (rangeStart && !rangeEnd) setHoveredDate(d);
                      }}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      {d.date()}
                      <Tooltip id={hoverTooltipId} place="top" />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {showFooter && <div className=" flex justify-between items-center">
        <div className="text-sm  flex font-semibold text-gray-700">

          {rangeStart ? `Check-In: ${rangeStart.format("MMM D, YYYY")}` : <span className="text-gray-400"></span>}
          {rangeEnd ? `, Check-Out: ${rangeEnd.format("MMM D, YYYY")}` : <span className="text-gray-400"></span>}

        </div>
        <button
          className="px-3 py-1.5 text-sm font-medium font-inter text-buttonPrimary border-buttonPrimary border rounded-full hover:bg-buttonPrimary hover:text-white transition"
          onClick={dateClear}
        >
          Clear Dates
        </button>
      </div>}
    </div>
  );
};

CustomCalendar.propTypes = {
  listingCalendar: PropTypes.object.isRequired,
  onSelectRange: PropTypes.func,
  updateDate: PropTypes.func,
  showFooter: PropTypes.bool,
  dateClear: PropTypes.func,
  rangeStart: PropTypes.any,
  setRangeStart: PropTypes.any,
  rangeEnd: PropTypes.any,
  setRangeEnd: PropTypes.any,
  hoveredDate: PropTypes.any,
  setHoveredDate: PropTypes.any
};

export default CustomCalendar;

