import { Play, Plus, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = ({ movie }) => {
  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={movie.backdropPath} 
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-white text-shadow-xl">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-4 text-base text-gray-200 dark:text-gray-300 mb-6">
            <span className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-md font-bold text-lg">
              {movie.rating.toFixed(1)}
            </span>
            <span className="font-semibold">{movie.year}</span>
            <span className="font-semibold">{movie.duration}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre, index) => (
              <Link 
                key={index}
                to={`/genre/${genre.toLowerCase()}`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>
          
          <p className="text-gray-200 dark:text-gray-300 mb-8 line-clamp-3 md:line-clamp-4 text-lg max-w-3xl">
            {movie.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              to={`/watch/${movie.id}`}
              className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full font-bold text-lg text-white transition-transform hover:scale-105 shadow-lg"
            >
              <Play size={24} fill="currentColor" />
              Xem Ngay
            </Link>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 hover:bg-gray-700/80 backdrop-blur-sm rounded-full font-medium text-white transition-colors">
              <Plus size={22} />
              Thêm vào danh sách
            </button>
            
            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 hover:bg-gray-700/80 backdrop-blur-sm rounded-full font-medium text-white transition-colors"
            >
              <Info size={22} />
              Chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;