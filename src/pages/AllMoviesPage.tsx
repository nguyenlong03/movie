import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MovieCard, { Movie } from '../components/MovieCard';
import { TRENDING_MOVIES, NEW_RELEASES, POPULAR_SERIES, TOP_RATED_MOVIES } from '../data/mockData';

const AllMoviesPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const { title } = location.state as { title: string };

  const getMovies = () => {
    switch (category) {
      case 'trending':
        return TRENDING_MOVIES;
      case 'new-releases':
        return NEW_RELEASES;
      case 'popular-series':
        return POPULAR_SERIES;
      case 'top-rated':
        return TOP_RATED_MOVIES;
      default:
        return [];
    }
  };

  const movies = getMovies();

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie as Movie} />
        ))}
      </div>
    </div>
  );
};

export default AllMoviesPage;
