import { useState } from "react";
import { db, collection, addDoc } from "../firebaseConfig";
import signupImage from "../assets/gallery2.jpg";

export default function VoluntarySignupSection() {
  const [volunteer, setVolunteer] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "volunteers"), volunteer);
      alert("Signup Successful! Thank you for volunteering.");
      setVolunteer({ fullName: "", email: "", phone: "" }); // Reset form
    } catch (error) {
      console.error("Error saving volunteer:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <section className="bg-[#FDF9F2] py-20 md:py-24 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Left - Image Section */}
        <div className="relative w-full md:w-1/2">
          <img src={signupImage} alt="Voluntary Signup" className="w-full rounded-lg shadow-lg" />
          <div className="absolute bottom-[-20px] right-[-20px] bg-[#eca427] text-[#512B1C] px-10 py-14 sm:px-20 sm:py-20 text-lg font-bold">
            JOIN THE MOVEMENT.
          </div>
        </div>

        {/* Right - Signup Form */}
        <div className="w-full md:w-1/2">
          <p className="text-lg text-gray-600">Join Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#512B1C]">BE A VOLUNTEER</h2>
          <p className="mt-4 text-gray-600">
            Become a part of our mission and make a difference. Sign up to volunteer and contribute to a better world.
          </p>
          
          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input 
              type="text" 
              name="fullName" 
              placeholder="Full Name" 
              className="w-full px-4 py-3 border rounded-lg"
              value={volunteer.fullName}
              onChange={handleChange}
              required
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              className="w-full px-4 py-3 border rounded-lg"
              value={volunteer.email}
              onChange={handleChange}
              required
            />
            <input 
              type="text" 
              name="phone" 
              placeholder="Phone Number" 
              className="w-full px-4 py-3 border rounded-lg"
              value={volunteer.phone}
              onChange={handleChange}
              required
            />
            <button type="submit" className="bg-[#eca427] text-white font-semibold px-6 py-3 rounded-lg">
              SIGN UP
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
