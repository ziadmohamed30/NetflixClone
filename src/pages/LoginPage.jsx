import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { redirectIfLoggedIn, login } = useAuth();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password required"),
  });

  //   const handleLogin = (values) => {
  //     axios
  //       .post(domain + "/api/auth/local", {
  //         identifier: values.email,
  //         password: values.password,
  //       })
  //       .then((res) => {
  //         let token = res.data.jwt;
  //         axios
  //           .get(domain + "/api/users/me", {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //             params: {
  //               populate: "*",
  //             },
  //           })
  //           .then((res) => {
  //             if (values.rememberIndex) {
  //               localStorage.setItem("token", token);
  //             } else {
  //               sessionStorage.setItem("token", token);
  //             }
  //             navigate("/home");
  //           });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Invalid Email or Password");
  //       });
  //   };
  useEffect(() => {
    redirectIfLoggedIn();
  }, []);

  return (
    <div
      className="relative flex flex-col min-h-screen bg-black text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-4xl font-extrabold text-red-600">MyFlix</h1>
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 cursor-pointer px-4 py-2 rounded font-bold transition"
        >
          Sign Up
        </Link>
      </div>

      {/* Center Auth Box */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="bg-black/80  p-8 rounded-lg w-full max-w-md shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>

          <Formik
            initialValues={{ email: "", password: "", rememberIndex: true }}
            validationSchema={LoginSchema}
            onSubmit={login}
          >
            <Form className="flex flex-col gap-4">
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
                <label className="pl-2 mt-2">
                  <Field type="checkbox" name="rememberIndex" /> Remember me?
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-red-600 cursor-pointer hover:bg-red-700 py-3 rounded font-bold transition"
              >
                Sign In
              </button>
            </Form>
          </Formik>

          {/* Switch to Register */}
          <p className="text-gray-400 mt-6 text-center">
            New to MyFlix?{" "}
            <Link to="/" className="text-white hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
