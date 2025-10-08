import Banner from "../components/Banner";
import MediaRow from "../components/MediaRow";
import Navbar from "../components/NavBar";
import {
  getByGenre,
  getNowPlaying,
  getTrending,
  getUpcoming,
} from "../store/api";

export default function MoviesPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Banner */}
      <div className="pt-16 md:pt-20">
        <Banner />
      </div>

      {/* Content Wrapper */}
      <main className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 space-y-10">
        <MediaRow
          title="Trending Movies This Week"
          fetchFunc={getTrending}
          type="movie"
        />

        <MediaRow
          title="Now Playing in Theaters"
          fetchFunc={getNowPlaying}
          type="movie"
        />

        <MediaRow
          title="Upcoming Releases"
          fetchFunc={getUpcoming}
          type="movie"
        />

        <MediaRow
          title="Action"
          fetchFunc={() => getByGenre(28)}
          type="movie"
        />
        <MediaRow
          title="Family Movies"
          fetchFunc={() => getByGenre(10751)}
          type="movie"
        />
        <MediaRow
          title="Horror"
          fetchFunc={() => getByGenre(27)}
          type="movie"
        />
        <MediaRow
          title="Science Fiction"
          fetchFunc={() => getByGenre(878)}
          type="movie"
        />
        <MediaRow
          title="War"
          fetchFunc={() => getByGenre(10752)}
          type="movie"
        />

        <MediaRow
          title="Documentary"
          fetchFunc={() => getByGenre(99)}
          type="movie"
        />
      </main>
    </div>
  );
}
