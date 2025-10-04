import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { supabase } from "../store/supabaseClient"; // your Supabase client

export default function RegisterPage() {
  const navigate = useNavigate();
  const { redirectIfLoggedIn } = useAuth();

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Username required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password required"),
  });

  const handleRegister = async (values) => {
    try {
      // Create user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      // Optionally, update user metadata with username
      await supabase.auth.updateUser({
        data: { username: values.username },
      });

      // Store session in sessionStorage by default
      sessionStorage.setItem("supabaseSession", JSON.stringify(data.session));

      toast.success("Your account is ready to go");
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Registration failed");
    }
  };

  

  return (
    <div
      className="relative flex flex-col min-h-screen bg-black text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/movie-poster-background-samvvhyda6ylvmkw.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-4xl font-extrabold text-red-600">MyFlix</h1>
        <Link
          to="/login"
          className="bg-red-600 hover:bg-red-700 cursor-pointer px-4 py-2 rounded font-bold transition"
        >
          Sign In
        </Link>
      </div>

      {/* Center Auth Box */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="bg-black/80 p-8 rounded-lg w-full max-w-md shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            <Form className="flex flex-col gap-4">
              {/* Username */}
              <div>
                <Field
                  name="username"
                  placeholder="Username"
                  className="w-full p-3 rounded bg-gray-800 text-white focus:ring-2 focus:ring-red-600"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded bg-gray-800 text-white focus:ring-2 focus:ring-red-600"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded bg-gray-800 text-white focus:ring-2 focus:ring-red-600"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-red-600 cursor-pointer hover:bg-red-700 py-3 rounded font-bold transition"
              >
                Sign Up
              </button>
            </Form>
          </Formik>

          {/* Switch to Login */}
          <p className="text-gray-400 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
