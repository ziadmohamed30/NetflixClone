import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../store/supabaseClient";

export default function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error && data?.session) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    })();
  }, []);

  if (authenticated === null) {
    // Optional: could show nothing instead of loading text
    return null;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
