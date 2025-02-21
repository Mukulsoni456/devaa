import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle, logout } from "../firebaseConfig";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  // Redirect to home only if the user is authenticated
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home after login
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <p className="mb-4 text-gray-600">Sign in with Google to continue</p>

        {loading ? (
          <p className="text-gray-700">Loading...</p> // Prevent flickering
        ) : user ? (
          <>
            <p className="text-gray-800">Welcome, {user.displayName}!</p>
            <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <button onClick={signInWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
