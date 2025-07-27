import React from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { TRENDING_MOVIES, NEW_RELEASES, POPULAR_SERIES, TOP_RATED_MOVIES } from '../data/mockData';

const GenrePage: React.FC = () => {
  const { genreName } = useParams<{ genreName: string }>();

  // In a real app, you'd filter movies by genre.
  // Here, we'll just show a mix of movies as a placeholder.
  const allMovies = [...TRENDING_MOVIES, ...NEW_RELEASES, ...POPULAR_SERIES, ...TOP_RATED_MOVIES];
  const moviesForGenre = allMovies.sort(() => 0.5 - Math.random()).slice(0, 20);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Thể loại: {genreName?.replace(/-/g, ' ')}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {moviesForGenre.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
