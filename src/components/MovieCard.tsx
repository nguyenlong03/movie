import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Plus, Info } from 'lucide-react';

export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  year: number;
  duration?: string;
  quality?: string;
}

interface MovieCardProps {
  movie: Movie;
  size?: 'small' | 'medium' | 'large';
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-32 sm:w-36',
    medium: 'w-40 sm:w-48',
    large: 'w-52 sm:w-64'
  };

  return (
    <div className={`${sizeClasses[size]} group relative`}>
      <Link to={`/movie/${movie.id}`} className="block relative overflow-hidden rounded-lg">
        <div className="aspect-[2/3] bg-gray-800 overflow-hidden">
          <img 
            src={movie.posterPath} 
            alt={movie.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Quality badge */}
        {movie.quality && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-medium px-2 py-0.5 rounded">
            {movie.quality}
          </span>
        )}
        
        {/* Rating */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 text-yellow-400 text-xs px-1.5 py-0.5 rounded">
          <Star size={12} fill="currentColor" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
        
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors">
            <Play size={24} fill="white" />
          </button>
        </div>
        
        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between items-center">
            <button className="w-7 h-7 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
              <Plus size={14} />
            </button>
            <button className="w-7 h-7 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
              <Info size={14} />
            </button>
          </div>
        </div>
      </Link>
      
      <div className="mt-2">
        <h3 className="font-medium truncate hover:text-orange-500 transition-colors">
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
          <span>{movie.year}</span>
          {movie.duration && <span>{movie.duration}</span>}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;