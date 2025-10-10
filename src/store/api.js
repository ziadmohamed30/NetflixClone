import axios from "axios";

export const API_KEY = "3be26eced7a14a4f5a91df135078adce";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
});

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
