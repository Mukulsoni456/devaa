import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false); // ✅ State for popup
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "admins", userCredential.user.uid), { email });
      setShowPopup(true); // ✅ Show popup on success
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Signup</h2>
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
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Signup</button>
      </form>

      {/* ✅ Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Signup Successful!</h3>
            <p className="text-gray-600">Your admin account has been created.</p>
            <button
              onClick={() => navigate("/admin-login")}
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
