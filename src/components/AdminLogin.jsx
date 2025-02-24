import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import Auth Context

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth(); // Get user state
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // State for popup

  useEffect(() => {
    if (user) {
      navigate("/admin-dashboard");
    }
  }, [user, navigate]); // Redirect after login

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowPopup(true); // Show popup on success
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
      </form>

      {/* ✅ Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Login Successful!</h3>
            <p className="text-gray-600">Redirecting to Admin Dashboard...</p>
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
