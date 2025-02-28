import { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // Import Firestore
import { collection, onSnapshot } from "firebase/firestore";
import hero from "../assets/hero2.png";

export default function Hero() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "calendarEvents"), (querySnapshot) => {
      const eventList = [];
      querySnapshot.forEach((doc) => {
        const { date, event } = doc.data();
        eventList.push({ id: doc.id, date, event });
      });

      // Sort events by date (optional)
      eventList.sort((a, b) => new Date(a.date) - new Date(b.date));

      setEvents(eventList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      {/* Marquee */}
      <div className="absolute top-0 left-0 w-full bg-opacity-20 text-black py-2 overflow-hidden z-50">
  <marquee behavior="scroll" direction="left" className="text-lg text-red-500 font-bold">
    Our Event is Live Check this out 
  </marquee>
</div>


      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      ></div>

      {/* Right-Side Event Box */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-80 h-96 bg-[#38302E] bg-opacity-90 shadow-lg rounded-lg p-4 overflow-hidden">
        <h2 className="text-lg font-bold text-[#FFCF9C] text-center">Upcoming Events</h2>
        <div className="mt-4 h-[75%] overflow-hidden relative">
          <div className="event-scroll">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className="py-2 border-b border-gray-300">
                  <p className="text-sm font-semibold text-white">{event.event}</p>
                  <p className="text-xs text-gray-300">{event.date}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No upcoming events</p>
            )}
          </div>
        </div>
      </div>

      {/* Tailwind Animation */}
      <style>
        {`
@keyframes scrollEvents {
    from { transform: translateY(0); }
    to { transform: translateY(-50%); }
  }
  .event-scroll {
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: scrollEvents 15s linear infinite;
  }
        `}
      </style>
    </section>
  );
}
