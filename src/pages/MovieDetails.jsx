import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_KEY } from "../store/api";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
      )
      .then((res) => setMovie(res.data))
      .catch((err) => console.error("Error fetching movie:", err));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
      )
      .then((res) => setSimilar(res.data.results))
      .catch((err) => console.error("Error fetching similar movies:", err));
  }, [id]);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
       navigate('/');
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  if (!movie) return <p className="p-8 text-white">Loading...</p>;

  const trailer = movie.videos?.results.find((el) => el.type === "Trailer");

  return (
    <div
      className="p-6 md:p-12 text-white bg-black min-h-screen relative"
      onClick={() => navigate("/")} // click anywhere → homepage
    >
      {/* Close Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 text-3xl text-white hover:text-red-500 transition"
      >
        ✖
      </button>

      <div
        className="max-w-6xl mx-auto"
        onClick={(e) => e.stopPropagation()} // stop bubbling
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-72 rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {movie.title}
            </h1>
            <p className="mb-6 text-gray-300">{movie.overview}</p>

            <div className="space-y-2 text-gray-400">
              <p>
                <span className="font-bold text-white">Release Date:</span>{" "}
                {movie.release_date}
              </p>
              <p>
                <span className="font-bold text-white">Rating:</span>{" "}
                {movie.vote_average} ⭐
              </p>
              <p>
                <span className="font-bold text-white">Language:</span>{" "}
                {movie.original_language.toUpperCase()}
              </p>
              <p>
                <span className="font-bold text-white">Popularity:</span>{" "}
                {movie.popularity.toFixed(0)}
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
              Sorry, there is no trailer available for this movie.
            </h2>
          )}
        </div>

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Similar Movies</h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {similar.map((el) => (
                <div
                  key={el.id}
                  onClick={() => navigate(`/movie/${el.id}`)}
                  className="min-w-[150px] cursor-pointer hover:scale-105 transition"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${el.poster_path}`}
                    alt={el.title}
                    className="rounded-lg mb-2"
                  />
                  <p className="text-sm">{el.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
