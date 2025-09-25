import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noImg from "../assets/images/No_image_available.svg.png";

export default function MovieRow({ title, fetchFunc }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchFunc().then((res) => setMovies(res.data.results));
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex  overflow-x-scroll gap-4 pb-4">
        {movies.map((el) => (
          <Link to={`/movie/${el.id}`} key={el.id}>
            <div className="w-35">
              <img
                src={
                  el.poster_path
                    ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={el.title}
                className="rounded-xl hover:scale-105 transition "
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
