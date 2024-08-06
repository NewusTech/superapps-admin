import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function Jadwal() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [newSchedule, setNewSchedule] = useState("");
  const [schedules, setSchedules] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddSchedule = () => {
    if (newSchedule.trim() === "") return;

    const dateKey = selectedDate.toISOString().split("T")[0];

    setSchedules((prevSchedules) => ({
      ...prevSchedules,
      [dateKey]: [...(prevSchedules[dateKey] || []), newSchedule],
    }));
    setNewSchedule("");
    setSelectedDate(null);
  };

  const renderSchedules = (date) => {
    const dateKey = date.toISOString().split("T")[0];
    return schedules[dateKey]?.map((schedule, index) => (
      <div key={index} className="bg-yellow-200 p-1 mt-1 rounded text-xs">
        {schedule}
      </div>
    ));
  };

  const changeMonth = (offset) => {
    const newMonth = new Date(
      currentMonth.setMonth(currentMonth.getMonth() + offset)
    );
    setCurrentMonth(newMonth);
  };

  const changeYear = (offset) => {
    const newYear = new Date(
      currentMonth.setFullYear(currentMonth.getFullYear() + offset)
    );
    setCurrentMonth(newYear);
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const previousMonth = new Date(year, month - 1, 1);
    const nextMonth = new Date(year, month + 1, 1);

    // Days from previous month
    const daysInPrevMonth = daysInMonth(
      previousMonth.getMonth(),
      previousMonth.getFullYear()
    );
    const prevMonthDays = firstDay === 0 ? 6 : firstDay - 1;

    for (
      let day = daysInPrevMonth - prevMonthDays + 1;
      day <= daysInPrevMonth;
      day++
    ) {
      const date = new Date(
        previousMonth.getFullYear(),
        previousMonth.getMonth(),
        day
      );
      days.push(
        <div
          key={`prev-${day}`}
          className="p-2 h-20 text-neutral-600 border border-neutral-600 opacity-50">
          {day}
        </div>
      );
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth(month, year); day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isSunday = date.getDay() === 0;
      days.push(
        <div
          key={day}
          className={`border p-2 h-20 cursor-pointer ${
            isToday ? "bg-primary-600 text-neutral-50" : ""
          } ${isSunday ? "bg-error-600" : ""}`}
          onClick={() => handleDateClick(date)}>
          <div>{day}</div>
          {renderSchedules(date)}
        </div>
      );
    }

    // Days from next month
    const totalDays = days.length;
    const totalCells = 42;
    const nextMonthDays = totalCells - totalDays;

    for (let day = 1; day <= nextMonthDays; day++) {
      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day);
      days.push(
        <div
          key={`next-${day}`}
          className="text-neutral-600 border border-neutral-600 p-2 h-20 opacity-50">
          {day}
        </div>
      );
    }

    return days;
  };

  // Determine the current day of the week as a string
  const todayDayOfWeekIndex = today.getDay();
  const todayDayOfWeek = daysOfWeek[(todayDayOfWeekIndex + 6) % 7]; // Adjust to start with Monday

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Calendar Schedule</h1>
      <div className="flex items-center gap-x-3 h-full bg-neutral-50 p-2 rounded-t-md w-5/12 shadow-md">
        <button
          onClick={() => changeYear(-1)}
          className="text-primary-700 rounded">
          <ChevronsLeft />
        </button>
        <button
          onClick={() => changeMonth(-1)}
          className="text-primary-700 rounded">
          <ChevronLeft />
        </button>
        <button className="bg-primary-700 text-neutral-50 px-4 py-1 rounded-md">
          Today
        </button>
        <button
          onClick={() => changeMonth(1)}
          className="text-primary-700 rounded">
          <ChevronRight />
        </button>
        <button
          onClick={() => changeYear(1)}
          className="text-primary-700 rounded">
          <ChevronsRight />
        </button>

        <span className="text-xl font-semibold text-primary-700">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 p-2 bg-neutral-50 shadow-md">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`font-bold text-center border p-2 border-primary-700 ${
              day === todayDayOfWeek ? "bg-primary-600 text-neutral-50" : ""
            }`}>
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      {selectedDate && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h3 className="text-xl mb-4">
              Add Schedule for {selectedDate.toDateString()}
            </h3>
            <input
              type="text"
              value={newSchedule}
              onChange={(e) => setNewSchedule(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddSchedule}
                className="bg-blue-500 text-white py-2 px-4 rounded">
                Add
              </button>
              <button
                onClick={() => setSelectedDate(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
