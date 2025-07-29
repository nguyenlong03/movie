import { useState } from "react";
import { Search, Filter, Star, Film } from "lucide-react";
import { ACTORS } from "../data/mockData";

const ActorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const actorsPerPage = 24;

  const countries = [
    "Tất cả",
    "Việt Nam",
    "Mỹ",
    "Hàn Quốc",
    "Trung Quốc",
    "Nhật Bản",
    "Thái Lan",
  ];

  const sortOptions = [
    { label: "Phổ biến nhất", value: "popular" },
    { label: "Tên A-Z", value: "nameAsc" },
    { label: "Tên Z-A", value: "nameDesc" },
    { label: "Số phim nhiều nhất", value: "movieCount" },
    { label: "Đánh giá cao nhất", value: "rating" },
  ];

  // Filter and sort actors
  const filteredActors = ACTORS
    .filter((actor) => {
      const matchesSearch = actor.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCountry =
        selectedCountry === "Tất cả" || actor.country === selectedCountry;
      return matchesSearch && matchesCountry;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "movieCount":
          return b.movieCount - a.movieCount;
        case "rating":
          return b.rating - a.rating;
        default: // popular
          return b.movieCount * b.rating - a.movieCount * a.rating;
      }
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredActors.length / actorsPerPage);
  const startIndex = (currentPage - 1) * actorsPerPage;
  const endIndex = startIndex + actorsPerPage;
  const currentActors = filteredActors.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page when filters change
  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1);
    if (filterType === "country") setSelectedCountry(value);
    if (filterType === "sort") setSortBy(value);
    if (filterType === "search") setSearchQuery(value);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Diễn viên</h1>
        <p className="text-gray-400 text-lg">
          Khám phá những diễn viên tài năng từ khắp nơi trên thế giới
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm diễn viên..."
              value={searchQuery}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Country Filter */}
          <select
            value={selectedCountry}
            onChange={(e) => handleFilterChange("country", e.target.value)}
            className="bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-400">
          Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredActors.length)}{" "}
          của {filteredActors.length} diễn viên
          {searchQuery && ` cho "${searchQuery}"`}
          {selectedCountry !== "Tất cả" && ` từ ${selectedCountry}`}
        </p>
        <p className="text-gray-400">
          Trang {currentPage} / {totalPages}
        </p>
      </div>

      {/* Actors Grid */}
      {currentActors.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {currentActors.map((actor) => (
            <div
              key={actor.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={actor.image}
                  alt={actor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star
                        className="text-yellow-500 fill-current"
                        size={16}
                      />
                      <span className="font-semibold">{actor.rating}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Film className="text-orange-500" size={16} />
                      <span className="text-sm">{actor.movieCount} phim</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">
                  {actor.name}
                </h3>
                <p className="text-orange-500 text-sm mb-2">{actor.country}</p>
                <p className="text-gray-400 text-xs line-clamp-2">
                  {actor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800/50 rounded-lg p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Không tìm thấy diễn viên nào
          </h3>
          <p className="text-gray-400">
            Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc của bạn.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                    currentPage === page
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ActorsPage;
