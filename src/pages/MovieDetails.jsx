import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../store/api";

export default function MovieDetails() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&append_to_response=videos`
      )
      .then((res) => setMovie(res.data));
  }, []);
  if (!movie) return <p>Loading...</p>;
  const trailer = movie.videos.results.find((el) => el.type === "Trailer");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="mb-4">{movie.overview}</p>
      {trailer ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <h1 className="text-4xl text-black text-center font-bold">Sorry, There is no Trailer for this Movie</h1>
      )}
    </div>
  );
}
