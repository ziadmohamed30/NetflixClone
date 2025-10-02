import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const SignupSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password required"),
  });
  return (
    <div className="relative flex flex-col min-h-screen text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/6d0f6a5b-9c69-4dd3-bfd3-8857a3b84564/0fbc6b2b-3e02-4a60-a5cf-418eb2ae95b7/EG-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg')",
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Header with Logo + Top Right Toggle */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 tracking-wide">
          MyFlix
        </h1>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-2 rounded font-bold text-white transition"
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </button>
      </div>

      {/* Center Auth Box */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="bg-black/80 p-8 rounded-lg w-full max-w-md shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {isLogin ? "Sign In" : "Get Started"}
          </h1>

          <Formik
            initialValues={{ username: "", email: "", password: "", isLogin }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                {/* Username only for Sign Up */}
                {!isLogin && (
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
                )}

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
                  disabled={isSubmitting}
                  className="bg-red-600 cursor-pointer hover:bg-red-700 py-3 rounded font-bold transition"
                >
                  {isLogin ? "Sign In" : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Bottom Helper Text */}
          <p className="text-gray-400 mt-6 text-center">
            {isLogin ? "New to MyFlix?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-white cursor-pointer font-semibold hover:underline"
            >
              {isLogin ? "Sign up now" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
