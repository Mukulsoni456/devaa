import React, { useState } from "react";
import { db } from "../firebaseConfig"; // Ensure Firebase is configured in firebase.js
import { collection, addDoc } from "firebase/firestore";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('/your-image-url.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Get in Touch</h1>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input className="w-full border p-2 mb-2" type="text" name="name" placeholder="Enter your Name" value={formData.name} onChange={handleChange} required />
            <input className="w-full border p-2 mb-2" type="email" name="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} required />
            <input className="w-full border p-2 mb-2" type="text" name="phone" placeholder="Enter your Mobile No." value={formData.phone} onChange={handleChange} required />
            <textarea className="w-full border p-2 mb-2" name="message" placeholder="Enter your message" value={formData.message} onChange={handleChange} required></textarea>
            <button className="bg-orange-500 text-white px-4 py-2 w-full">Send Message</button>
          </form>
        </div>
      </div>

      {/* Address & Map */}
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="font-semibold">Address</h3>
            <p>NH 234 Public Square, San Francisco 65368</p>
            <h3 className="font-semibold mt-4">Contact Details</h3>
            <p>(480) 555-0103</p>
            <p>finsweet@example.com</p>
          </div>
          <div className="w-full h-64 mt-6 md:mt-0">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.642516946208!2d75.8186960754394!3d26.911333276648037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6b05fd8ce55%3A0x2e0721e8ce709d1e!2sSHIV%20SATSANG%20BHAWAN!5e1!3m2!1sen!2sin!4v1739989351310!5m2!1sen!2sin "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;