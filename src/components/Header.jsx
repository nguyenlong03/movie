import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Menu, Film, Bell, User, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const { isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Trang chủ", path: "/" },
    { name: "Phim lẻ", path: "/movies" },
    { name: "Phim bộ", path: "/series" },
    { name: "Diễn viên", path: "/actors" },
  ];

  const genreLinks = [
    { name: "Hành động", path: "/genre/hanh-dong" },
    { name: "Tình cảm", path: "/genre/tinh-cam" },
    { name: "Hài hước", path: "/genre/hai-huoc" },
    { name: "Kinh dị", path: "/genre/kinh-di" },
    { name: "Khoa học viễn tưởng", path: "/genre/khoa-hoc-vien-tuong" },
    { name: "Phiêu lưu", path: "/genre/phieu-luu" },
    { name: "Chính kịch", path: "/genre/chinh-kich" },
    { name: "Siêu anh hùng", path: "/genre/sieu-anh-hung" },
  ];

  const countryLinks = [
    { name: " Việt Nam", path: "/country/viet-nam" },
    { name: " Mỹ", path: "/country/my" },
    { name: " Hàn Quốc", path: "/country/han-quoc" },
    { name: " Trung Quốc", path: "/country/trung-quoc" },
    { name: " Hồng Kông", path: "/country/hong-kong" },
    { name: " Thái Lan", path: "/country/thai-lan" },
    { name: " Úc", path: "/country/uc" },
    { name: "Đài Loan", path: "/country/dai-loan" },
    { name: " Ấn Độ", path: "/country/an-do" },
    { name: " Pháp", path: "/country/phap" },
    { name: " Anh", path: "/country/anh" },
  ];

  const actorLinks = [
    { name: "Diễn viên nổi tiếng", path: "/actors/popular" },
    { name: "Diễn viên Việt Nam", path: "/actors/vietnam" },
    { name: "Diễn viên Hollywood", path: "/actors/hollywood" },
    { name: "Diễn viên Hàn Quốc", path: "/actors/korea" },
  ];

  const topicLinks = [
    { name: "🎬 Phim bom tấn", path: "/topic/blockbuster" },
    { name: "🏆 Phim kinh điển", path: "/topic/classic" },
    { name: "🎭 Phim độc lập", path: "/topic/independent" },
    { name: "📚 Phim tài liệu", path: "/topic/documentary" },
    { name: "🎨 Phim hoạt hình", path: "/topic/animation" },
    { name: "💕 Phim tình cảm", path: "/topic/romance" },
    { name: "👻 Phim kinh dị", path: "/topic/horror" },
    { name: "😂 Phim hài", path: "/topic/comedy" },
    { name: "🦸 Siêu anh hùng", path: "/topic/superhero" },
    { name: "🚀 Khoa học viễn tưởng", path: "/topic/sci-fi" },
  ];

  const discoverLinks = [
    { name: "Phim hot", path: "/trending" },
    { name: "Mới cập nhật", path: "/latest" },
    { name: "Xếp hạng cao", path: "/top-rated" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg"
            : "bg-gradient-to-b from-white/80 dark:from-gray-900/80 to-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white"
            >
              <Film className="text-orange-500" size={28} />
              <span className="hidden sm:block">MOVIE DEV</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="flex items-center font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors">
                Thể loại <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute top-full left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px] p-2 mt-2 z-50 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-1">
                  {genreLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm transition-colors text-gray-700 dark:text-gray-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors">
                Quốc gia <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute top-full left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[180px] p-2 mt-2 z-50 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-1">
                  {countryLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm transition-colors whitespace-nowrap text-gray-700 dark:text-gray-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors">
                Chủ đề <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute top-full left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[220px] p-2 mt-2 z-50 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-1">
                  {topicLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm transition-colors whitespace-nowrap text-gray-700 dark:text-gray-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors">
                Khám phá <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute top-full left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[150px] p-2 mt-2 border border-gray-200 dark:border-gray-700">
                {discoverLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm phim..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full py-2 pl-4 pr-10 w-[150px] sm:w-[250px] focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 dark:border-gray-600"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              >
                <Search size={20} />
              </button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
              <Bell size={20} />
            </button>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                  <User
                    size={18}
                    className="text-gray-600 dark:text-gray-400"
                  />
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                  <Link
                    to="/playlist"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Danh sách phát
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Đăng ký
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Cài đặt
                  </Link>
                  <Link
                    to="/help"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Trợ giúp
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors md:hidden text-gray-700 dark:text-gray-300"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white/95 dark:bg-gray-900/95 z-40 md:hidden transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container mx-auto px-4 pt-20">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-4">
              <p className="text-orange-500 font-semibold mb-2">Thể loại</p>
              {genreLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors py-1 pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-4">
              <p className="text-orange-500 font-semibold mb-2">Quốc gia</p>
              {countryLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors py-1 pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-4">
              <p className="text-orange-500 font-semibold mb-2">Chủ đề</p>
              {topicLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors py-1 pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-300 dark:border-gray-700 pt-4 mt-4">
              <p className="text-orange-500 font-semibold mb-2">Khám phá</p>
              {discoverLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors py-1 pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
