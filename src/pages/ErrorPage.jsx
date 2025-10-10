import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm"
        style={{
          backgroundImage:
            "url(https://image.tmdb.org/t/p/original/9dTO2RygcDT0cQkawABw4QkDegN.jpg)",
        }}
      ></div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* 404 Number */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-8xl sm:text-9xl md:text-[12rem] font-extrabold text-red-600 tracking-widest drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl"
        >
          Lost your way ?
        </motion.p>

        {/* Subtext */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-sm sm:text-base text-gray-400"
        >
          The page you’re looking for doesn’t exist or has been removed.
        </motion.p>

        {/* Back Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="px-6 py-3 cursor-pointer bg-red-600 hover:bg-red-700 rounded-full font-semibold text-white shadow-lg transition"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
