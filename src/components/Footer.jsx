import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebaseConfig";

export default function Footer() {
    const [user] = useAuthState(auth); // Get the logged-in user
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#eca427] mb-2">About Us</h3>
          <div className="w-10 h-10 mb-3">
            <img src="/logo.png" alt="Logo" />
          </div>
          <p className="text-sm text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        {/* Information Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#eca427] mb-2">Information</h3>

      <div className=" space-x-6 mb-6">
        {!user ? (
          <>
            <Link to="/admin-login" className="text-gray-400 hover:text-white">
              Admin Login
            </Link>
            <Link to="/admin-signup" className="text-gray-400 hover:text-white">
              Admin Signup
            </Link>
          </>
        ) : (
          <button 
            onClick={logout} 
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
        </div>

        {/* Helpful Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#eca427] mb-2">Helpful</h3>
          <p className="text-sm text-gray-400">📞 +1 (817) *** 3377</p>
          <p className="text-sm text-gray-400">📧 info@example.com</p>
          <div className="flex space-x-3 mt-4">
            <a href="#" className="bg-blue-600 p-2 rounded-full"><FaFacebookF /></a>
            <a href="#" className="bg-sky-500 p-2 rounded-full"><FaTwitter /></a>
            <a href="#" className="bg-pink-600 p-2 rounded-full"><FaInstagram /></a>
            <a href="#" className="bg-blue-700 p-2 rounded-full"><FaLinkedin /></a>
          </div>
        </div>

        {/* Subscribe Section */}
        <div>
          <h3 className="text-lg font-semibold text-[#eca427] mb-2">
            Get the best viral stories straight into your inbox!
          </h3>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 text-black rounded-md"
          />
          <button className="w-full bg-[#eca427] text-white py-3 mt-3 rounded-md">
            Subscribe
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-6">
        Copyright © 2025 prayer-wordpress | Powered by prayer-wordpress
      </div>
    </footer>
  );
}



