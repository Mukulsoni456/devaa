import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-[#fee7c7] p-4">
      <div className="max-w-2xl mx-auto flex justify-center items-center">
        
        {/* Left Links */}
        <ul className="hidden md:flex space-x-6 text-black font-medium">
          <Link to="/" className="hover:text-orange-400">Home</Link>
          <Link to="/Gallery" className="hover:text-orange-400">Gallery</Link>
          <Link to="/about" className="hover:text-orange-400">About</Link>
        </ul>

        {/* Center Logo */}
        <div className="flex-grow flex justify-center">
          <h1 className="text-white text-2xl font-bold tracking-wide relative">

            <span className="absolute -top-6 left-[50%] -translate-x-[50%] text-black text-4xl">ॐ</span>
          </h1>
        </div>

        {/* Right Links */}
        <ul className="hidden md:flex space-x-6 text-black font-medium">
        <Link to="/blogs" className="hover:text-orange-400">Blogs</Link>

          <Link to="/donation" className="hover:text-orange-400">Donations</Link>
          <Link to="/contact" className="hover:text-orange-400">Contact Us</Link>

  
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black md:hidden focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 text-center text-black">
          <Link to="/" className="block hover:text-orange-400">Home</Link>
          <Link to="/features" className="block hover:text-orange-400">Features</Link>
          <Link to="/about" className="block hover:text-orange-400">About</Link>
          <Link to="/shop" className="block hover:text-orange-400">Shop</Link>
          <Link to="/events" className="block hover:text-orange-400">Events</Link>
          <Link to="/donations" className="block hover:text-orange-400">Donations</Link>
          <Link to="/news" className="block hover:text-orange-400">News</Link>
          <Link to="/contact" className="block hover:text-orange-400">Contacts</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
