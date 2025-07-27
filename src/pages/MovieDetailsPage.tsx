import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Calendar, Clock, Star, Globe, User2, Plus, Share2, Download, ThumbsUp, MessageCircle } from 'lucide-react';
import MovieCarousel from '../components/MovieCarousel';
import { MOVIE_DETAILS, SIMILAR_MOVIES } from '../data/mockData';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'episodes' | 'related' | 'comments'>('episodes');
  
  // In a real app, we would fetch the movie by ID
  const movie = MOVIE_DETAILS;
  
  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-[50vh]">
        <div className="absolute inset-0">
          <img 
            src={movie.backdropPath} 
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row gap-8 items-start">
          {/* Poster */}
          <div className="w-48 md:w-64 shrink-0 rounded-lg overflow-hidden shadow-xl z-10 border-2 border-gray-800">
            <img 
              src={movie.posterPath} 
              alt={movie.title}
              className="w-full h-auto"
            />
          </div>
          
          {/* Info */}
          <div className="z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
            <h2 className="text-xl text-gray-300 mb-4">{movie.originalTitle}</h2>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-400" fill="currentColor" />
                <span className="font-medium">{movie.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{movie.duration}</span>
              </div>
              <div className="px-2 py-0.5 bg-gray-800 rounded">
                {movie.quality}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre, index) => (
                <Link 
                  key={index}
                  to={`/genre/${genre.toLowerCase()}`}
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition-colors"
                >
                  {genre}
                </Link>
              ))}
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              {movie.description}
            </p>
            
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Globe size={16} className="text-gray-400" />
                <span className="text-gray-400">Quốc gia:</span>
                <Link to={`/country/${movie.country}`} className="hover:text-orange-500 transition-colors">
                  {movie.country}
                </Link>
              </div>
              
              <div className="flex items-center gap-2">
                <User2 size={16} className="text-gray-400" />
                <span className="text-gray-400">Diễn viên:</span>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor, index) => (
                    <React.Fragment key={index}>
                      <Link to={`/actor/${actor.toLowerCase().replace(' ', '-')}`} className="hover:text-orange-500 transition-colors">
                        {actor}
                      </Link>
                      {index < movie.cast.length - 1 && <span>,</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            
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
                Thêm vào danh sách
              </button>
              
              <button className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <Share2 size={20} />
              </button>
              
              <button className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <Download size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs & Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="border-b border-gray-800 mb-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setActiveTab('episodes')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'episodes' 
                  ? 'border-orange-500 text-orange-500' 
                  : 'border-transparent text-gray-400 hover:text-white'
              } transition-colors`}
            >
              Tập phim
            </button>
            <button 
              onClick={() => setActiveTab('related')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'related' 
                  ? 'border-orange-500 text-orange-500' 
                  : 'border-transparent text-gray-400 hover:text-white'
              } transition-colors`}
            >
              Phim liên quan
            </button>
            <button 
              onClick={() => setActiveTab('comments')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'comments' 
                  ? 'border-orange-500 text-orange-500' 
                  : 'border-transparent text-gray-400 hover:text-white'
              } transition-colors`}
            >
              Bình luận
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'episodes' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Danh sách tập</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[...Array(12)].map((_, index) => (
                <Link 
                  key={index}
                  to={`/watch/${movie.id}/episode/${index + 1}`}
                  className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-center transition-colors"
                >
                  Tập {index + 1}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'related' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Phim cùng thể loại</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {SIMILAR_MOVIES.map((movie) => (
                <div key={movie.id} className="mb-6">
                  <Link to={`/movie/${movie.id}`} className="block relative overflow-hidden rounded-lg mb-2">
                    <div className="aspect-[2/3] bg-gray-800">
                      <img 
                        src={movie.posterPath} 
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <h3 className="font-medium truncate hover:text-orange-500 transition-colors">
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                    <span>{movie.year}</span>
                    <div className="flex items-center gap-1">
                      <Star size={12} fill="currentColor" className="text-yellow-400" />
                      <span>{movie.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'comments' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Bình luận (24)</h3>
            
            <div className="mb-8 bg-gray-800/50 rounded-lg p-4">
              <textarea 
                placeholder="Để lại bình luận của bạn..."
                className="w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-md font-medium transition-colors">
                  Gửi bình luận
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <User2 size={18} className="text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">Người dùng {index + 1}</h4>
                        <span className="text-xs text-gray-400">2 giờ trước</span>
                      </div>
                      <p className="text-gray-300 mb-3">
                        Phim hay quá, đặc biệt là phần diễn xuất của diễn viên chính rất xuất sắc!
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <button className="flex items-center gap-1 hover:text-orange-500 transition-colors">
                          <ThumbsUp size={14} />
                          <span>12</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-orange-500 transition-colors">
                          <MessageCircle size={14} />
                          <span>Trả lời</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;