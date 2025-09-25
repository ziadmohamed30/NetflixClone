import axios from "axios";

export const API_KEY = "3be26eced7a14a4f5a91df135078adce";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
});
export const getTrending = () =>
  tmdb.get(`/trending/movie/week?api_key=${API_KEY}`);

export const getByGenre = (genreId) =>
  tmdb.get(`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
export const getUpcoming = () => tmdb.get(`/movie/upcoming?api_key=${API_KEY}`);
export const getNowPlaying = () =>
  tmdb.get(`/movie/now_playing?api_key=${API_KEY}`);
export const getPopularTV = () => tmdb.get(`/tv/popular?api_key=${API_KEY}`);
