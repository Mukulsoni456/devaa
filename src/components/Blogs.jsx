import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig"; // Assuming firebase is properly configured
import { collection, getDocs } from "firebase/firestore";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from Firestore
  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts")); // Collection name is "posts"
      const blogData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((post) => post.type === "blog"); // Filter to only show blogs

      setBlogs(blogData);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <section className="py-16 md:py-28 px-8 bg-white text-center">
      <h2 className="text-4xl font-bold text-[#512B1C] mb-10">Blog Section</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="text-left">
              <img
                src={blog.imageUrl}  

                alt={blog.title}
                className="w-full h-56 object-cover rounded-lg shadow-md"
              />
              <h3 className="text-2xl font-bold text-[#A52A2A] mt-4">{blog.title}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {blog.date} {blog.category && `| ${blog.category}`}{" "}
                {blog.comments && `| ${blog.comments}`}
              </p>
              <p className="text-gray-600 mt-2">{blog.description}</p>
              <Link
                to={`/blog/${blog.id}`}
                className="text-red-500 font-semibold mt-2 inline-block"
              >
                read more
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No blogs available at the moment.</p>
        )}
      </div>
      {/* Read All Blogs Button */}
      <div className="mt-10">
        <a
          href="/blogs" // Update with the actual blog page URL
          className="bg-[#eca427] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition hover:bg-[#eca427]"
        >
          Read All Blogs
        </a>
      </div>
    </section>
  );
}
