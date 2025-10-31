import axios from "axios";

export const API_KEY = "3be26eced7a14a4f5a91df135078adce";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
});

//Actors
// 🎭 FEATURED ACTORS
export const featuredActors = [
  { id: 287, name: "Brad Pitt" },
  { id: 6193, name: "Leonardo DiCaprio" },
  { id: 500, name: "Tom Cruise" },
  { id: 224513, name: "Ana de Armas" },
  { id: 234352, name: "Margot Robbie" },
  { id: 9273, name: "Amy Adams" },
  { id: 514, name: "Jack Nicholson" },
  { id: 1397778, name: "Anya Taylor Joy" },
];

export function getCurrentFeaturedActor() {
  const randomIndex = Math.floor(Math.random() * featuredActors.length);
  return featuredActors[randomIndex];
}
export const getByActor = (actorId) =>
  tmdb.get(`/discover/movie?api_key=${API_KEY}&with_cast=${actorId}`);

export const getActorDetails = (actorId) =>
  tmdb.get(`/person/${actorId}?api_key=${API_KEY}`);

// Movies + TV Shows
export const getTrendingAll = () =>
  tmdb.get(`/trending/all/week?api_key=${API_KEY}`);
export const searchAll = (query) =>
  axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
  );

// 🎬 MOVIES
export const getTrending = () =>
  tmdb.get(`/trending/movie/week?api_key=${API_KEY}`);

export const getByGenre = (genreId) =>
  tmdb.get(`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);

export const getUpcoming = () => tmdb.get(`/movie/upcoming?api_key=${API_KEY}`);

export const getNowPlaying = () =>
  tmdb.get(`/movie/now_playing?api_key=${API_KEY}`);

export const getMovieDetails = (id) =>
  tmdb.get(`/movie/${id}?api_key=${API_KEY}&append_to_response=videos`);
export const getByDecade = (startYear, endYear) =>
  tmdb.get(
    `/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31&sort_by=popularity.desc`
  );
export const getRandom1990sMovies = () => {
  const year = Math.floor(Math.random() * 10) + 1990;
  const page = Math.floor(Math.random() * 5) + 1;

  return tmdb.get(
    `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&primary_release_year=${year}&page=${page}`
  );
};
export const getRandom2000sMovies = () => {
  const year = Math.floor(Math.random() * 10) + 2000;
  const page = Math.floor(Math.random() * 5) + 1;

  return tmdb.get(
    `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&primary_release_year=${year}&page=${page}`
  );
};

// 📺 TV SHOWS
export const getPopularTV = () => tmdb.get(`/tv/popular?api_key=${API_KEY}`);

export const getTrendingTV = () =>
  tmdb.get(`/trending/tv/week?api_key=${API_KEY}`);

export const getTVByGenre = (genreId) =>
  tmdb.get(`/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`);

export const getAiringToday = () =>
  tmdb.get(`/tv/airing_today?api_key=${API_KEY}`);

export const getOnTheAir = () => tmdb.get(`/tv/on_the_air?api_key=${API_KEY}`);

export const getTVDetails = (id) =>
  tmdb.get(`/tv/${id}?api_key=${API_KEY}&append_to_response=videos`);

export const searchTV = (query) =>
  tmdb.get(`/search/tv?api_key=${API_KEY}&query=${query}`);
