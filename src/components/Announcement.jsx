import { useState, useEffect, useRef } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function AnnouncementSection() {
  const [announcements, setAnnouncements] = useState([]);
  const [showPast, setShowPast] = useState(false); // Toggle past events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  
  const today = dayjs().format("YYYY-MM-DD"); // Get today's date

  // Fetch announcements from Firestore
  const fetchAnnouncements = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedAnnouncements = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((post) => post.type === "event");

      setAnnouncements(fetchedAnnouncements);
    } catch (err) {
      setError("Error fetching announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  // Convert Firestore Timestamp or string to comparable date format
  const getFormattedDate = (event) => {
    if (event.date?.toDate) {
      return dayjs(event.date.toDate()).format("YYYY-MM-DD");
    }
    return dayjs(event.date).format("YYYY-MM-DD");
  };

  // Separate Upcoming & Past Events
  const upcomingEvents = announcements.filter((event) => getFormattedDate(event) >= today);
  const pastEvents = announcements.filter((event) => getFormattedDate(event) < today);

  // Scroll functionality
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) {
    return <p className="text-center text-lg text-gray-700">Loading announcements...</p>;
  }

  if (error) {
    return <h1 className="text-center text-red-500 text-xl">{error}</h1>;
  }

  return (
    <section className="py-16 sm:py-24 px-8 bg-gray-50 text-center relative">
      <h2 className="text-4xl font-bold text-[#512B1C] mb-10 uppercase tracking-wide">
        {showPast ? "Past Events" : "Upcoming Events"}
      </h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-900"
      >
        &#10094;
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-900"
      >
        &#10095;
      </button>

      {/* Toggle Button */}
      <button
        onClick={() => setShowPast(!showPast)}
        className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-700 transition"
      >
        {showPast ? "Show Upcoming Events" : "Show Past Events"}
      </button>

      {/* Scrollable Announcements */}
      <div
        ref={scrollContainerRef}
        className="max-w-6xl mx-auto flex space-x-6 overflow-x-auto scroll-smooth no-scrollbar mt-5"
      >
        {showPast
          ? pastEvents.length > 0
            ? pastEvents.map((announcement) => (
                <EventCard key={announcement.id} announcement={announcement} />
              ))
            : <p className="text-gray-600 text-lg">No past events available.</p>
          : upcomingEvents.length > 0
          ? upcomingEvents.map((announcement) => (
              <EventCard key={announcement.id} announcement={announcement} />
            ))
          : <p className="text-gray-600 text-lg">No upcoming events available.</p>
        }
      </div>
    </section>
  );
}

// Reusable Event Card Component
function EventCard({ announcement }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[300px]">
      <img
        src={announcement.imageUrl}
        alt={announcement.title}
        className="w-full h-56 object-cover rounded-lg"
      />
      <h3 className="text-2xl font-semibold text-[#A52A2A] mt-4">{announcement.title}</h3>
      <p className="text-gray-500 text-sm mt-1">{announcement.date} | {announcement.category}</p>
      <p className="text-gray-700 mt-3 line-clamp-3">{announcement.description}</p>
      <Link
        to={`/announcement/${announcement.id}`}
        className="text-orange-500 font-semibold mt-3 inline-block hover:underline"
      >
        Read more
      </Link>
    </div>
  );
}
