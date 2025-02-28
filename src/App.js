import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/navbar';
import BlogDetail from './components/BlogDetails';
import AdminSignup from './components/AdminSignup';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AnnouncementDetail from './components/AnnouncementDetail';
import AboutUs from './pages/AboutUs';
import ContactPage from './pages/ContactUs';
import GalleryPage from './pages/GalleryPage';
import DonationPage from './pages/DonationPage';
import Footer from './components/Footer';
import BlogPage from './pages/BlogPage';
import Login from './components/Login';
import LoginPopup from './components/LoginPopup'; // ✅ Import the new LoginPopup component

function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(true); // ✅ Show login popup on load

  return (
    <Router>
      <Navbar />

      {/* ✅ Login Popup */}
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}

      <Routes>
        <Route path='/' Component={Home} />
        <Route path="/blog/:id" Component={BlogDetail} />
        <Route path="/announcement/:id" Component={AnnouncementDetail} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/about" Component={AboutUs} />
        <Route path="/contact" Component={ContactPage} />
        <Route path="/gallery" Component={GalleryPage} />
        <Route path="/donation" Component={DonationPage} />
        <Route path="/blogs" Component={BlogPage} />
        <Route path="/login" Component={Login} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
