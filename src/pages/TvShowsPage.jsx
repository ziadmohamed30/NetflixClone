import Banner from "../components/Banner";
import MediaRow from "../components/MediaRow";
import Navbar from "../components/NavBar";
import { getAiringToday, getTrendingTV, getTVByGenre } from "../store/api";

export default function TvShowsPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Banner */}
      <div className="pt-16 md:pt-20">
        <Banner type="tv" fetchFunc={getTrendingTV} />
      </div>

      {/* Content Wrapper */}
      <main className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 space-y-10">
        <MediaRow
          title="Trending TV Shows This Week"
          fetchFunc={getTrendingTV}
          type="tv"
        />

        <MediaRow title="Airing Today" fetchFunc={getAiringToday} type="tv" />
        <MediaRow
          title="Action & Adventure"
          fetchFunc={() => getTVByGenre(10759)}
          type="tv"
        />

        <MediaRow title="Drama" fetchFunc={() => getTVByGenre(18)} type="tv" />

        <MediaRow
          title="Sci-fi"
          fetchFunc={() => getTVByGenre(10765)}
          type="tv"
        />

        <MediaRow
          title="Animation"
          fetchFunc={() => getTVByGenre(16)}
          type="tv"
        />
        <MediaRow
          title="Western"
          fetchFunc={() => getTVByGenre(37)}
          type="tv"
        />
        <MediaRow title="Comedy" fetchFunc={() => getTVByGenre(35)} type="tv" />
        <MediaRow
          title="Documentary"
          fetchFunc={() => getTVByGenre(99)}
          type="tv"
        />
        <MediaRow
          title="War & Politics"
          fetchFunc={() => getTVByGenre(10768)}
          type="tv"
        />

        <MediaRow
          title="Kids"
          fetchFunc={() => getTVByGenre(10762)}
          type="tv"
        />
      </main>
    </div>
  );
}
