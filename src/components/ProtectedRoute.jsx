import { Navigate } from "react-router-dom";

// Checks if a user session exists in localStorage or sessionStorage
export default function ProtectedRoute({ children }) {
  const session =
    JSON.parse(localStorage.getItem("supabaseSession")) ||
    JSON.parse(sessionStorage.getItem("supabaseSession"));

  if (!session || !session.user) {
    // If no session, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If session exists, render the protected page
  return children;
}
