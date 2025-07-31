import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { ALL_MOVIES } from "../data/mockData";

const TopicPage = () => {
  const { topic } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Kiểm tra nếu topic không tồn tại
  if (!topic) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <div className="text-gray-600 dark:text-gray-400 text-xl mb-4">
              Không tìm thấy chủ đề phim
            </div>
            <p className="text-gray-500">
              Vui lòng chọn một chủ đề phim từ menu.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mapping URL params to topic filters
  const topicMapping = {
    blockbuster: {
      name: "Phim Bom Tấn",
      emoji: "🎬",
      description:
        "Những bộ phim có kinh phí sản xuất lớn và được mong đợi nhất",
      filter: (movie) =>
        movie.rating >= 7.0 &&
        movie.year >= 2015 &&
        movie.genres &&
        [
          "Hành Động",
          "Hành động",
          "Phiêu Lưu",
          "Siêu Anh Hùng",
          "Ly Kỳ",
          "Bom Tấn",
          "Chiếu Rạp",
          "Khoa Học Viễn Tưởng",
        ].some((genre) => movie.genres.includes(genre)),
    },
    classic: {
      name: "Phim Kinh Điển",
      emoji: "🏆",
      description:
        "Những tác phẩm điện ảnh bất hủ được công nhận qua thời gian",
      filter: (movie) => movie.year <= 2005 && movie.rating >= 7.8,
    },
    independent: {
      name: "Phim Độc Lập",
      emoji: "🎭",
      description: "Những bộ phim nghệ thuật với phong cách đạo diễn độc đáo",
      filter: (movie) =>
        movie.genres &&
        ["Chính Kịch", "Chính kịch", "Tâm Lý", "Nghệ Thuật", "Độc Lập"].some(
          (genre) => movie.genres.includes(genre)
        ) &&
        movie.rating >= 7.0 &&
        movie.year >= 2010,
    },
    documentary: {
      name: "Phim Tài Liệu",
      emoji: "📚",
      description: "Những bộ phim tài liệu giáo dục và giải trí",
      filter: (movie) => movie.genres && movie.genres.includes("Tài Liệu"),
    },
    animation: {
      name: "Phim Hoạt Hình",
      emoji: "🎨",
      description: "Thế giới đầy màu sắc của phim hoạt hình cho mọi lứa tuổi",
      filter: (movie) =>
        movie.genres &&
        (movie.genres.includes("Hoạt Hình") ||
          movie.genres.includes("Gia Đình") ||
          movie.title.includes("Animation") ||
          movie.title.includes("Hoạt hình") ||
          movie.title.includes("Toy Story") ||
          movie.title.includes("Finding") ||
          movie.title.includes("Spirited") ||
          movie.title.includes("Frozen")),
    },
    romance: {
      name: "Phim Tình Cảm",
      emoji: "💕",
      description: "Những câu chuyện tình yêu lãng mạn và cảm động",
      filter: (movie) =>
        movie.genres &&
        (movie.genres.includes("Tình Cảm") ||
          movie.genres.includes("Lãng Mạn") ||
          movie.genres.includes("Tình Yêu")),
    },
    horror: {
      name: "Phim Kinh Dị",
      emoji: "👻",
      description: "Những bộ phim gây cấn và đầy hồi hộp",
      filter: (movie) =>
        movie.genres &&
        (movie.genres.includes("Kinh Dị") ||
          movie.genres.includes("Ma Quái") ||
          movie.genres.includes("Thriller") ||
          movie.genres.includes("Siêu Nhiên")),
    },
    comedy: {
      name: "Phim Hài",
      emoji: "😂",
      description: "Những bộ phim mang lại tiếng cười và niềm vui",
      filter: (movie) =>
        movie.genres &&
        (movie.genres.includes("Hài") ||
          movie.genres.includes("Hài Hước") ||
          movie.genres.includes("Hài Kịch")),
    },
    superhero: {
      name: "Phim Siêu Anh Hùng",
      emoji: "🦸",
      description: "Thế giới của những người hùng với sức mạnh phi thường",
      filter: (movie) => movie.genres && movie.genres.includes("Siêu Anh Hùng"),
    },
    "sci-fi": {
      name: "Phim Khoa Học Viễn Tưởng",
      emoji: "🚀",
      description: "Khám phá tương lai và những khả năng vô hạn của khoa học",
      filter: (movie) =>
        movie.genres && movie.genres.includes("Khoa Học Viễn Tưởng"),
    },
    action: {
      name: "Phim Hành Động",
      emoji: "💥",
      description: "Những bộ phim hành động căng thẳng và kịch tính",
      filter: (movie) =>
        movie.genres &&
        (movie.genres.includes("Hành Động") ||
          movie.genres.includes("Hành động")),
    },
    drama: {
      name: "Phim Chính Kịch",
      emoji: "🎪",
      description: "Những câu chuyện sâu sắc về cuộc sống và con người",
      filter: (movie) =>
        movie.genres &&
        (movie.genres.includes("Chính Kịch") ||
          movie.genres.includes("Chính kịch")),
    },
    thriller: {
      name: "Phim Ly Kỳ",
      emoji: "🔍",
      description: "Những bộ phim căng thẳng và bí ẩn",
      filter: (movie) =>
        movie.genres &&
        (movie.genres.includes("Ly Kỳ") || movie.genres.includes("Bí Ẩn")),
    },
    crime: {
      name: "Phim Tội Phạm",
      emoji: "🕵️",
      description: "Thế giới tội phạm và những cuộc điều tra",
      filter: (movie) =>
        movie.genres &&
        (movie.genres.includes("Tội Phạm") || movie.genres.includes("Hình Sự")),
    },
    adventure: {
      name: "Phim Phiêu Lưu",
      emoji: "🗺️",
      description: "Những cuộc hành trình và khám phá thú vị",
      filter: (movie) => movie.genres && movie.genres.includes("Phiêu Lưu"),
    },
    fantasy: {
      name: "Phim Giả Tưởng",
      emoji: "🧙",
      description: "Thế giới phép thuật và những điều kỳ diệu",
      filter: (movie) =>
        movie.genres &&
        (movie.genres.includes("Giả Tưởng") ||
          movie.genres.includes("Phép Thuật")),
    },
    war: {
      name: "Phim Chiến Tranh",
      emoji: "⚔️",
      description: "Những câu chuyện về chiến tranh và lịch sử",
      filter: (movie) =>
        movie.genres &&
        (movie.genres.includes("Chiến Tranh") ||
          movie.genres.includes("Quân Sự") ||
          movie.genres.includes("Lịch Sử")),
    },
    family: {
      name: "Phim Gia Đình",
      emoji: "👨‍👩‍👧‍👦",
      description: "Những bộ phim phù hợp cho cả gia đình",
      filter: (movie) => movie.genres && movie.genres.includes("Gia Đình"),
    },
    music: {
      name: "Phim Âm Nhạc",
      emoji: "🎵",
      description: "Những bộ phim về âm nhạc và ca nhạc",
      filter: (movie) =>
        movie.genres &&
        (movie.genres.includes("Âm Nhạc") ||
          movie.genres.includes("Nhạc Kịch")),
    },
    sport: {
      name: "Phim Thể Thao",
      emoji: "🏆",
      description: "Những câu chuyện về thể thao và vận động viên",
      filter: (movie) => movie.genres && movie.genres.includes("Thể Thao"),
    },
  };

  useEffect(() => {
    const filterMoviesByTopic = () => {
      setLoading(true);
      const topicData = topicMapping[topic];

      if (topicData) {
        const filteredMovies = ALL_MOVIES.filter(topicData.filter);
        setMovies(filteredMovies);
      } else {
        // Fallback cho các chủ đề chưa được định nghĩa
        // Tạo một chủ đề tự động dựa trên tên topic
        const generalFilter = (movie) => {
          if (!movie.genres || !topic) return false;

          // Tìm kiếm theo tên topic trong genres
          const topicKeywords = {
            love: ["Tình Cảm", "Lãng Mạn"],
            mystery: ["Bí Ẩn", "Ly Kỳ"],
            historical: ["Lịch Sử"],
            biography: ["Tiểu Sử"],
            western: ["Viễn Tây"],
            musical: ["Âm Nhạc", "Nhạc Kịch"],
          };

          const keywords = topicKeywords[topic] || [topic];
          return keywords.some((keyword) =>
            movie.genres.some(
              (genre) =>
                genre.toLowerCase().includes(keyword.toLowerCase()) ||
                keyword.toLowerCase().includes(genre.toLowerCase())
            )
          );
        };

        const filteredMovies = ALL_MOVIES.filter(generalFilter);
        setMovies(filteredMovies);
      }

      setLoading(false);
    };

    filterMoviesByTopic();
  }, [topic]);

  // Tạo topicData động nếu không tồn tại
  const topicData = topicMapping[topic] || {
    name: `Phim ${
      topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : "Không xác định"
    }`,
    emoji: "🎬",
    description: `Khám phá những bộ phim hay thuộc thể loại ${topic || "này"}`,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-5xl">{topicData.emoji}</span>
            {topicData.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">{topicData.description}</p>
          <div className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 h-1 w-24 rounded"></div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {movies.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Tổng số phim</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {movies.filter((m) => m.type === "movie").length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Phim lẻ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {movies.filter((m) => m.type === "series").length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Phim bộ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {movies.length > 0
                    ? (
                        movies.reduce((sum, movie) => sum + movie.rating, 0) /
                        movies.length
                      ).toFixed(1)
                    : "0"}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Điểm TB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              Tất cả
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
              Phim lẻ
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
              Phim bộ
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
              Mới nhất
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
              Đánh giá cao
            </button>
          </div>
        </div>

        {/* Movies Grid */}
        {movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Top Rated Section */}
            {movies.filter((movie) => movie.rating >= 8.0).length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {topicData.name} được đánh giá cao
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {movies
                    .filter((movie) => movie.rating >= 8.0)
                    .slice(0, 6)
                    .map((movie) => (
                      <MovieCard key={`top-${movie.id}`} movie={movie} />
                    ))}
                </div>
              </div>
            )}

            {/* Recent Section */}
            {movies.filter((movie) => movie.year >= 2020).length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {topicData.name} mới nhất
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {movies
                    .filter((movie) => movie.year >= 2020)
                    .sort((a, b) => b.year - a.year)
                    .slice(0, 6)
                    .map((movie) => (
                      <MovieCard key={`recent-${movie.id}`} movie={movie} />
                    ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">{topicData.emoji}</div>
            <div className="text-gray-600 dark:text-gray-400 text-xl mb-4">
              Hiện tại chưa có phim nào thuộc chủ đề{" "}
              {topicData.name.toLowerCase()}
            </div>
            <p className="text-gray-500 mb-6">
              Chúng tôi sẽ cập nhật thêm nhiều phim thuộc chủ đề này trong thời
              gian tới.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-gray-900 dark:text-white font-semibold mb-2">Gợi ý cho bạn:</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Hãy thử khám phá các chủ đề khác như Bom tấn, Kinh điển, hoặc
                Hoạt hình
              </p>
            </div>
          </div>
        )}

        {/* Recommended Section */}
        {movies.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Được đề xuất cho bạn
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movies
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 6)
                .map((movie) => (
                  <MovieCard key={`recommended-${movie.id}`} movie={movie} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
