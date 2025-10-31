import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import MediaRow from "../components/MediaRow";
import Navbar from "../components/NavBar";
import {
  getActorDetails,
  getByActor,
  getByGenre,
  getCurrentFeaturedActor,
  getNowPlaying,
  getRandom2000sMovies,
  getTrending,
  getUpcoming,
} from "../store/api";

export default function MoviesPage() {
  const [featuredActor, setFeaturedActor] = useState(null);

  useEffect(() => {
    const picked = getCurrentFeaturedActor();
    getActorDetails(picked.id).then((res) => {
      setFeaturedActor({
        ...picked,
        profile_path: res.data.profile_path,
      });
    });
  }, []);
  if (!featuredActor) return null;
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Banner */}
      <div className="pt-16 md:pt-20">
        <Banner fetchFunc={getTrending} type="movie" />
      </div>

      {/* Content Wrapper */}
      <main className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 space-y-10">
        <MediaRow
          title="Trending Movies This Week"
          fetchFunc={getTrending}
          type="movie"
        />
        <div className="flex items-center gap-3">
          <img
            src={`https://image.tmdb.org/t/p/w185${featuredActor.profile_path}`}
            alt={featuredActor.name}
            className="w-14 h-14 md:w-17 md:h-17 lg:w-20 lg:h-20 rounded-full object-cover shadow-md"
          />

          <h2 className="text-lg md:text-2xl font-semibold">
            Starring {featuredActor.name}
          </h2>
        </div>

        <MediaRow
          // title={`Movies featuring ${featuredActor.name}`}
          fetchFunc={() => getByActor(featuredActor.id)}
          type={"movie"}
        />

        <MediaRow
          title="Now Playing in Theaters"
          fetchFunc={getNowPlaying}
          type="movie"
        />
        <h2
          className="text-2xl md:text-3xl font-extrabold tracking-wider 
                      bg-gradient-to-r from-yellow-500 via-purple-500 to-black
                       text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,255,0.6)] 
                       animate-pulse select-none"
        >
          🎬 Best of the 2000s
        </h2>

        <MediaRow fetchFunc={getRandom2000sMovies} type="movie" />

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
