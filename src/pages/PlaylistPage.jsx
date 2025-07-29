import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Trash2, Clock, Star, Calendar, Plus, List } from "lucide-react";
import { ALL_MOVIES } from "../data/mockData";

const PlaylistPage = () => {
  const [playlist, setPlaylist] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    // Load playlist from localStorage
    const savedPlaylist = localStorage.getItem("moviePlaylist");
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    }

    // Load watch history from localStorage
    const savedHistory = localStorage.getItem("watchHistory");
    if (savedHistory) {
      setWatchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const removeFromPlaylist = (movieId) => {
    const updatedPlaylist = playlist.filter((id) => id !== movieId);
    setPlaylist(updatedPlaylist);
    localStorage.setItem("moviePlaylist", JSON.stringify(updatedPlaylist));
  };

  const clearPlaylist = () => {
    setPlaylist([]);
    localStorage.removeItem("moviePlaylist");
  };

  const clearHistory = () => {
    setWatchHistory([]);
    localStorage.removeItem("watchHistory");
  };

  const playlistMovies = playlist
    .map((id) => ALL_MOVIES.find((movie) => movie.id === id))
    .filter(Boolean);

  const historyMovies = watchHistory
    .map((item) => ({
      ...ALL_MOVIES.find((movie) => movie.id === item.movieId),
      watchedAt: item.watchedAt,
      episodeId: item.episodeId,
    }))
    .filter((movie) => movie.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Danh sách phát của tôi</h1>
        <p className="text-gray-400">Quản lý các phim bạn muốn xem và đã xem</p>
      </div>

      {/* Playlist Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <List className="text-orange-500" size={24} />
            <h2 className="text-xl font-semibold">
              Danh sách chờ xem ({playlistMovies.length})
            </h2>
          </div>
          {playlist.length > 0 && (
            <button
              onClick={clearPlaylist}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {playlistMovies.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <List className="mx-auto mb-4 text-gray-500" size={48} />
            <h3 className="text-lg font-medium mb-2">Danh sách trống</h3>
            <p className="text-gray-400 mb-4">
              Thêm phim vào danh sách để xem sau
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
            >
              <Plus size={16} />
              Khám phá phim
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {playlistMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden group"
              >
                <div className="relative aspect-[2/3]">
                  <img
                    src={movie.posterPath}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                    <Link
                      to={`/watch/${movie.id}`}
                      className="opacity-0 group-hover:opacity-100 flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-all duration-300"
                    >
                      <Play size={16} fill="currentColor" />
                      Xem phim
                    </Link>
                  </div>
                  <button
                    onClick={() => removeFromPlaylist(movie.id)}
                    className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="block font-medium hover:text-orange-500 transition-colors mb-2"
                  >
                    {movie.title}
                  </Link>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{movie.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star
                        size={12}
                        fill="currentColor"
                        className="text-yellow-400"
                      />
                      <span>{movie.rating?.toFixed(1)}</span>
                    </div>
                  </div>
                  {movie.duration && (
                    <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                      <Clock size={12} />
                      <span>{movie.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Watch History Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="text-orange-500" size={24} />
            <h2 className="text-xl font-semibold">
              Lịch sử xem ({historyMovies.length})
            </h2>
          </div>
          {watchHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
            >
              Xóa lịch sử
            </button>
          )}
        </div>

        {historyMovies.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <Clock className="mx-auto mb-4 text-gray-500" size={48} />
            <h3 className="text-lg font-medium mb-2">Chưa có lịch sử</h3>
            <p className="text-gray-400">
              Các phim bạn đã xem sẽ xuất hiện ở đây
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {historyMovies
              .slice()
              .reverse()
              .map((movie, index) => (
                <div
                  key={`${movie.id}-${index}`}
                  className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="w-16 h-24 shrink-0 rounded overflow-hidden">
                    <img
                      src={movie.posterPath}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="font-medium hover:text-orange-500 transition-colors block mb-1"
                    >
                      {movie.title}
                      {movie.episodeId && ` - Tập ${movie.episodeId}`}
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{movie.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star
                          size={12}
                          fill="currentColor"
                          className="text-yellow-400"
                        />
                        <span>{movie.rating?.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>
                          Xem lúc:{" "}
                          {new Date(movie.watchedAt).toLocaleString("vi-VN")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={
                      movie.episodeId
                        ? `/watch/${movie.id}/episode/${movie.episodeId}`
                        : `/watch/${movie.id}`
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                  >
                    <Play size={16} fill="currentColor" />
                    Xem lại
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
