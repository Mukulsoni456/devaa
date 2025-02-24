import { useState, useEffect } from "react";
import { db, auth, signInWithGoogle } from "../firebaseConfig";
import { collection, onSnapshot, addDoc, doc, updateDoc, getDoc, increment } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import dayjs from "dayjs";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [user] = useAuthState(auth);


  useEffect(() => {
    if (user) {
      setShowLoginPopup(false); // Close login popup when user logs in
    }
  }, [user]);
  

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "calendarEvents"), (querySnapshot) => {
      const eventData = {};
      querySnapshot.forEach((doc) => {
        const { date, event, yes = 0, voters = {} } = doc.data();
        if (!eventData[date]) eventData[date] = [];
        eventData[date].push({ id: doc.id, event, yes, voters });
      });
      setEvents(eventData);
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleDateClick = (day) => {
    const dateKey = `${currentDate.format("YYYY-MM")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateKey);
  };

  const handleVote = async (eventId, eventName, voteType) => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
  
    const eventRef = doc(db, "calendarEvents", eventId);
    const eventSnap = await getDoc(eventRef);
  
    if (eventSnap.exists()) {
      const eventData = eventSnap.data();
      const votersMap = eventData.voters || {}; // Object storing user votes (yes/no)
  
      const currentVote = votersMap[user.uid];
  
      if (currentVote === voteType) {
        setPopupMessage("⚠️ You have already voted this way.");
        return;
      }
  
      const updates = {};
  
      if (currentVote) {
        // Reduce the count of the previous vote
        updates[currentVote] = increment(-1);
      }
  
      // Increment the new vote type
      updates[voteType] = increment(1);
      updates[`voters.${user.uid}`] = voteType; // Update user vote in Firestore
  
      await updateDoc(eventRef, updates);
  
      setPopupMessage(`✅ You have voted for: ${voteType}`);
    }
  };
  
  

  return (
    <div className="bg-orange-50">
      <div className="p-5 md:px-52 lg:flex">
        {/* Calendar */}
        <div className="lg:w-3/5 w-full bg-white shadow-lg p-2 md:p-10 rounded-lg md:rounded-none">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">{currentDate.format("MMMM YYYY")}</span>
            <div>
              <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))} className="mr-3 text-gray-800 hover:text-gray-400">
                &#8249;
              </button>
              <button onClick={() => setCurrentDate(currentDate.add(1, "month"))} className="text-gray-800 hover:text-gray-400">
                &#8250;
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mt-5">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <div key={d} className="font-medium md:p-5 bg-[#eca427]">{d}</div>
            ))}
            {Array.from({ length: currentDate.startOf("month").day() }, (_, i) => (
              <div key={i}></div>
            ))}
            {Array.from({ length: currentDate.daysInMonth() }, (_, i) => i + 1).map((day) => {
              const dateKey = `${currentDate.format("YYYY-MM")}-${String(day).padStart(2, "0")}`;
              return (
                <div key={day} className="p-2 md:p-4 cursor-pointer border rounded hover:bg-gray-200" onClick={() => handleDateClick(day)}>
                  {day}
                  {events[dateKey] && <div className="mt-2 w-2 h-2 rounded-full bg-red-500"></div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events & Voting */}
        <div className="lg:w-2/5 w-full mt-5 lg:mt-0 bg-gray-50 p-5 rounded-lg md:rounded-none shadow-lg">
          <h3 className="font-medium">Events on {selectedDate}</h3>
          {selectedDate && events[selectedDate] ? (
 <ul className="mt-3">
 {events[selectedDate].map(({ id, event, yes = 0, voters = {} }) => {
   const userVote = voters[user?.uid]; // Check if the user has voted

   return (
     <li
       key={id}
       className={`text-gray-600 flex justify-between items-center p-3 rounded-md shadow-md transition duration-300 ${
         userVote === "yes" ? "bg-green-200" : userVote === "no" ? "bg-red-200" : "bg-white"
       }`}
     >
       <span>{event}</span>
       <div className="flex items-center">
         <span className="mr-2 text-sm font-semibold text-gray-800">{yes} votes</span>

         <button
           className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
           onClick={() => handleVote(id, event, "yes")}
         >
           Yes
         </button>

         <button
           className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
           onClick={() => handleVote(id, event, "no")}
         >
           No
         </button>
       </div>
     </li>
   );
 })}
</ul>

          ) : (
            <p className="text-gray-600 mt-2">No events scheduled.</p>
          )}
        </div>
      </div>

      {/* Vote Confirmation Popup */}
      {popupMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-lg font-bold">{popupMessage}</p>
            <button onClick={() => setPopupMessage(null)} className="mt-3 bg-gray-500 text-white px-4 py-2 rounded">
              OK
            </button>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold">Login Required</h3>
            <p className="text-gray-600 mt-2">You must log in to vote.</p>
            <button onClick={signInWithGoogle} className="mt-3 bg-green-500 text-white px-4 py-2 rounded">
              Login with Google
            </button>
            <button onClick={() => setShowLoginPopup(false)} className="ml-3 mt-3 bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
