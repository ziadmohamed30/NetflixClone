import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";
import SearchBar from "../components/SearchBar";
import {
  getByGenre,
  getNowPlaying,
  getTrending,
  getUpcoming,
} from "../store/api";

export default function HomePage() {
  return (
    <div className="p-4 flex flex-col gap-5">
      <SearchBar/>
      <Banner />
      <MovieRow title={"Trending Now"} fetchFunc={getTrending} />
      <MovieRow title={"Now Playing in Theaters"} fetchFunc={getNowPlaying} />
      <MovieRow title={"Upcoming"} fetchFunc={getUpcoming} />

      <MovieRow title="Action" fetchFunc={() => getByGenre(28)} />
      <MovieRow title="Documentary" fetchFunc={() => getByGenre(99)} />
      <MovieRow title="War" fetchFunc={() => getByGenre(10752)} />
    </div>
  );
}
