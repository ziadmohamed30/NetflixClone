import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { API_KEY } from "../store/api";

export default function MediaDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // detect whether this is a movie or tv route
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
      .catch((err) => console.error("Error fetching data:", err));

    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${API_KEY}`
      )
      .then((res) => setSimilar(res.data.results))
      .catch((err) => console.error("Error fetching similar items:", err));
  }, [id, mediaType]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") navigate("/");
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [navigate]);

  if (!media) return <p className="p-8 text-white">Loading...</p>;

  const trailer = media.videos?.results.find((el) => el.type === "Trailer");

  return (
    <div
      className="p-6 md:p-12 text-white bg-black min-h-screen relative"
      onClick={() => navigate("/")}
    >
      {/* Close Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute cursor-pointer top-4 right-4 text-3xl text-white hover:text-red-500 transition"
      >
        ✖
      </button>

      <div
        className="max-w-6xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={
              media.poster_path
                ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={media.title || media.name}
            className="w-full md:w-72 rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {media.title || media.name}
            </h1>
            <p className="mb-6 text-gray-300">{media.overview}</p>

            <div className="space-y-2 text-gray-400">
              {media.release_date || media.first_air_date ? (
                <p>
                  <span className="font-bold text-white">Release Date:</span>{" "}
                  {media.release_date || media.first_air_date}
                </p>
              ) : null}
              <p>
                <span className="font-bold text-white">Rating:</span>{" "}
                {media.vote_average?.toFixed(1)} ⭐
              </p>
              <p>
                <span className="font-bold text-white">Language:</span>{" "}
                {media.original_language?.toUpperCase()}
              </p>
              <p>
                <span className="font-bold text-white">Popularity:</span>{" "}
                {media.popularity?.toFixed(0)}
              </p>
            </div>
          </div>
        </div>

        {/* Trailer Section */}
        <div className="mt-10">
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
            <h2 className="text-2xl md:text-3xl text-center font-bold text-red-500">
              Sorry, there is no trailer available.
            </h2>
          )}
        </div>

        {/* Similar Items */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">
              Similar {isMovie ? "Movies" : "TV Shows"}
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {similar.map((el) => (
                <div
                  key={el.id}
                  onClick={() => navigate(`/${mediaType}/${el.id}`)}
                  className="min-w-[150px] cursor-pointer hover:scale-105 transition"
                >
                  <img
                    src={
                      el.poster_path
                        ? `https://image.tmdb.org/t/p/w200${el.poster_path}`
                        : "https://via.placeholder.com/150x225?text=No+Image"
                    }
                    alt={el.title || el.name}
                    className="rounded-lg mb-2"
                  />
                  <p className="text-sm">{el.title || el.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
