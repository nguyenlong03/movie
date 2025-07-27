import React from 'react';
import MovieCard, { Movie } from '../components/MovieCard';
import { TRENDING_MOVIES, NEW_RELEASES, POPULAR_SERIES } from '../data/mockData';

interface MovieListPageProps {
  title: string;
}

const MovieListPage: React.FC<MovieListPageProps> = ({ title }) => {
  // In a real app, you'd fetch the specific list of movies.
  // Here, we'll just show a mix of movies as a placeholder.
  const movies = [...TRENDING_MOVIES, ...NEW_RELEASES, ...POPULAR_SERIES]
    .sort(() => 0.5 - Math.random())
    .slice(0, 15);

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

export default MovieListPage;
