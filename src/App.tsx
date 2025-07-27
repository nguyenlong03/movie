
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PlaceholderPage from './pages/PlaceholderPage';
import GenrePage from './pages/GenrePage';
import MovieListPage from './pages/MovieListPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import AllMoviesPage from './pages/AllMoviesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:id" element={<MovieDetailsPage />} />
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="movies" element={<MovieListPage title="Phim lẻ" />} />
          <Route path="series" element={<MovieListPage title="Phim bộ" />} />
          <Route path="schedule" element={<PlaceholderPage title="Lịch chiếu" />} />
          <Route path="countries" element={<PlaceholderPage title="Quốc gia" />} />
          <Route path="actors" element={<PlaceholderPage title="Diễn viên" />} />
          <Route path="trending" element={<MovieListPage title="Phim hot" />} />
          <Route path="latest" element={<MovieListPage title="Mới cập nhật" />} />
          <Route path="top-rated" element={<MovieListPage title="Xếp hạng cao" />} />
          <Route path="favorites" element={<MovieListPage title="Yêu thích" />} />
          <Route path="watched" element={<MovieListPage title="Đã xem" />} />
          <Route path="bookmarked" element={<MovieListPage title="Đánh dấu" />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="genre/:genreName" element={<GenrePage />} />
          <Route path="view-all/:category" element={<AllMoviesPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;