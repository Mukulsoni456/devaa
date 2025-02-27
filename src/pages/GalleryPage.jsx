import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function ImageGrid() {
  const [media, setMedia] = useState([]);
  const [filter, setFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const mediaCollection = await getDocs(collection(db, "eventMedia"));
      const mediaList = mediaCollection.docs.map(doc => doc.data());
      setMedia(mediaList);
    };
    fetchMedia();
  }, []);

  const filteredMedia = media.filter(item => 
    (filter === "all" || item.fileType === filter) &&
    (eventFilter === "" || item.eventName.toLowerCase().includes(eventFilter.toLowerCase())) &&
    (dateFilter === "" || item.eventDate === dateFilter)
  );

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/your-image-url.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Our Prayer Gallery</h1>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto flex flex-wrap justify-center space-x-4 py-6  ">
        <button onClick={() => setFilter("all")} className={`px-4 py-2 ${filter === "all" ? "bg-orange-500 text-white" : "bg-gray-300"}`}>All</button>
        <button onClick={() => setFilter("image")} className={`px-4 py-2 ${filter === "image" ? "bg-orange-500 text-white" : "bg-gray-300"}`}>Images</button>
        <button onClick={() => setFilter("video")} className={`px-4 py-2 ${filter === "video" ? "bg-orange-500 text-white" : "bg-gray-300"}`}>Videos</button>
        <button onClick={() => setFilter("pdf")} className={`px-4 py-2 ${filter === "pdf" ? "bg-orange-500 text-white" : "bg-gray-300"}`}>PDFs</button>
        <div className="py-5 md:py-0">
        <input 
          type="text" 
          placeholder="Filter by Event Name" 
          value={eventFilter} 
          onChange={(e) => setEventFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        <input 
          type="date" 
          value={dateFilter} 
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredMedia.map((item, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            onClick={() => setSelectedMedia(item.fileURL)}
          >
            {item.fileType === "image" && <img src={item.fileURL} alt="Gallery Item" className="w-full h-96 object-cover" />}
            {item.fileType === "video" && (
              <video controls className="w-full h-96 object-cover">
                <source src={item.fileURL} type="video/mp4" />
              </video>
            )}
            {item.fileType === "pdf" && (
              <a href={item.fileURL} target="_blank" rel="noopener noreferrer" className="block bg-gray-200 p-4 text-center">
                View PDF
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Media Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setSelectedMedia(null)}
          >
            &times;
          </button>
          <img src={selectedMedia} className="max-w-full max-h-full" alt="Selected Media" />
        </div>
      )}
    </div>
  );
}