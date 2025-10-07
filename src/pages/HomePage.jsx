import Banner from "../components/Banner";
import MediaRow from "../components/MediaRow";
import Navbar from "../components/NavBar";

import {
  getByGenre,
  getNowPlaying,
  getPopularTV,
  getTrending,
  getUpcoming,
} from "../store/api";

export default function HomePage() {
  return (
    <div className="p-4 flex flex-col gap-5 text-white">
      <Navbar />
      <Banner />

      <MediaRow title={"Trending Now"} fetchFunc={getTrending} type={"movie"} />
      <MediaRow title={"Popular TV"} fetchFunc={getPopularTV} type={"tv"} />
      <MediaRow
        title={"Now Playing in Theaters"}
        fetchFunc={getNowPlaying}
        type={"movie"}
      />
      <MediaRow title={"Upcoming"} fetchFunc={getUpcoming} type={"movie"} />

      <MediaRow
        title={"Action"}
        fetchFunc={() => getByGenre(28)}
        type={"movie"}
      />
      <MediaRow
        title={"Documentary"}
        fetchFunc={() => getByGenre(99)}
        type={"movie"}
      />
      <MediaRow
        title={"War"}
        fetchFunc={() => getByGenre(10752)}
        type={"movie"}
      />
    </div>
  );
}
