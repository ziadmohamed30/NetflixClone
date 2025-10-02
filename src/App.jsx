import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieRow from "./components/MovieRow";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <div className="bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<h1>dd</h1>} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
