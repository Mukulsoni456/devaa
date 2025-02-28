import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaImages, FaInfoCircle, FaNewspaper, FaHandsHelping, FaPhone, FaSignInAlt } from "react-icons/fa";
import { auth } from "../firebaseConfig";
import "tailwindcss/tailwind.css";
import BackNav from "./BackNav";

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");

  // Detect active link based on the current URL
  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();
    const matchingNavItem = navItems.find((item) => item.link.toLowerCase() === currentPath);
    if (matchingNavItem) {
      setActive(matchingNavItem.name);
    }
  }, [location]);

  const [user, setUser] = useState(null);
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

  ];

  return (
    <>
      {/* 🔹 Top Navbar */}
      <nav className="bg-[#fee7c7] z-60 p-4 hidden md:flex justify-between items-center shadow-md">
        <div className="flex space-x-6 text-black font-medium">
          {navItems.slice(0, 6).map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className={`hover:text-orange-400 ${
                active === item.name ? "text-orange-500 font-bold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex-grow flex justify-center">
          <h1 className="text-black text-4xl font-bold">ॐ</h1>
        </div>

        <div className="flex space-x-6 text-black font-medium">
          {user ? (
            <button onClick={handleLogout} className="hover:text-red-500">
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`hover:text-orange-400 ${
                active === "login" ? "text-orange-500 font-bold" : ""
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* 🔹 Left Sidebar Navbar */}
      <nav className="hidden md:flex flex-col fixed bottom-10 left-0 w-20 bg-opacity-95 z-50">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className={`flex flex-col items-center py-1 transition-all duration-300 ${
              active === item.name ? "text-[#B96D40]" : "text-gray-700"
            }`}
          >
            <span
              className={`text-2xl p-3 rounded-full transition-all ${
                active === item.name ? "bg-[#B96D40] text-white" : "bg-[#FFCF9C] text-black"
              }`}
            >
              {item.icon}
            </span>
            <span className="text-xs mt-2">{item.label}</span>
          </Link>
        ))}


{user ? (
  
                  <div onClick={handleLogout}
                  className={`flex flex-col items-center py-1 transition-all duration-300 ${
                    active === "login" ? "text-[#B96D40]" : "text-gray-700"
                  }`}
                >
                  <span
                    className={`text-2xl p-3 rounded-full transition-all ${
                      active === "login" ? "bg-[#B96D40] text-white" : "bg-[#FFCF9C] text-black"
                    }`}
                  >
      <FaSignInAlt></FaSignInAlt>
                  </span>
                  <span className="text-xs mt-2">Logout</span>
                </div>
          ) : (
            <Link to="/login"
            className={`flex flex-col items-center py-1 transition-all duration-300 ${
              active === "login" ? "text-[#B96D40]" : "text-gray-700"
            }`}
          >
            <span
              className={`text-2xl p-3 rounded-full transition-all ${
                active === "login" ? "bg-[#B96D40] text-white" : "bg-[#FFCF9C] text-black"
              }`}
            >
      <FaSignInAlt></FaSignInAlt>
            </span>
            <span className="text-xs mt-2">login</span>
          </Link>
          )}



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
