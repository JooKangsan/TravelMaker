"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import useCreateCalendar from "../../../hooks/useCreateCalendar";
import { getMyActivityMonthReservationStatus } from "../../../utils/reservationStatus";
import DateSwitcher from "./DateSwitcher";
import Day from "./Day";
import ReservationStatusModal from "./ReservationStatusModal";

const weeks = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

function Calendar({ selectedId }: { selectedId: number }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const monthReservationParams = {
    activityId: selectedId,
    year: String(currentYear),
    month: String(currentMonth < 10 ? `0${currentMonth}` : currentMonth),
  };

  const { data } = useSuspenseQuery(getMyActivityMonthReservationStatus(monthReservationParams));
  const calendarData = useCreateCalendar(currentYear, currentMonth, data);

  return (
    <div className="mt-8">
      <DateSwitcher
        setCurrentDate={setCurrentDate}
        currentYear={currentYear}
        currentMonth={currentMonth}
      />
      <div className="grid grid-cols-7">
        {weeks.map(week => (
          <div key={week} className="border bg-white p-2 text-center font-medium">
            {week}
          </div>
        ))}
        {calendarData.flat().map(dayData => (
          <Day key={crypto.randomUUID()} dayData={dayData} setCurrentDate={setCurrentDate} />
        ))}
      </div>
      <ReservationStatusModal activityId={selectedId} selectedDate={currentDate} />
    </div>
  );
}
export default Calendar;
