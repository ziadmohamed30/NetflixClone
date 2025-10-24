import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { API_KEY } from "../store/api";
import { motion, AnimatePresence } from "framer-motion";
import noImg from "../assets/images/noImg.png";

export default function MediaDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // Save the original background when the modal first opens
  const originalBackgroundRef = useRef(location.state?.background || null);

  const isMovie = location.pathname.includes("/movie/");
  const mediaType = isMovie ? "movie" : "tv";
  const [media, setMedia] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&append_to_response=videos`
      )
      .then((res) => setMedia(res.data))
      .catch((err) => console.error("Error fetching media:", err));

    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${API_KEY}`
      )
      .then((res) => setSimilar(res.data.results))
      .catch((err) => console.error("Error fetching similar items:", err));
  }, [id, mediaType]);

  const handleClose = () => {
    const bg = originalBackgroundRef.current;
    if (bg && bg.pathname) {
      // Navigate explicitly to the original background

      navigate(bg.pathname);
    } else {
      // fallback to history back
      navigate(-1);
    }
  };

  if (!media) return null;

  const trailer = media.videos?.results.find((el) => el.type === "Trailer");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative bg-[#2D2D2D] rounded-2xl p-4 sm:p-6 md:p-8 w-[95%] sm:w-[90%] md:max-w-5xl text-white overflow-y-auto max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute cursor-pointer top-3 right-4 text-3xl text-gray-400 hover:text-red-500 focus:outline-none"
          >
            ×
          </button>

          {/* Main Info */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <img
              src={
                media.poster_path
                  ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
                  : noImg
              }
              alt={media.title || media.name}
              className="w-40 sm:w-52 md:w-64 lg:w-72 mx-auto md:mx-0 rounded-xl shadow-lg object-cover"
            />

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                {media.title || media.name}
              </h1>
              <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                {media.overview || "No description available."}
              </p>

              <div className="space-y-1 text-sm sm:text-base">
                <p>
                  <strong>Release Date:</strong>{" "}
                  {media.release_date || media.first_air_date || "N/A"}
                </p>
                <p>
                  <strong>Rating:</strong>{" "}
                  {media.vote_average
                    ? `${media.vote_average.toFixed(1)} ⭐`
                    : "N/A"}
                </p>
                <p>
                  <strong>Language:</strong>{" "}
                  {media.original_language?.toUpperCase() || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Trailer */}
          <div className="mt-6 sm:mt-8">
            {trailer ? (
              <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="text-center text-red-500 mt-4">
                No trailer available.
              </p>
            )}
          </div>

          {/* Similar Section */}
          {similar.length > 0 && (
            <div className="mt-8 sm:mt-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Similar {isMovie ? "Movies" : "TV Shows"}
              </h3>
              <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {similar.map((el) => (
                  <Link
                    key={el.id}
                   state={{ background: location.state?.background }}
                    to={`/${mediaType}/${el.id}`}
                    className="min-w-[90px] sm:min-w-[120px] md:min-w-[150px] cursor-pointer hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src={
                        el.poster_path
                          ? `https://image.tmdb.org/t/p/w200${el.poster_path}`
                          : noImg
                      }
                      alt={el.title || el.name}
                      className="rounded-lg mb-2 object-cover w-full h-[135px] sm:h-[160px] md:h-[200px]"
                    />
                    <p className="text-xs sm:text-sm text-center truncate">
                      {el.title || el.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
