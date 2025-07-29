import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import {
  TRENDING_MOVIES,
  NEW_RELEASES,
  POPULAR_SERIES,
  TOP_RATED_MOVIES,
} from "../data/mockData";

const GenrePage = () => {
  const { genreName } = useParams();

  // Create a mapping for Vietnamese genre names
  const genreDisplayNames = {
    "hanh-dong": "Hành động",
    "tinh-cam": "Tình cảm", 
    "hai-huoc": "Hài hước",
    "kinh-di": "Kinh dị",
    "vien-tuong": "Viễn tưởng",
    "phieu-luu": "Phiêu lưu",
    "drama": "Chính kịch",
    "thriller": "Ly kỳ"
  };

  const displayName = genreDisplayNames[genreName] || genreName?.replace(/-/g, " ");

  // In a real app, you'd filter movies by genre from a database
  // Here, we'll show different movies based on genre for demo purposes
  const getMoviesForGenre = () => {
    switch (genreName) {
      case "hanh-dong":
        return [...TRENDING_MOVIES, ...NEW_RELEASES].slice(0, 18);
      case "tinh-cam":
        return [...POPULAR_SERIES, ...TOP_RATED_MOVIES].slice(0, 18);
      case "hai-huoc":
        return [...NEW_RELEASES, ...TRENDING_MOVIES].slice(0, 18);
      case "kinh-di":
        return [...TOP_RATED_MOVIES, ...POPULAR_SERIES].slice(0, 18);
      default:
        const allMovies = [
          ...TRENDING_MOVIES,
          ...NEW_RELEASES,
          ...POPULAR_SERIES,
          ...TOP_RATED_MOVIES,
        ];
        return allMovies.sort(() => 0.5 - Math.random()).slice(0, 18);
    }
  };

  const moviesForGenre = getMoviesForGenre();

  return (
    <div className="text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Thể loại: {displayName}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {moviesForGenre.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
