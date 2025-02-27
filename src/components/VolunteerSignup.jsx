import { useEffect, useState } from "react";
import { db, collection, getDocs, addDoc } from "../firebaseConfig";
import signupImage from "../assets/gallery2.jpg";

export default function VoluntarySignupSection() {
  const [volunteer, setVolunteer] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventName: "",
    numPeople: "",
    date: "",
  });

  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State for popup

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventCollection = await getDocs(collection(db, "calendarEvents"));

        if (eventCollection.empty) {
          console.log("No events found in Firestore!");
          return;
        }

        const eventsList = eventCollection.docs.map(doc => ({
          name: doc.data().event,
          date: doc.data().date,
        }));

        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "eventName") {
      const selectedEvent = events.find(event => event.name === value);
      setVolunteer({
        ...volunteer,
        eventName: value,
        date: selectedEvent ? selectedEvent.date : "",
      });
    } else {
      setVolunteer({ ...volunteer, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "volunteers"), volunteer);
      setShowPopup(true); // Show the popup
      setVolunteer({ fullName: "", email: "", phone: "", eventName: "", numPeople: "", date: "" });
    } catch (error) {
      console.error("Error saving volunteer:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <section className="bg-[#FDF9F2] py-20 md:py-24 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-full md:w-1/2">
          <img src={signupImage} alt="Voluntary Signup" className="w-full rounded-lg shadow-lg" />
          <div className="absolute bottom-[-20px] right-[-20px] bg-[#eca427] text-[#512B1C] px-10 py-14 sm:px-20 sm:py-20 text-lg font-bold">
            JOIN THE MOVEMENT.
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#512B1C]">BE A VOLUNTEER</h2>
          <p className="mt-4 text-gray-600">Become a part of our mission and make a difference.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input type="text" name="fullName" placeholder="Full Name" className="w-full px-4 py-3 border rounded-lg" value={volunteer.fullName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" className="w-full px-4 py-3 border rounded-lg" value={volunteer.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" className="w-full px-4 py-3 border rounded-lg" value={volunteer.phone} onChange={handleChange} required />
            <select name="eventName" value={volunteer.eventName} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg" required>
              <option value="">Select an Event</option>
              {events.map((event, index) => (
                <option key={index} value={event.name}>{event.name}</option>
              ))}
            </select>
            <input type="number" name="numPeople" placeholder="Number of People Coming With You" className="w-full px-4 py-3 border rounded-lg" value={volunteer.numPeople} onChange={handleChange} required />
            <input type="date" name="date" className="w-full px-4 py-3 border rounded-lg bg-gray-100" value={volunteer.date} onChange={handleChange} readOnly required />
            <button type="submit" className="bg-[#eca427] text-white font-semibold px-6 py-3 rounded-lg">JOIN US</button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-[#512B1C]">Thank You for Volunteering!</h2>
            <p className="mt-2 text-gray-600">Your support makes a huge difference.</p>
            <button onClick={() => setShowPopup(false)} className="mt-4 bg-[#eca427] text-white px-4 py-2 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
