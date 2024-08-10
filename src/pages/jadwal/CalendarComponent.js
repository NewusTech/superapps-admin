import React from "react";
import "@bitnoi.se/react-scheduler/dist/style.css";

export default function CalendarComponent() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dates = [
    // Dummy data for dates, in a real scenario, generate based on the month/year
    [28, 29, 30, 31, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 1, 2],
  ];

  const events = {
    8: ["Isra Mikraj Nabi Muhammad SAW", "Ascension of the Prophet Muhammad"],
    9: ["Cuti Bersama Tahun Baru Imlek", "Lunar New Year Joint Holiday"],
    10: ["Tahun Baru Imlek", "Lunar New Year's Day"],
    14: ["Hari Pemilihan", "Election Day"],
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-4 text-center text-gray-500 font-bold">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4 mt-4">
        {dates.flat().map((date, index) => (
          <div key={index} className="h-24 border p-2 relative">
            <span className="absolute top-2 left-2">{date}</span>
            {events[date] && (
              <div className="mt-4 space-y-1">
                {events[date].map((event, i) => (
                  <div
                    key={i}
                    className="bg-green-600 text-white text-xs p-1 rounded">
                    {event}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
