import { useEffect, useState } from "react";
import { API_KEY } from "../store/api";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Banner({ fetchFunc, type }) {
  const [banner, setBanner] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [similar, setSimilar] = useState([]);

  async function loadDetails(id, mediaType) {
    const finalType =
      mediaType !== "all" ? mediaType : banner?.media_type || "movie";
    const res = await axios.get(
      `https://api.themoviedb.org/3/${finalType}/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
    const newBannerData = { ...res.data, media_type: finalType };
    setBanner(newBannerData);

    const similarRes = await axios.get(
      `https://api.themoviedb.org/3/${finalType}/${id}/similar?api_key=${API_KEY}`
    );
    setSimilar(similarRes.data.results);
  }

  useEffect(() => {
    fetchFunc().then((res) => {
      const results = res.data.results;
      setBanner(results[Math.floor(Math.random() * results.length)]);
    });
  }, []);

  useEffect(() => {
    if (showTrailer && banner) {
      const mediaType = banner.media_type;
      axios
        .get(
          `https://api.themoviedb.org/3/${mediaType}/${banner.id}/videos?api_key=${API_KEY}`
        )
        .then((res) => {
          const trailer = res.data.results.find((el) => el.type === "Trailer");
          setTrailerKey(trailer ? trailer.key : null);
        });
    }
  }, [showTrailer, banner]);

  useEffect(() => {
    if (showInfo && banner) {
      const mediaType = banner.media_type;
      axios
        .get(
          `https://api.themoviedb.org/3/${mediaType}/${banner.id}/similar?api_key=${API_KEY}`
        )
        .then((res) => setSimilar(res.data.results || []));
    }
  }, [showInfo, banner]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowTrailer(false);
        setShowInfo(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  if (!banner) return null;
  const title = banner.title || banner.name;

  return (
    <div
      className="relative mt-16 h-[70vh] text-white flex items-end p-8 bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${banner.backdrop_path})`,
      }}
    >
      <div className="bg-gradient-to-t from-black/80 absolute inset-0"></div>

      <div className="relative z-10 max-w-xl">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        <div className="flex gap-4">
          {/* ▶ Play Button */}
          <button
            onClick={() => setShowTrailer(true)}
            className="btn btn-success cursor-pointer text-black px-4 py-2 rounded font-bold hover:bg-green transition"
          >
            ▶ Play
          </button>

          {/* Trailer Modal */}
          <AnimatePresence>
            {showTrailer && (
              <motion.div
                className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                onClick={() => setShowTrailer(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="relative w-[90vw] max-w-4xl aspect-video"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {trailerKey ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title="Trailer"
                      frameBorder="0"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                    ></iframe>
                  ) : (
                    <p className="text-white text-2xl">Trailer loading...</p>
                  )}
                  <button
                    onClick={() => setShowTrailer(false)}
                    className="absolute -top-10 right-0 text-white text-3xl font-bold"
                  >
                    ✖
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ℹ More Info Button */}
          <button
            onClick={() => setShowInfo(true)}
            className="text-white btn bg-black btn-soft border-b-neutral-950 cursor-pointer px-4 py-2 rounded font-bold hover:transition"
          >
            ℹ More Info
          </button>

          {/* Info Modal */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                className="fixed top-16 left-0 right-0 bottom-0 bg-black/90 flex items-start justify-center z-40 p-4 md:p-8 overflow-y-auto"
                onClick={() => setShowInfo(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-gray-900 text-white rounded-lg max-w-4xl w-full relative p-6"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => setShowInfo(false)}
                    className="absolute top-2 right-2 cursor-pointer text-white text-2xl hover:text-red-500 transition"
                  >
                    X
                  </button>

                  {/* Poster + Details */}
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${banner.poster_path}`}
                      alt={title}
                      className="w-full    md:w-48 rounded-lg shadow-lg"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        {title}
                      </h2>
                      <p className="mb-4 text-sm md:text-base">
                        {banner.overview || "No description available."}
                      </p>
                      <p className="mb-2 text-sm md:text-base">
                        <strong>Release Date:</strong> {banner.release_date}
                      </p>
                      <p className="mb-2 text-sm md:text-base">
                        <strong>Rating:</strong> {banner.vote_average} ⭐
                      </p>
                      <p className="mb-2 text-sm md:text-base">
                        <strong>Language:</strong>{" "}
                        {banner.original_language.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Similar Movies */}
                  {similar.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-xl font-bold mb-3">
                        Similar{" "}
                        {banner.media_type === "tv" ? "TV Shows" : "Movies"}
                      </h3>

                      <div className="flex gap-4 overflow-x-auto pb-4">
                        {similar.map((el) => (
                          <div
                            onClick={() => loadDetails(el.id, type)}
                            key={el.id}
                            className="min-w-[120px] md:min-w-[150px] cursor-pointer"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w200${el.poster_path}`}
                              alt={el.title || el.name}
                              className="rounded-lg mb-2 hover:scale-105 transition"
                            />
                            <p>{el.title || el.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
