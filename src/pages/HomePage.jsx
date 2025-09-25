import MovieRow from "../components/MovieRow";
import {
  getByGenre,
  getNowPlaying,
  getPopularTV,
  getTrending,
  getUpcoming,
} from "../store/api";

export default function HomePage() {
  return (
    <div className="p-4 flex flex-col gap-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Netflix Clone</h1>
      <MovieRow title={"Trending Now"} fetchFunc={getTrending} />
      <MovieRow title={"Now Playing in Theaters"} fetchFunc={getNowPlaying} />
      <MovieRow title={"Upcoming"} fetchFunc={getUpcoming} />

      <MovieRow title="Action" fetchFunc={() => getByGenre(28)} />
      <MovieRow title="Documentary" fetchFunc={() => getByGenre(99)} />
      <MovieRow title="War" fetchFunc={() => getByGenre(10752)} />
    </div>
  );
}
