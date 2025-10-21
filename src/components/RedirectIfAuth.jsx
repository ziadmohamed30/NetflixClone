import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../store/supabaseClient";

export default function RedirectIfAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Immediately invoked async function
    (async () => {
      const { data, error } = await supabase.auth.getSession();

      // If a valid session exists → redirect to /home
      if (!error && data?.session) {
        navigate("/home");
      }
    })();
  }, [navigate]);

  // ✅ Otherwise, show the normal children (like login or signup page)
  return <>{children}</>;
}
