import React, { useState } from "react";
import { useEffect } from "react";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { FaHome, FaImages, FaInfoCircle, FaNewspaper, FaHandsHelping, FaPhone, FaSignInAlt } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import BackNav from "./BackNav";



const Navbar = () => {
  const [active, setActive] = useState("home");


  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const navItems = [
    { name: "home", icon: <FaHome size={24} />, label: "Home", link: "/" },
    { name: "gallery", icon: <FaImages size={24} />, label: "Gallery", link: "/Gallery" },
    { name: "about", icon: <FaInfoCircle size={24} />, label: "About", link: "/about" },
    { name: "blogs", icon: <FaNewspaper size={24} />, label: "Blogs", link: "/blogs" },
    { name: "donation", icon: <FaHandsHelping size={24} />, label: "Donations", link: "/donation" },
    { name: "contact", icon: <FaPhone size={24} />, label: "Contact", link: "/contact" },
    { name: "login", icon: <FaSignInAlt size={24} />, label: "Login", link: "/login" },
  ];

  return (
    <>
      {/* 🔹 Top Navbar */}
      <nav className="bg-[#fee7c7] z-60 p-4 hidden md:flex justify-between items-center shadow-md">
      <div className="flex space-x-6 text-black font-medium">
        <Link to="/" className="hover:text-orange-400">Home</Link>
        <Link to="/Gallery" className="hover:text-orange-400">Gallery</Link>
        <Link to="/about" className="hover:text-orange-400">About</Link>
      </div>

      <div className="flex-grow flex justify-center">
        <h1 className="text-black text-4xl font-bold">ॐ</h1>
      </div>

      <div className="flex space-x-6 text-black font-medium">
        <Link to="/blogs" className="hover:text-orange-400">Blogs</Link>
        <Link to="/donation" className="hover:text-orange-400">Donations</Link>
        <Link to="/contact" className="hover:text-orange-400">Contact Us</Link>

        {user ? (
          <button onClick={handleLogout} className="hover:text-red-500">
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-orange-400">Login</Link>
        )}
      </div>
    </nav>

      {/* 🔹 Left Sidebar Navbar for Desktop */}
      <nav className="hidden md:flex flex-col fixed top-0 left-0  w-20  bg-opacity-95  pt-44 z-50">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className={`relative flex flex-col  items-center py-2 transition-all duration-300 ${
              active === item.name ? "text-[#B96D40]" : "text-gray-700"
            }`}
            onClick={() => setActive(item.name)}
          >
            <span className="text-xl bg-[#FFCF9C] p-3 rounded-full">{item.icon}</span>
            {active === item.name && (
              <span className="absolute left-16 bg-[#B96D40] text-xs text-white px-2 py-1 rounded-md shadow-md animate-fadeIn">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* 🔹 Bottom Navbar for Mobile */}
      <div>
        <BackNav />
        <nav className="bg-[#fee7c7] p-4 fixed bottom-0 left-1/2 -translate-x-1/2 w-full shadow-lg flex justify-around items-center md:hidden z-50">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className={`relative flex flex-col items-center p-2 transition-all duration-300 ${
                active === item.name ? "text-orange-400" : "text-gray-700"
              }`}
              onClick={() => setActive(item.name)}
            >
              <span className="text-lg">{item.icon}</span>
              {active === item.name && (
                <span className="absolute bottom-8 bg-orange-400 text-xs text-white px-2 py-1 rounded-md shadow-md animate-fadeIn">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;

// 🔹 Global CSS for Animations
// .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); }}

