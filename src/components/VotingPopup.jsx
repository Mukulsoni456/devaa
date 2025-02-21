import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function VotePopup({ eventName, date, onClose }) {
  const [user] = useAuthState(auth);
  const [voted, setVoted] = useState(false);

  const handleVote = async (response) => {
    if (!user) {
      alert("You must be logged in to vote.");
      return;
    }

    const votesRef = collection(db, "votes");
    const q = query(votesRef, where("userId", "==", user.uid), where("date", "==", date));

    const existingVotes = await getDocs(q);
    if (!existingVotes.empty) {
      alert("You have already voted for this event.");
      return;
    }

    await addDoc(votesRef, {
      userId: user.uid,
      eventName,
      date,
      response,
      timestamp: new Date(),
    });

    setVoted(true);
    alert("Vote submitted!");
    onClose(); // Close popup after voting
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Vote for {eventName}</h2>
        <p className="mb-4">Are you joining this event?</p>
        <button
          onClick={() => handleVote("yes")}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          disabled={voted}
        >
          Yes
        </button>
        <button
          onClick={() => handleVote("no")}
          className="bg-red-500 text-white px-4 py-2 rounded"
          disabled={voted}
        >
          No
        </button>
        <button onClick={onClose} className="block mt-4 text-gray-600">
          Cancel
        </button>
      </div>
    </div>
  );
}
