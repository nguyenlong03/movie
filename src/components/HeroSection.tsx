import React from 'react';
import { Play, Plus, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  movie: {
    id: number;
    title: string;
    backdropPath: string;
    description: string;
    genres: string[];
    year: number;
    duration: string;
    rating: number;
  };
}

const HeroSection: React.FC<HeroProps> = ({ movie }) => {
  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={movie.backdropPath} 
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-end py-16 sm:py-24 z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-shadow-lg">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
            <span className="px-2.5 py-1 bg-orange-500 text-white rounded-md font-medium">
              {movie.rating.toFixed(1)}
            </span>
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre, index) => (
              <Link 
                key={index}
                to={`/genre/${genre.toLowerCase()}`}
                className="px-3 py-1 bg-gray-800/80 hover:bg-gray-700 rounded-full text-sm transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>
          
          <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-4 max-w-3xl">
            {movie.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              to={`/watch/${movie.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-medium transition-colors"
            >
              <Play size={20} fill="currentColor" />
              Xem phim
            </Link>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-colors">
              <Plus size={20} />
              Danh sách phim
            </button>
            
            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-colors"
            >
              <Info size={20} />
              Thông tin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;