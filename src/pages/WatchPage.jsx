import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { ALL_MOVIES } from "../data/mockData";
import {
  ArrowLeft,
  AlertTriangle,
  Loader,
  Play,
  Star,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  Download,
  Settings,
  Volume2,
  Maximize,
  SkipBack,
  SkipForward,
  Pause,
  Info,
} from "lucide-react";
import { usePlaylist } from "../hooks/usePlaylist";

const WatchPage = () => {
  const { id, episodeId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [playerError, setPlayerError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { addToWatchHistory, addToPlaylist, removeFromPlaylist, isInPlaylist } =
    usePlaylist();

  useEffect(() => {
    const foundMovie = ALL_MOVIES.find((m) => m.id.toString() === id);
    setMovie(foundMovie);
    setIsLoading(false);
    setIsPlayerReady(false);
    setPlayerError(false);

    if (foundMovie) {
      const movieIdNum = parseInt(id);
      const episodeIdNum = episodeId ? parseInt(episodeId) : null;
      addToWatchHistory(movieIdNum, episodeIdNum);
    }
  }, [id, episodeId, addToWatchHistory]);

  const handlePlayerReady = () => {
    setTimeout(() => {
      setIsPlayerReady(true);
    }, 500);
  };

  const handlePlayerError = (error) => {
    console.error("Video Player Error:", error);
    setPlayerError(true);
  };

  const handlePlaylistToggle = () => {
    const movieId = parseInt(id);
    if (isInPlaylist(movieId)) {
      removeFromPlaylist(movieId);
    } else {
      addToPlaylist(movie);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-orange-500/30 rounded-full animate-spin border-t-orange-500 mx-auto"></div>
            <Play
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-500"
              size={24}
            />
          </div>
          <p className="text-xl font-medium">Đang tải thông tin phim...</p>
          <p className="text-gray-400 mt-2">Vui lòng chờ trong giây lát</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
            </div>
            <span>Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen flex flex-col items-center justify-center text-center p-4">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text">
          Không tìm thấy phim
        </h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Có vẻ như phim bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.
        </p>
        <Link
          to="/"
          className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Trở về trang chủ
        </Link>
      </div>
    );
  }

  const videoUrl = episodeId
    ? "https://www.youtube.com/watch?v=y2t4-v9Iq_c"
    : movie.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
      {/* Header Controls */}
      <div className="relative z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to={`/movie/${id}`}
                className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="font-medium">Quay lại</span>
              </Link>
              <div className="h-6 w-px bg-gray-700"></div>
              <h1 className="text-lg font-semibold text-white truncate max-w-md">
                {movie.title}
                {episodeId && (
                  <span className="text-orange-400 ml-2">
                    - Tập {episodeId}
                  </span>
                )}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                title="Thông tin phim"
              >
                <Info size={20} />
              </button>
              <button
                onClick={handlePlaylistToggle}
                className={`p-2 rounded-lg transition-all ${
                  isInPlaylist(parseInt(id))
                    ? "text-red-400 hover:text-red-300 bg-red-900/30"
                    : "text-gray-400 hover:text-red-400 hover:bg-gray-800"
                }`}
                title={
                  isInPlaylist(parseInt(id))
                    ? "Xóa khỏi danh sách"
                    : "Thêm vào danh sách"
                }
              >
                <Heart
                  size={20}
                  fill={isInPlaylist(parseInt(id)) ? "currentColor" : "none"}
                />
              </button>
              <button
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                title="Chia sẻ"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      <div className="relative">
        <div
          className="relative w-full bg-black"
          style={{ paddingTop: "56.25%" }}
        >
          {!isPlayerReady && !playerError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-br from-gray-900/90 to-black/90">
              <div className="relative mb-4">
                <div className="w-16 h-16 border-4 border-orange-500/30 rounded-full animate-spin border-t-orange-500"></div>
                <Play
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-500"
                  size={20}
                />
              </div>
              <p className="text-lg font-medium">Đang tải video...</p>
              <p className="text-gray-400 text-sm mt-1">Chất lượng HD</p>
              <div className="mt-4 flex items-center gap-2 text-gray-400 text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                </div>
                <span>Đang tải...</span>
              </div>
            </div>
          )}

          {playerError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-br from-red-900/50 to-black/90">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={40} className="text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lỗi phát video</h3>
              <p className="text-gray-400 text-center max-w-md">
                Không thể tải video. Vui lòng thử lại sau hoặc kiểm tra kết nối
                mạng.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Thử lại
              </button>
            </div>
          )}

          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
            controls={true}
            playing={isPlaying}
            onReady={handlePlayerReady}
            onError={handlePlayerError}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
            onDuration={setDuration}
            config={{
              youtube: {
                playerVars: {
                  showinfo: 1,
                  origin: window.location.origin,
                },
              },
            }}
          />
        </div>
      </div>

      {/* Movie Information Panel */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Info */}
          <div className="flex-1">
            {/* Movie Header */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-700/50">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-32 h-48 object-cover rounded-xl shadow-2xl"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {movie.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={18} fill="currentColor" />
                      <span className="font-semibold">{movie.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar size={18} />
                      <span>{movie.year}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock size={18} />
                      <span>{movie.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Eye size={18} />
                      <span>{movie.views || "1.2M"} lượt xem</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres?.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {movie.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Episodes List for Series */}
            {movie.type === "series" && movie.episodes && (
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Play size={24} className="text-orange-400" />
                  Danh sách tập phim
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 mb-6">
                  {Array.from({ length: movie.episodes }, (_, index) => {
                    const currentEpisode = index + 1;
                    const isCurrentEpisode =
                      episodeId && parseInt(episodeId) === currentEpisode;

                    return (
                      <Link
                        key={currentEpisode}
                        to={`/watch/${id}/episode/${currentEpisode}`}
                        className={`relative group px-4 py-3 rounded-xl text-center transition-all duration-300 ${
                          isCurrentEpisode
                            ? "bg-gradient-to-r from-orange-500 to-red-600 text-white scale-105 shadow-lg"
                            : "bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 hover:text-white hover:scale-105"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {isCurrentEpisode && (
                            <Play size={14} fill="currentColor" />
                          )}
                          <span className="font-medium">
                            Tập {currentEpisode}
                          </span>
                        </div>
                        {isCurrentEpisode && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Series Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-800/30 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">
                      {movie.episodes}
                    </div>
                    <div className="text-sm text-gray-400">Tổng số tập</div>
                  </div>
                  {movie.totalSeasons && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">
                        {movie.totalSeasons}
                      </div>
                      <div className="text-sm text-gray-400">Số mùa</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">
                      {movie.duration}
                    </div>
                    <div className="text-sm text-gray-400">Thời lượng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {movie.status}
                    </div>
                    <div className="text-sm text-gray-400">Trạng thái</div>
                  </div>
                </div>
              </div>
            )}

            {/* Movie Info for non-series */}
            {movie.type === "movie" && (
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Info size={24} className="text-orange-400" />
                  Thông tin chi tiết
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                    <div className="text-2xl font-bold text-orange-400 mb-1">
                      {movie.duration}
                    </div>
                    <div className="text-sm text-gray-400">Thời lượng</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {movie.quality}
                    </div>
                    <div className="text-sm text-gray-400">Chất lượng</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {movie.status}
                    </div>
                    <div className="text-sm text-gray-400">Trạng thái</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">
                Hành động nhanh
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handlePlaylistToggle}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isInPlaylist(parseInt(id))
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={isInPlaylist(parseInt(id)) ? "currentColor" : "none"}
                  />
                  <span className="font-medium">
                    {isInPlaylist(parseInt(id))
                      ? "Xóa khỏi danh sách"
                      : "Thêm vào danh sách"}
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-700/50 text-gray-300 hover:bg-gray-700 rounded-xl transition-all">
                  <Download size={20} />
                  <span className="font-medium">Tải xuống</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-700/50 text-gray-300 hover:bg-gray-700 rounded-xl transition-all">
                  <Share2 size={20} />
                  <span className="font-medium">Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* Technical Info */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">
                Thông tin kỹ thuật
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Định dạng:</span>
                  <span className="text-white">MP4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Độ phân giải:</span>
                  <span className="text-white">1920x1080</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bitrate:</span>
                  <span className="text-white">5000 kbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Audio:</span>
                  <span className="text-white">AAC 320kbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phụ đề:</span>
                  <span className="text-white">Tiếng Việt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
