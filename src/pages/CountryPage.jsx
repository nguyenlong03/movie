import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { ALL_MOVIES } from "../data/mockData";

const CountryPage = () => {
  const { country } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapping URL params to country names
  const countryMapping = {
    "viet-nam": ["Việt Nam"],
    my: ["Mỹ"],
    "han-quoc": ["Hàn Quốc"],
    "trung-quoc": ["Trung Quốc"],
    "hong-kong": ["Hồng Kông"],
    "thai-lan": ["Thái Lan"],
    uc: ["Úc"],
    "dai-loan": ["Đài Loan"],
    "an-do": ["Ấn Độ"],
    phap: ["Pháp"],
    anh: ["Anh", "Vương quốc Anh"],
  };

  const countryDisplayNames = {
    "viet-nam": "Việt Nam",
    my: "Mỹ",
    "han-quoc": "Hàn Quốc",
    "trung-quoc": "Trung Quốc",
    "hong-kong": "Hồng Kông",
    "thai-lan": "Thái Lan",
    uc: "Úc",
    "dai-loan": "Đài Loan",
    "an-do": "Ấn Độ",
    phap: "Pháp",
    anh: "Anh",
  };

  useEffect(() => {
    const filterMoviesByCountry = () => {
      setLoading(true);
      const countryNames = countryMapping[country] || [];

      const filteredMovies = ALL_MOVIES.filter(
        (movie) =>
          movie.country &&
          countryNames.some((countryName) =>
            movie.country.includes(countryName)
          )
      );

      setMovies(filteredMovies);
      setLoading(false);
    };

    filterMoviesByCountry();
  }, [country]);

  const displayName = countryDisplayNames[country] || country;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Phim {displayName}
          </h1>
          <p className="text-gray-300 text-lg">
            Khám phá những bộ phim xuất sắc từ {displayName}
          </p>
          <div className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 h-1 w-24 rounded"></div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {movies.length}
                </div>
                <div className="text-gray-300">Tổng số phim</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {movies.filter((m) => m.type === "movie").length}
                </div>
                <div className="text-gray-300">Phim lẻ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {movies.filter((m) => m.type === "series").length}
                </div>
                <div className="text-gray-300">Phim bộ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">
              Không tìm thấy phim nào từ {displayName}
            </div>
            <p className="text-gray-500">
              Chúng tôi sẽ cập nhật thêm nhiều phim từ {displayName} trong thời
              gian tới.
            </p>
          </div>
        )}

        {/* Featured Section for popular countries */}
        {["my", "han-quoc", "trung-quoc"].includes(country) &&
          movies.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                Phim {displayName} được đánh giá cao
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movies
                  .filter((movie) => movie.rating >= 8.0)
                  .slice(0, 6)
                  .map((movie) => (
                    <MovieCard key={`featured-${movie.id}`} movie={movie} />
                  ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default CountryPage;
