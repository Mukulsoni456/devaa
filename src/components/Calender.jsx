import { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Ensure the correct Firebase setup
import { collection, onSnapshot } from "firebase/firestore";
import dayjs from "dayjs";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState({});

  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf("month").day();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Fetch events from Firestore with real-time updates
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "calendarEvents"), (querySnapshot) => {
      const eventData = {};
      querySnapshot.forEach((doc) => {
        const { date, event } = doc.data();
        if (!eventData[date]) eventData[date] = [];
        eventData[date].push(event);
      });
      setEvents(eventData);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Event Calendar</h2>

      {/* Calendar UI */}
      <div className="max-w-md w-full bg-white shadow-md rounded-lg">
        <div className="p-4 flex justify-between items-center">
          <span className="text-lg font-semibold">{currentDate.format("MMMM YYYY")}</span>
          <div>
            <button onClick={handlePrevMonth} className="mr-2 text-gray-600">‹</button>
            <button onClick={handleNextMonth} className="text-gray-600">›</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
            <div key={d} className="text-gray-800 font-medium">{d}</div>
          ))}
          {Array.from({ length: firstDayOfMonth }, (_, i) => <div key={i}></div>)}
          {daysArray.map((day) => {
            const dateKey = `${currentDate.format("YYYY-MM")}-${String(day).padStart(2, "0")}`;
            return (
              <div key={day} className="p-2 text-gray-800 border rounded">
                {day}
                {events[dateKey] && (
                  <ul className="text-xs text-red-500">
                    {events[dateKey].map((event, index) => <li key={index}>{event}</li>)}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
