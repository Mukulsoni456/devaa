import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="flex justify-center space-x-6 mb-6">
        <Link to="/admin-login" className="text-gray-400 hover:text-white">
          Admin Login
        </Link>
        <Link to="/admin-signup" className="text-gray-400 hover:text-white">
          Admin Signup
        </Link>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-6">
        Copyright © 2025 prayer-wordpress | Powered by prayer-wordpress
      </div>
    </footer>
  );
}
