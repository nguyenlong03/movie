import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Search } from "lucide-react";
import MovieCard from "../components/MovieCard";
import {
  ALL_MOVIES,
  TRENDING_MOVIES,
  NEW_RELEASES,
  POPULAR_SERIES,
  TOP_RATED_MOVIES,
} from "../data/mockData";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);

  // Create a comprehensive movie database from all available movies
  const allMoviesDatabase = [
    ...ALL_MOVIES,
    ...TRENDING_MOVIES,
    ...NEW_RELEASES,
    ...POPULAR_SERIES,
    ...TOP_RATED_MOVIES,
  ].filter(
    (movie, index, self) =>
      // Remove duplicates based on movie id
      index === self.findIndex((m) => m.id === movie.id)
  );

  // Genres for filtering
  const genres = [
    "Tất cả",
    "Hành động",
    "Phiêu lưu",
    "Hoạt hình",
    "Hài hước",
    "Tội phạm",
    "Tài liệu",
    "Chính kịch",
    "Gia đình",
    "Giả tưởng",
    "Kinh dị",
    "Tình cảm",
    "Khoa học viễn tưởng",
    "Thriller",
  ];

  const [selectedGenre, setSelectedGenre] = useState("Tất cả");

  // Countries for filtering
  const countries = [
    "Tất cả",
    "Việt Nam",
    "Mỹ",
    "Hàn Quốc",
    "Trung Quốc",
    "Nhật Bản",
    "Thái Lan",
    "Ấn Độ",
    "Anh",
    "Pháp",
  ];

  const [selectedCountry, setSelectedCountry] = useState("Tất cả");

  // Years for filtering
  const years = [
    "Tất cả",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2015-2019",
    "2010-2014",
    "Trước 2010",
  ];

  const [selectedYear, setSelectedYear] = useState("Tất cả");

  // Sort options
  const sortOptions = [
    { label: "Mới nhất", value: "newest" },
    { label: "Cũ nhất", value: "oldest" },
    { label: "Xếp hạng cao nhất", value: "rating" },
    { label: "Tên A-Z", value: "nameAsc" },
    { label: "Tên Z-A", value: "nameDesc" },
  ];

  const [sortBy, setSortBy] = useState("newest");

  // Function to normalize Vietnamese text for better search
  const normalizeText = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d");
  };

  // Enhanced search function
  const performSearch = (searchTerm, genre, country, year, sort) => {
    let filteredResults = [...allMoviesDatabase];

    // Search by title, description, cast, and genres
    if (searchTerm && searchTerm.trim()) {
      const normalizedSearchTerm = normalizeText(searchTerm.trim());

      filteredResults = filteredResults.filter((movie) => {
        // Normalize all movie fields for comparison
        const normalizedTitle = normalizeText(movie.title);
        const normalizedOriginalTitle = normalizeText(movie.originalTitle);
        const normalizedDescription = normalizeText(movie.description);

        // Check if search term matches title (prioritize exact matches)
        const titleMatch = normalizedTitle.includes(normalizedSearchTerm);
        const originalTitleMatch =
          normalizedOriginalTitle.includes(normalizedSearchTerm);

        // Check other fields
        const descriptionMatch =
          normalizedDescription.includes(normalizedSearchTerm);
        const castMatch = movie.cast?.some((actor) =>
          normalizeText(actor).includes(normalizedSearchTerm)
        );
        const genreMatch = movie.genres?.some((g) =>
          normalizeText(g).includes(normalizedSearchTerm)
        );

        return (
          titleMatch ||
          originalTitleMatch ||
          descriptionMatch ||
          castMatch ||
          genreMatch
        );
      });

      // Sort by relevance: exact title matches first, then partial matches
      filteredResults.sort((a, b) => {
        const aTitle = normalizeText(a.title);
        const bTitle = normalizeText(b.title);
        const searchTerm = normalizedSearchTerm;

        // Exact title match
        if (aTitle === searchTerm && bTitle !== searchTerm) return -1;
        if (bTitle === searchTerm && aTitle !== searchTerm) return 1;

        // Title starts with search term
        if (aTitle.startsWith(searchTerm) && !bTitle.startsWith(searchTerm))
          return -1;
        if (bTitle.startsWith(searchTerm) && !aTitle.startsWith(searchTerm))
          return 1;

        // Title contains search term
        if (aTitle.includes(searchTerm) && !bTitle.includes(searchTerm))
          return -1;
        if (bTitle.includes(searchTerm) && !aTitle.includes(searchTerm))
          return 1;

        return 0;
      });
    }

    // Filter by genre
    if (genre !== "Tất cả") {
      filteredResults = filteredResults.filter((movie) =>
        movie.genres?.some((g) => g.toLowerCase().includes(genre.toLowerCase()))
      );
    }

    // Filter by country
    if (country !== "Tất cả") {
      filteredResults = filteredResults.filter((movie) =>
        movie.country?.toLowerCase().includes(country.toLowerCase())
      );
    }

    // Filter by year
    if (year !== "Tất cả") {
      if (year.includes("-")) {
        const [startYear, endYear] = year.split("-").map(Number);
        filteredResults = filteredResults.filter((movie) => {
          const movieYear = movie.year;
          return movieYear >= startYear && movieYear <= endYear;
        });
      } else if (year === "Trước 2010") {
        filteredResults = filteredResults.filter((movie) => movie.year < 2010);
      } else {
        filteredResults = filteredResults.filter(
          (movie) => movie.year === Number(year)
        );
      }
    }

    // Sort results
    switch (sort) {
      case "newest":
        filteredResults.sort((a, b) => b.year - a.year);
        break;
      case "oldest":
        filteredResults.sort((a, b) => a.year - b.year);
        break;
      case "rating":
        filteredResults.sort((a, b) => b.rating - a.rating);
        break;
      case "nameAsc":
        filteredResults.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "nameDesc":
        filteredResults.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filteredResults;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const results = performSearch(
      searchQuery,
      selectedGenre,
      selectedCountry,
      selectedYear,
      sortBy
    );
    setResults(results);
  };

  useEffect(() => {
    // Perform search when component mounts or query changes
    const results = performSearch(
      query,
      selectedGenre,
      selectedCountry,
      selectedYear,
      sortBy
    );
    setResults(results);
    setSearchQuery(query);
  }, [query, selectedGenre, selectedCountry, selectedYear, sortBy]);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {query ? `Kết quả tìm kiếm: "${query}"` : "Tìm kiếm phim"}
          </h1>
          <p className="text-gray-400">
            Tìm thấy {results.length} phim
            {query ? ` phù hợp với tìm kiếm của bạn` : ` trong cơ sở dữ liệu`}
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 text-white rounded-full py-2 pl-4 pr-12 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 transition-colors"
          >
            <Search size={16} />
          </button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div
          className={`md:w-64 shrink-0 bg-gray-800 rounded-lg p-4 ${
            filterOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Bộ lọc</h2>
            <button
              onClick={() => setFilterOpen(false)}
              className="md:hidden p-1 rounded-full hover:bg-gray-700 transition-colors"
            >
              &times;
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Thể loại
              </h3>
              <div className="space-y-1">
                {genres.map((genre) => (
                  <label key={genre} className="flex items-center">
                    <input
                      type="radio"
                      name="genre"
                      value={genre}
                      checked={selectedGenre === genre}
                      onChange={() => setSelectedGenre(genre)}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 bg-gray-700"
                    />
                    <span className="ml-2 text-sm">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Quốc gia
              </h3>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Năm phát hành
              </h3>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Sắp xếp theo
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors">
              Áp dụng
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setFilterOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Filter size={16} />
              <span>Bộ lọc</span>
            </button>

            <div className="hidden sm:block">
              <span className="text-gray-400">Sắp xếp theo:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="ml-2 bg-gray-800 text-white rounded-lg py-1 px-3 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-lg p-8 text-center">
              <p className="text-xl font-semibold mb-2">
                Không tìm thấy kết quả nào
              </p>
              <p className="text-gray-400">
                Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc của bạn.
              </p>
            </div>
          )}

          {/* Pagination */}
          {results.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-1">
                <button className="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                  &lt;
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-orange-500 rounded-full">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-full transition-colors">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-full transition-colors">
                  3
                </button>
                <span className="px-2">...</span>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-full transition-colors">
                  10
                </button>
                <button className="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                  &gt;
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
