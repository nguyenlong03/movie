import { useParams, useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import {
  TRENDING_MOVIES,
  NEW_RELEASES,
  POPULAR_SERIES,
  TOP_RATED_MOVIES,
} from "../data/mockData";

const AllMoviesPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const title = location.state?.title || getTitleFromCategory(category);

  const getTitleFromCategory = (cat) => {
    switch (cat) {
      case "trending":
        return "Đang thịnh hành";
      case "new-releases":
        return "Phim lẻ mới";
      case "popular-series":
        return "Phim bộ phổ biến";
      case "top-rated":
        return "Đánh giá cao";
      default:
        return "Tất cả phim";
    }
  };

  const getMovies = () => {
    switch (category) {
      case "trending":
        return TRENDING_MOVIES;
      case "new-releases":
        return NEW_RELEASES;
      case "popular-series":
        return POPULAR_SERIES;
      case "top-rated":
        return TOP_RATED_MOVIES;
      default:
        return TRENDING_MOVIES; // Default fallback
    }
  };

  const movies = getMovies();

  return (
    <div className="text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMoviesPage;
