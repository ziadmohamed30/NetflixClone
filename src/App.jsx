import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieRow from "./components/MovieRow";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<h1>dd</h1>} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
