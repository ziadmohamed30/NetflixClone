import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../store/supabaseClient";

export default function RedirectIfAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const session =
        JSON.parse(localStorage.getItem("supabaseSession")) ||
        JSON.parse(sessionStorage.getItem("supabaseSession"));

      if (session) {
        navigate("/home"); // redirect if already logged in
      }
    };

    checkSession();
  }, [navigate]);

  return <>{children}</>;
}
