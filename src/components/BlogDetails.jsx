import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Ensure Firebase is configured
import { doc, getDoc } from "firebase/firestore";

export default function BlogDetail() {
  const { id } = useParams(); // Get the blog id from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog data based on the ID
  const fetchBlog = async () => {
    try {
      const docRef = doc(db, "posts", id); // Get document reference from Firestore
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBlog(docSnap.data()); // Set blog data in state
      } else {
        setError("Blog not found");
      }
    } catch (err) {
      setError("Error fetching blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog(); // Fetch blog on component mount
  }, [id]); // Re-fetch if the ID changes

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <h1 className="text-center text-red-500">{error}</h1>;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <img src={blog.imageUrl} alt={blog.title} className="w-full rounded-lg mb-6" />
      <p className="text-gray-500 text-sm mt-2">{blog.date}</p>
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-700 mt-4">{blog.content}</p>
    </section>
  );
}


