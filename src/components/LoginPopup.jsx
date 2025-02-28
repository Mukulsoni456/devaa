import { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Ensure correct Firebase config import

export default function LoginPopup({ onClose }) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");

  // ✅ Initialize reCAPTCHA when component mounts
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA verified ✅");
        },
        "expired-callback": () => {
          setError("reCAPTCHA expired. Please refresh and try again.");
        },
      });

      window.recaptchaVerifier.render();
    }
  }, []);

  // ✅ Send OTP and move to OTP input screen
  const handleSendOtp = async () => {
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!phone.match(/^\+91\d{10}$/)) {
      setError("Enter a valid Indian number in +91 format.");
      return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        setError("reCAPTCHA not initialized. Refresh and try again.");
        return;
      }

      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
    } catch (error) {
      setError(error.message || "Failed to send OTP. Try again.");
    }
  };

  // ✅ Verify OTP and log in
  const handleVerifyOtp = async () => {
    setError("");
    try {
      if (!confirmationResult) {
        setError("No OTP request found. Please request OTP first.");
        return;
      }

      await confirmationResult.confirm(otp);
      alert(`Welcome, ${name}! ✅ Login Successful.`);
      onClose(); // Close the popup after login
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center relative w-96 z-50">
        <h2 className="text-xl font-semibold mb-4"> Login with Mobile</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div id="recaptcha-container"></div> {/* ✅ Always in DOM */}

        {!confirmationResult ? (
          <>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Enter Phone Number (+91XXXXXXXXXX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
            />
            <button onClick={handleSendOtp} className="bg-orange-400 text-white px-4 py-2 rounded w-full">
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
            />
            <button onClick={handleVerifyOtp} className="bg-orange-400 text-white px-4 py-2 rounded w-full">
              Verify OTP
            </button>
          </>
        )}

        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 text-lg">✖</button>
      </div>
    </div>
  );
}
