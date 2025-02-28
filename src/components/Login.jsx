import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ For redirection
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function OTPLogin() {
  const [name, setName] = useState(""); // ✅ New field for Name
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  // ✅ Initialize reCAPTCHA when component mounts
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => console.log("reCAPTCHA verified ✅"),
        "expired-callback": () => setError("reCAPTCHA expired. Refresh and try again."),
      });
      window.recaptchaVerifier.render();
    }
  }, []);

  // ✅ Send OTP
  const handleSendOtp = async () => {
    setError("");

    if (name.trim() === "") {
      setError("Please enter your name.");
      return;
    }
    if (!phone.match(/^\+91\d{10}$/)) {
      setError("Enter a valid Indian number in +91 format.");
      return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
    } catch (error) {
      setError(error.message || "Failed to send OTP.");
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    setError("");
    try {
      if (!confirmationResult) {
        setError("No OTP request found. Please request OTP first.");
        return;
      }
      await confirmationResult.confirm(otp);
      setShowSuccessPopup(true); // ✅ Show custom success popup
      setTimeout(() => {
        navigate("/"); // ✅ Redirect to Home page
      }, 2000);
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center relative">
        <h2 className="text-2xl font-bold mb-4">Login with OTP</h2>
        {error && <p className="text-red-500">{error}</p>}

        <div id="recaptcha-container"></div> {/* ✅ Keep reCAPTCHA in DOM */}

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
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 p-2 border rounded w-full"
            />
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

      {/* ✅ Custom Success Popup */}
      {showSuccessPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2">✅ Login Successful!</h3>
            <p>Welcome, {name} 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
}
