import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import GenrePage from "./pages/GenrePage";
import MovieListPage from "./pages/MovieListPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
import AllMoviesPage from "./pages/AllMoviesPage";
import WatchPage from "./pages/WatchPage";
import ActorsPage from "./pages/ActorsPage";
import PlaylistPage from "./pages/PlaylistPage";
import CountryPage from "./pages/CountryPage";
import TopicPage from "./pages/TopicPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <ThemeProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="movie/:id" element={<MovieDetailsPage />} />
            <Route path="search" element={<SearchResultsPage />} />
            <Route path="movies" element={<MovieListPage title="Phim lẻ" />} />
            <Route path="series" element={<MovieListPage title="Phim bộ" />} />
            <Route path="genre/:genre" element={<GenrePage />} />
            <Route path="country/:country" element={<CountryPage />} />
            <Route path="topic/:topic" element={<TopicPage />} />
            <Route
              path="schedule"
              element={<PlaceholderPage title="Lịch chiếu" />}
            />
            <Route
              path="countries"
              element={<PlaceholderPage title="Quốc gia" />}
            />
            <Route path="actors" element={<ActorsPage />} />
            <Route
              path="trending"
              element={<MovieListPage title="Phim hot" />}
            />
            <Route
              path="latest"
              element={<MovieListPage title="Mới cập nhật" />}
            />
            <Route
              path="top-rated"
              element={<MovieListPage title="Xếp hạng cao" />}
            />
            <Route
              path="favorites"
              element={<MovieListPage title="Yêu thích" />}
            />
            <Route path="watched" element={<MovieListPage title="Đã xem" />} />
            <Route
              path="bookmarked"
              element={<MovieListPage title="Đánh dấu" />}
            />
            <Route path="playlist" element={<PlaylistPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="all-movies" element={<AllMoviesPage />} />
            <Route path="view-all/:category" element={<AllMoviesPage />} />
            <Route path="genre/:genreName" element={<GenrePage />} />

            {/* Country routes - sử dụng dynamic routing */}
            <Route path="country/:country" element={<CountryPage />} />

            {/* Topic routes - sử dụng dynamic routing */}
            <Route path="topic/:topic" element={<TopicPage />} />
          </Route>{" "}
          {/* Routes without MainLayout */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="watch/:id" element={<WatchPage />} />
          <Route path="watch/:id/episode/:episodeId" element={<WatchPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
