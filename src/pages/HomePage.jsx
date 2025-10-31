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
  getPopularTV,
  getRandom1990sMovies,
  getTrendingAll,
  getUpcoming,
} from "../store/api";

export default function HomePage() {
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

      {/* Main content wrapper */}
      <main className="pt-24 flex flex-col gap-12">
        {/* Banner full width */}
        <section className="w-full">
          <Banner type={"all"} fetchFunc={getTrendingAll} />
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

          <h2
            className="text-2xl md:text-3xl font-extrabold tracking-wider 
              bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 
               text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,255,0.6)] 
               animate-pulse select-none"
          >
            🎬 Best of the 1990s
          </h2>

          <MediaRow fetchFunc={getRandom1990sMovies} type="movie" />

          <MediaRow
            title="Coming Soon to Theaters"
            fetchFunc={getUpcoming}
            type="movie"
          />

          <MediaRow
            title="Action"
            fetchFunc={() => getByGenre(28)}
            type="movie"
          />
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
