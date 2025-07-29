import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Play,
  Calendar,
  Clock,
  Star,
  Globe,
  User2,
  Plus,
  Share2,
  Download,
  ThumbsUp,
  MessageCircle,
  Edit,
  Trash2,
  Film,
  Users,
  Languages,
  Check,
  List,
} from "lucide-react";
import MovieCarousel from "../components/MovieCarousel";
import { ALL_MOVIES, SIMILAR_MOVIES } from "../data/mockData";
import { usePlaylist } from "../hooks/usePlaylist";
import { toast } from "react-toastify";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info");
  const [movie, setMovie] = useState(null);
  const { addToPlaylist, removeFromPlaylist, isInPlaylist } = usePlaylist();
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: "Long Nguyen",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      },
      text: "Phim hay quá, kỹ xảo đỉnh cao!",
      time: "2 giờ trước",
      likes: 15,
    },
    {
      id: 2,
      user: {
        name: "Trần An",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
      },
      text: "Nội dung hơi khó hiểu nhưng xem cuốn.",
      time: "5 giờ trước",
      likes: 7,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null); // { id, text }

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundMovie = ALL_MOVIES.find((m) => m.id.toString() === id);
    setMovie(foundMovie);
    // In a real app, you would fetch comments for the movie here
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObject = {
        id: Date.now(),
        user: {
          name: "Người dùng mới", // Placeholder for logged-in user
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
        },
        text: newComment,
        time: "Vừa xong",
        likes: 0,
      };
      setComments([newCommentObject, ...comments]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (commentId) => {
    // Add a confirmation dialog for a better user experience
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?")) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  const handleUpdateComment = (e) => {
    e.preventDefault();
    if (!editingComment || !editingComment.text.trim()) return;

    setComments(
      comments.map((comment) =>
        comment.id === editingComment.id
          ? { ...comment, text: editingComment.text, time: "Đã chỉnh sửa" }
          : comment
      )
    );
    setEditingComment(null);
  };

  const startEditing = (comment) => {
    setEditingComment({ id: comment.id, text: comment.text });
  };

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center flex justify-center">
        <svg
          class="animate-spin h-8 w-8 text-orange-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-[50vh]">
        <div className="absolute inset-0">
          <img
            src={movie.backdropPath || movie.posterPath}
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {movie.title}
            </h1>
            {movie.originalTitle && (
              <h2 className="text-xl text-gray-300 mb-4">
                {movie.originalTitle}
              </h2>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
              <div className="flex items-center gap-1">
                <Star
                  size={16}
                  className="text-yellow-400"
                  fill="currentColor"
                />
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
              {movie.ageRating && (
                <div className="px-2 py-0.5 bg-red-600 rounded text-white font-medium">
                  {movie.ageRating}
                </div>
              )}
              {movie.quality && (
                <div className="px-2 py-0.5 bg-gray-800 rounded">
                  {movie.quality}
                </div>
              )}
              {movie.status && (
                <div className="px-2 py-0.5 bg-green-600 rounded text-white font-medium">
                  {movie.status}
                </div>
              )}
            </div>

            {movie.genres && (
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
            )}

            <p className="text-gray-300 mb-8 max-w-3xl">{movie.description}</p>

            <div className="mb-8">
              {movie.country && (
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-gray-400" />
                  <span className="text-gray-400">Quốc gia:</span>
                  <Link
                    to={`/country/${movie.country}`}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {movie.country}
                  </Link>
                </div>
              )}

              {movie.cast && (
                <div className="flex items-center gap-2">
                  <User2 size={16} className="text-gray-400" />
                  <span className="text-gray-400">Diễn viên:</span>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor, index) => (
                      <React.Fragment key={index}>
                        <Link
                          to={`/actor/${actor.toLowerCase().replace(" ", "-")}`}
                          className="hover:text-orange-500 transition-colors"
                        >
                          {actor}
                        </Link>
                        {index < movie.cast.length - 1 && <span>,</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to={`/watch/${movie.id}`}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-medium transition-colors"
              >
                <Play size={20} fill="currentColor" />
                Xem phim
              </Link>

              <button 
                onClick={() => {
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
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
                  isInPlaylist(parseInt(movie.id))
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {isInPlaylist(parseInt(movie.id)) ? (
                  <>
                    <Check size={20} />
                    Đã thêm
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    Thêm vào danh sách
                  </>
                )}
              </button>

              <Link
                to="/playlist"
                className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                title="Xem danh sách phát"
              >
                <List size={20} />
              </Link>

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
              onClick={() => setActiveTab("info")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === "info"
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-gray-400 hover:text-white"
              } transition-colors`}
            >
              Thông tin phim
            </button>
            <button
              onClick={() => setActiveTab("related")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === "related"
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-gray-400 hover:text-white"
              } transition-colors`}
            >
              Phim liên quan
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === "comments"
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-gray-400 hover:text-white"
              } transition-colors`}
            >
              Bình luận
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "info" && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Chi tiết phim</h3>
            
            {/* Movie Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Giới thiệu */}
                <div>
                  <h4 className="text-lg font-medium mb-3 text-orange-500">Giới thiệu:</h4>
                  <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                </div>

                {/* Thời lượng */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-orange-500" />
                    <span className="font-medium text-white">Thời lượng:</span>
                  </div>
                  <span className="text-gray-300">{movie.duration}</span>
                </div>

                {/* Quốc gia */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-orange-500" />
                    <span className="font-medium text-white">Quốc gia:</span>
                  </div>
                  <Link
                    to={`/country/${movie.country}`}
                    className="text-gray-300 hover:text-orange-500 transition-colors"
                  >
                    {movie.country}
                  </Link>
                </div>

                {/* Sản xuất */}
                {movie.producer && (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2">
                      <Film size={18} className="text-orange-500" />
                      <span className="font-medium text-white">Sản xuất:</span>
                    </div>
                    <div className="text-gray-300">
                      {Array.isArray(movie.producer) ? movie.producer.join(", ") : movie.producer}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Đạo diễn */}
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2">
                    <User2 size={18} className="text-orange-500" />
                    <span className="font-medium text-white">Đạo diễn:</span>
                  </div>
                  <div className="text-gray-300">
                    {Array.isArray(movie.director) ? movie.director.join(", ") : movie.director}
                  </div>
                </div>

                {/* Diễn viên */}
                {movie.cast && (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-orange-500" />
                      <span className="font-medium text-white">Diễn viên:</span>
                    </div>
                    <div className="text-gray-300">
                      <div className="flex flex-wrap gap-2">
                        {movie.cast.map((actor, index) => (
                          <React.Fragment key={index}>
                            <Link
                              to={`/actor/${actor.toLowerCase().replace(/\s+/g, "-")}`}
                              className="hover:text-orange-500 transition-colors"
                            >
                              {actor}
                            </Link>
                            {index < movie.cast.length - 1 && <span>,</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Ngôn ngữ */}
                {movie.language && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Languages size={18} className="text-orange-500" />
                      <span className="font-medium text-white">Ngôn ngữ:</span>
                    </div>
                    <span className="text-gray-300">{movie.language}</span>
                  </div>
                )}

                {/* Phụ đề */}
                {movie.subtitle && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <MessageCircle size={18} className="text-orange-500" />
                      <span className="font-medium text-white">Phụ đề:</span>
                    </div>
                    <span className="text-gray-300">{movie.subtitle}</span>
                  </div>
                )}

                {/* Độ tuổi */}
                {movie.ageRating && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">Độ tuổi:</span>
                    </div>
                    <div className="px-3 py-1 bg-red-600 rounded text-white font-medium">
                      {movie.ageRating}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Genres */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-3 text-orange-500">Thể loại:</h4>
              <div className="flex flex-wrap gap-3">
                {movie.genres && movie.genres.map((genre, index) => (
                  <Link
                    key={index}
                    to={`/genre/${genre.toLowerCase()}`}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors border border-gray-700 hover:border-orange-500"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "related" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Phim cùng thể loại</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {SIMILAR_MOVIES.map((movie) => (
                <div key={movie.id} className="mb-6">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="block relative overflow-hidden rounded-lg mb-2"
                  >
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
                      <Star
                        size={12}
                        fill="currentColor"
                        className="text-yellow-400"
                      />
                      <span>{movie.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "comments" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Bình luận ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="flex items-start gap-4">
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704f"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-grow">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-gray-800 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                    rows="3"
                    placeholder="Viết bình luận của bạn..."
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-full font-medium text-sm transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                      disabled={!newComment.trim()}
                    >
                      Gửi bình luận
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) =>
                editingComment && editingComment.id === comment.id ? (
                  // Editing View
                  <form
                    key={comment.id}
                    onSubmit={handleUpdateComment}
                    className="flex items-start gap-4"
                  >
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-grow">
                      <textarea
                        value={editingComment.text}
                        onChange={(e) =>
                          setEditingComment({
                            ...editingComment,
                            text: e.target.value,
                          })
                        }
                        className="w-full bg-gray-800 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        rows="3"
                        autoFocus
                      />
                      <div className="flex justify-end items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => setEditingComment(null)}
                          className="px-4 py-1.5 text-sm text-gray-300 hover:text-white rounded-full"
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 rounded-full font-medium text-sm"
                        >
                          Lưu
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  // Normal View
                  <div
                    key={comment.id}
                    className="flex items-start gap-4 group"
                  >
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-grow">
                      <div className="bg-gray-800 rounded-lg p-3 relative">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm">
                            {comment.user.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">
                          {comment.text}
                        </p>

                        {/* Placeholder for user check - show only for comments by "Người dùng mới" */}
                        {comment.user.name === "Người dùng mới" && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditing(comment)}
                              className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white"
                              title="Chỉnh sửa"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white"
                              title="Xóa"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <button className="flex items-center gap-1 hover:text-white">
                          <ThumbsUp size={14} />
                          <span>{comment.likes} Thích</span>
                        </button>
                        <button className="hover:text-white">Trả lời</button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
