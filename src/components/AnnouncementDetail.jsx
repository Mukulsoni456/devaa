import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Ensure Firebase is configured
import { doc, getDoc } from "firebase/firestore";

export default function AnnouncementDetail() {
  const { id } = useParams(); // Get the announcement ID from the URL
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch announcement data based on the ID
  const fetchAnnouncement = async () => {
    try {
      const docRef = doc(db, "posts", id); // Get document reference from Firestore
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAnnouncement(docSnap.data()); // Set announcement data in state
      } else {
        setError("Announcement not found");
      }
    } catch (err) {
      setError("Error fetching announcement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncement(); // Fetch announcement on component mount
  }, [id]); // Re-fetch if the ID changes

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <h1 className="text-center text-red-500">{error}</h1>;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <img src={announcement.imageUrl} alt={announcement.title} className="w-full rounded-lg mb-6" />
      <h1 className="text-3xl font-bold text-[#512B1C]">{announcement.title}</h1>
      <p className="text-gray-500 text-sm mt-2">{announcement.date}</p>
      <p className="text-gray-700 mt-4">{announcement.description}</p>
    </section>
  );
}
