import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ For automatic redirection
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Ensure correct Firebase config import

export default function OTPLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Use for redirection

  // ✅ Initialize reCAPTCHA properly when component mounts
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

  // ✅ Send OTP and automatically move to OTP input
  const handleSendOtp = async () => {
    setError("");

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
      alert("OTP sent! ✅ Check your phone.");
    } catch (error) {
      setError(error.message || "Failed to send OTP. Check internet connection.");
    }
  };

  // ✅ Verify OTP and automatically redirect to home page
  const handleVerifyOtp = async () => {
    setError("");
    try {
      if (!confirmationResult) {
        setError("No OTP request found. Please request OTP first.");
        return;
      }
      await confirmationResult.confirm(otp);
      alert("OTP Verified! ✅ Login Successful.");
      navigate("/home"); // ✅ Redirect to Home page after successful login
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Login with OTP</h2>
        {error && <p className="text-red-500">{error}</p>}

        <div id="recaptcha-container"></div> {/* ✅ Always in DOM */}

        {confirmationResult ? (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
            />
            <button onClick={handleVerifyOtp} className="bg-green-500 text-white px-4 py-2 rounded w-full">
              Verify OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter Phone Number (+91XXXXXXXXXX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
            />
            <button onClick={handleSendOtp} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Send OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
