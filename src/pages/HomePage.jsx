import Banner from "../components/Banner";
import MediaRow from "../components/MediaRow";
import Navbar from "../components/NavBar";

import {
  getByGenre,
  getNowPlaying,
  getPopularTV,
  getTrendingAll,
  getUpcoming,
} from "../store/api";

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main content wrapper */}
      <main className="pt-24 flex flex-col gap-12">
        {/* Banner full width */}
        <section className="w-full">
          <Banner type={'all'} fetchFunc={getTrendingAll} />
        </section>

        {/* Media Rows with padding */}
        <section className="px-4 md:px-8 lg:px-16 flex flex-col gap-10">
          <MediaRow title="Trending Now" fetchFunc={getTrendingAll} />
          <MediaRow title="Popular TV" fetchFunc={getPopularTV} type="tv" />
          <MediaRow
            title="Now Playing in Theaters"
            fetchFunc={getNowPlaying}
            type="movie"
          />
          <MediaRow title="Coming Soon to Theaters" fetchFunc={getUpcoming} type="movie" />

          <MediaRow title="Action" fetchFunc={() => getByGenre(28)} type="movie" />
          <MediaRow
            title="Documentary"
            fetchFunc={() => getByGenre(99)}
            type="movie"
          />
          <MediaRow
            title="War"
            fetchFunc={() => getByGenre(10752)}
            type="movie"
          />
        </section>
      </main>
    </div>
  );
}
