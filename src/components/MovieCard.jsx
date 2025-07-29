import { Link } from "react-router-dom";
import { Play, Star, Plus, Info, Check } from "lucide-react";
import { usePlaylist } from "../hooks/usePlaylist";
import { toast } from "react-toastify";

const MovieCard = ({ movie, size = "medium" }) => {
  const { addToPlaylist, removeFromPlaylist, isInPlaylist } = usePlaylist();
  
  const handlePlaylistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const movieIdNum = parseInt(movie.id);
    if (isInPlaylist(movieIdNum)) {
      removeFromPlaylist(movieIdNum);
      toast.success("Đã xóa khỏi danh sách phát!");
    } else {
      const success = addToPlaylist(movieIdNum);
      if (success) {
        toast.success("Đã thêm vào danh sách phát!");
      } else {
        toast.info("Phim đã có trong danh sách!");
      }
    }
  };
  const sizeClasses = {
    small: "w-40 sm:w-44",
    medium: "w-48 sm:w-56",
    large: "w-60 sm:w-72",
  };

  return (
    <div
      className={`${sizeClasses[size]} group relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl`}
    >
      {/* --- BACKGROUND IMAGE & GRADIENT --- */}
      <img
        src={movie.posterPath}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* --- DEFAULT VISIBLE CONTENT (Bottom) --- */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:-translate-y-4">
        <h3 className="font-bold text-base truncate">{movie.title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-300 mt-1">
          <span>{movie.year}</span>
          <div className="flex items-center gap-1">
            <Star size={12} fill="currentColor" className="text-yellow-400" />
            <span className="font-medium">{movie.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* --- HOVER CONTENT (Slides up) --- */}
      <div
        className="absolute inset-0 bg-black/70 p-4 text-white flex flex-col justify-end
                       opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 
                       transition-all duration-300 ease-in-out"
      >
        <h3 className="font-bold text-lg mb-2">{movie.title}</h3>

        <div className="flex items-center gap-3 text-sm text-gray-300 mb-3">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={16} fill="currentColor" />
            <span className="font-bold">{movie.rating.toFixed(1)}</span>
          </div>
          <span>{movie.year}</span>
          {movie.duration && <span>{movie.duration}</span>}
        </div>

        <p className="text-xs text-gray-300 mb-4 line-clamp-3">
          {movie.description || "No description available."}
        </p>

        <div className="flex items-center gap-2">
          <Link
            to={`/watch/${movie.id}`}
            className="flex-grow flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium transition-colors text-sm"
          >
            <Play size={16} fill="currentColor" />
            <span>Xem ngay</span>
          </Link>
          <button
            onClick={handlePlaylistClick}
            className={`p-2 rounded-md transition-colors ${
              isInPlaylist(parseInt(movie.id))
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-white/20 hover:bg-white/30'
            }`}
            title={isInPlaylist(parseInt(movie.id)) ? "Xóa khỏi danh sách" : "Thêm vào danh sách"}
          >
            {isInPlaylist(parseInt(movie.id)) ? <Check size={16} /> : <Plus size={16} />}
          </button>
          <Link
            to={`/movie/${movie.id}`}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
            title="Thông tin chi tiết"
          >
            <Info size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
