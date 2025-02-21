import { useState, useEffect } from "react";
import { db, storage } from "../firebaseConfig";
import { collection,setDoc, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where,onSnapshot  } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dayjs from "dayjs";

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [votes, setVotes] = useState({});

  // Blog/News States
  const [postType, setPostType] = useState("blog"); // blog or news
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf("month").day();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  //Manage post 
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [eventDate, setEventDate] = useState("");


  // Fetch events from Firebase
  const fetchEvents = async () => {
    const eventSnapshot = await getDocs(collection(db, "calendarEvents"));
    const eventData = {};
  
    eventSnapshot.forEach((doc) => {
      const { date, event, votes = 0 } = doc.data();
      if (!eventData[date]) eventData[date] = [];
      eventData[date].push({ id: doc.id, event, votes });
    });
  
    setEvents(eventData);
  };
  
  
  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "events"));
      let updatedEvents = {};
  
      snapshot.forEach((doc) => {
        const data = doc.data();
        const eventDate = data.date; 
        if (!updatedEvents[eventDate]) {
          updatedEvents[eventDate] = [];
        }
        updatedEvents[eventDate].push({ id: doc.id, event: data.name, votes: data.votes });
      });
  
      setEvents(updatedEvents); 
    };
  
    fetchEvents();
  }, []); 
  
  
  





  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const fetchedPosts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(fetchedPosts);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setDescription(post.description);
    setPostType(post.type); // Ensure the post type is set
    setImage(null);
    
    // If it's an event, set the eventDate state
    if (post.type === "event") {
      setEventDate(post.date || ""); // Set date if available
    } else {
      setEventDate(""); // Clear date for blogs
    }
  };
  

  const handleUpdatePost = async () => {
    if (!editingPost) return;
    let imageUrl = editingPost.imageUrl;
  
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }
  
    const updatedData = {
      title,
      description,
      imageUrl,
    };
  
    // If it's an event, update the date too
    if (postType === "event") {
      updatedData.date = eventDate;
    }
  
    await updateDoc(doc(db, "posts", editingPost.id), updatedData);
  
    setEditingPost(null);
    setTitle("");
    setDescription("");
    setImage(null);
    setEventDate(""); // Reset event date after editing
    fetchPosts();
  };
  

  const handleDeletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
    fetchPosts();
  };


  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const handleDateClick = (day) => {
    const dateKey = `${currentDate.format("YYYY-MM")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateKey);
    setEventText(""); // Reset event text when selecting a new date
    setEditingEvent(null); // Reset editing state
    setShowPopup(true); // Open popup when date is selected
  };

  const handleEditEvent = (eventId, currentEventText) => {
    setEditingEvent(eventId);
    setEventText(currentEventText);
    setShowPopup(true);
  };

  const handleDeleteEvent = async (eventId) => {
    await deleteDoc(doc(db, "calendarEvents", eventId));
    fetchEvents(); // Re-fetch after deletion
  };

  const handleAddOrEditEvent = async () => {
    if (!eventText.trim()) return;

    if (editingEvent) {
      // Edit existing event
      await updateDoc(doc(db, "calendarEvents", editingEvent), {
        event: eventText,
      });
    } else {
      // Add new event
      await addDoc(collection(db, "calendarEvents"), {
        date: selectedDate,
        event: eventText,
        votes: 0, // Default vote count
      });
    }

  
  

    setEventText("");
    setShowPopup(false);
    setEditingEvent(null);
    fetchEvents(); // Re-fetch after add or edit
  };

  // Function to handle voting




  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleTogglePostType = () => {
    setPostType((prev) => (prev === "blog" ? "event" : "blog"));
  };

  const handleSubmitPost = async () => {
    if (!title || !description || !image) return;
    setIsLoading(true);

    try {
      const imageUrl = await handleImageUpload(image);
      await addDoc(collection(db, "posts"), {
        title,
        description,
        imageUrl,
        type: postType,
        date: dayjs().format("YYYY-MM-DD"),
      });
      setTitle("");
      setDescription("");
      setImage(null);
      alert("Post successfully created!");
    } catch (error) {
      alert("Error creating post: " + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-orange-50">
      <div className="p-10 md:px-52 lg:flex">
        {/* Calendar - Large on Desktop, Full-width on Mobile */}
        <div className="lg:w-3/5 w-full bg-white shadow-lg p-10 rounded-lg md:rounded-none">
          <div className="flex items-center justify-between ">
            <span className="text-xl font-bold">{currentDate.format("MMMM YYYY")}</span>
            <div>
              <button onClick={handlePrevMonth} className="mr-3 text-gray-800 hover:text-gray-400">
                &#8249;
              </button>
              <button onClick={handleNextMonth} className="text-gray-800 hover:text-gray-400">
                &#8250;
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mt-5">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <div key={d} className="font-medium md:p-5 bg-[#eca427]">{d}</div>
            ))}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={i}></div>
            ))}
            {daysArray.map((day) => {
              const dateKey = `${currentDate.format("YYYY-MM")}-${String(day).padStart(2, "0")}`;
              return (
                <div
                  key={day}
                  className="p-2 md:p-4 cursor-pointer border rounded hover:bg-gray-200"
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                  {events[dateKey] && (
                    <div className="mt-2 w-2 h-2 rounded-full bg-red-500"></div> // Red dot
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events - On Right in Desktop, Below in Mobile */}
        <div className="lg:w-2/5 w-full mt-5 lg:mt-0 bg-gray-50 p-5 rounded-lg md:rounded-none shadow-lg">
          <h3 className="font-medium">Upcoming Events</h3>
          {selectedDate && events[selectedDate] ? (
            <ul className="mt-3">
              {events[selectedDate].map(({ id, event, votes }) => (
                <li key={id} className="text-gray-600 flex justify-between items-center mt-3 border-b pb-2">
                  <div>
                    <span>{event}</span>
                    <p className="text-sm text-gray-600">Votes: {votes}</p>

                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditEvent(id,event)} className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button onClick={() => handleDeleteEvent(id)} className="text-red-500 hover:text-red-700">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-2">No events scheduled for this date.</p>
          )}
        </div>
      </div>

      {/* Blog/Event Section */}
<div className="bg-orange-50">
  <div className="p-10 md:px-52 lg:flex">
    <div className="lg:w-3/5 w-full bg-white shadow-lg p-10 rounded-lg md:rounded-none">
      <h3 className="text-xl font-bold mb-4">Create New {postType === "blog" ? "Blog" : "Event"} Post</h3>
      <div className="flex items-center mb-4">
        <label className="mr-2">Select Post Type:</label>
        <button
          onClick={handleTogglePostType}
          className={`px-4 py-2 rounded ${postType === "blog" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Blog
        </button>
        <button
          onClick={handleTogglePostType}
          className={`ml-2 px-4 py-2 rounded ${postType === "event" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Event
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        rows="4"
      />

      {/* Event Date Input (Only for Events) */}
      {postType === "event" && (
        <input
          type="date"
          value={selectedDate || ""}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
      )}

      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-4" />
      <button onClick={handleSubmitPost} disabled={isLoading} className="px-6 py-2 bg-green-500 text-white rounded">
        {isLoading ? "Publishing..." : "Publish Post"}
      </button>
    </div>
  </div>
</div>

    {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">{editingEvent ? `Edit Event on ${selectedDate}` : `Add Event on ${selectedDate}`}</h3>
            <input
              type="text"
              placeholder="Enter event details"
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <div className="flex justify-end">
              <button onClick={() => setShowPopup(false)} className="mr-2 px-4 py-2 bg-gray-400 text-white">Cancel</button>
              <button onClick={handleAddOrEditEvent} className="px-4 py-2 bg-green-500 text-white">{editingEvent ? 'Save' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
       <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4 p-4 border rounded flex justify-between">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-gray-500">{post.description}</p>
                <p className="text-sm font-semibold text-blue-600">Type: {post.postType}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEditPost(post)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

{editingPost && (
  <div className="p-4 bg-gray-100 rounded">
    <h3 className="text-lg font-bold mb-2">Edit Post</h3>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full p-2 border rounded mb-2"
      placeholder="Title"
    />
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full p-2 border rounded mb-2"
      placeholder="Description"
    />
    <select
      value={postType}
      onChange={(e) => setPostType(e.target.value)}
      className="w-full p-2 border rounded mb-2"
    >
      <option value="blog">Blog</option>
      <option value="event">Event</option>
    </select>

    {/* Show Date Picker only if it's an event */}
    {postType === "event" && (
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
    )}

    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
    <div className="mt-2">
      <button
        onClick={handleUpdatePost}
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
      >
        Save
      </button>
      <button
        onClick={() => setEditingPost(null)}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
)}

    </div>
    </div>
    

  );
}



