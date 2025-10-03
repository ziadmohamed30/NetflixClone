import { useNavigate } from "react-router-dom";
import { domain } from "../store";
import axios from "axios";
import toast from "react-hot-toast";

export default function useAuth() {
  const navigate = useNavigate();

  const checkToken = () => {
    let token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get(domain + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
        params: { populate: "*" },
      })
      .catch(() => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
      });
  };

  const redirectIfLoggedIn = () => {
    let token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  };

  const login = (values) => {
    axios
      .post(domain + "/api/auth/local", {
        identifier: values.email,
        password: values.password,
      })
      .then((res) => {
        let token = res.data.jwt;
        if (values.rememberIndex) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
        navigate("/home");
      })
      .catch(() => {
        toast.error("Invalid Email or Password");
      });
  };
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return { checkToken, redirectIfLoggedIn, login, logout };
}
