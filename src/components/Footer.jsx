import { Link } from "react-router-dom";
import {
  Film,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  Star,
  Play,
  Award,
  Users,
  Heart,
  Download,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import useCountUp from "../hooks/useCountUp";

const Footer = () => {
  // Counter animations for stats
  const movieCount = useCountUp("10,000+", 2000);
  const userCount = useCountUp("1M+", 2200);
  const countryCount = useCountUp("50+", 1800);
  const ratingCount = useCountUp("4.8/5", 2400);

  const socialLinks = [
    {
      href: "#",
      icon: Facebook,
      name: "Facebook",
      color: "hover:text-blue-500",
      bgColor: "hover:bg-blue-500/10",
    },
    {
      href: "#",
      icon: Instagram,
      name: "Instagram",
      color: "hover:text-pink-500",
      bgColor: "hover:bg-pink-500/10",
    },
    {
      href: "#",
      icon: Twitter,
      name: "Twitter",
      color: "hover:text-sky-500",
      bgColor: "hover:bg-sky-500/10",
    },
    {
      href: "#",
      icon: Youtube,
      name: "Youtube",
      color: "hover:text-red-500",
      bgColor: "hover:bg-red-500/10",
    },
  ];

  const footerSections = [
    {
      title: "Phim",
      icon: Play,
      links: [
        { href: "/movies", label: "Phim mới", icon: Star },
        { href: "/movies", label: "Phim hot", icon: Heart },
        { href: "/movies", label: "Phim chiếu rạp", icon: Award },
        { href: "/movies", label: "Phim sắp chiếu", icon: Download },
      ],
    },
    {
      title: "Thể loại",
      icon: Film,
      links: [
        { href: "/genre/action", label: "Hành động" },
        { href: "/genre/drama", label: "Tâm lý" },
        { href: "/genre/comedy", label: "Hài hước" },
        { href: "/genre/horror", label: "Kinh dị" },
      ],
    },
    {
      title: "Thông tin",
      icon: Users,
      links: [
        { href: "/about", label: "Giới thiệu" },
        { href: "/help", label: "Trợ giúp" },
        { href: "/settings", label: "Cài đặt" },
        { href: "/about", label: "Liên hệ" },
      ],
    },
  ];

  const stats = [
    { label: "Bộ phim", value: "10,000+", icon: Film, countUp: movieCount },
    { label: "Người dùng", value: "1M+", icon: Users, countUp: userCount },
    { label: "Quốc gia", value: "50+", icon: Globe, countUp: countryCount },
    { label: "Đánh giá", value: "4.8/5", icon: Star, countUp: ratingCount },
  ];

  const contactInfo = [
    { icon: Mail, text: "contact@movie.com" },
    { icon: Phone, text: "+84 123 456 789" },
    { icon: MapPin, text: "Hà Nội, Việt Nam" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-500/5 to-transparent rounded-full"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section: Brand and Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 pb-16 border-b border-gray-800/50">
          <div className="flex-1 max-w-2xl">
            <Link
              to="/"
              className="inline-flex items-center gap-4 text-4xl font-bold tracking-wider mb-6 group"
            >
              <div className="relative p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Film size={40} className="text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-colors"></div>
              </div>
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
                MOVIE
              </span>
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Nền tảng giải trí hàng đầu với kho tàng phim ảnh phong phú. Trải
              nghiệm điện ảnh đỉnh cao với chất lượng 4K và âm thanh sống động.
            </p>

            {/* Stats */}
            <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="stat-item text-center lg:text-left transform transition-all duration-500 hover:scale-105"
                  ref={stat.countUp.ref}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animation: 'counter-enter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon size={20} className="stat-icon text-orange-400" />
                    <span className="stat-value text-2xl font-bold counter-animation">
                      {stat.countUp.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 transition-colors duration-300 hover:text-gray-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
              Đăng ký nhận tin
            </h3>
            <p className="text-gray-400 mb-6">
              Nhận thông báo về phim mới, ưu đãi đặc biệt và nội dung độc quyền.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-2 flex items-center justify-center w-12 h-12 my-1 text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-xl transition-all duration-300 group"
                  aria-label="Subscribe to newsletter"
                >
                  <Send
                    size={20}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Middle Section: Links and Contact */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
          {/* Contact Info */}
          <div className="col-span-2">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Mail className="text-orange-400" size={20} />
              Liên hệ
            </h3>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors"
                >
                  <contact.icon size={18} />
                  <span>{contact.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <section.icon className="text-orange-400" size={20} />
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 group"
                    >
                      {link.icon && (
                        <link.icon
                          size={14}
                          className="group-hover:text-orange-400"
                        />
                      )}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Social and Copyright */}
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-8 pt-8 border-t border-gray-800/50">
          <div className="text-center lg:text-left">
            <p className="text-gray-400 mb-2">
              &copy; {new Date().getFullYear()} MOVIE Platform. All rights
              reserved.
            </p>
            <p className="text-sm text-gray-500">
              Xây dựng và phát triển bởi{" "}
              <span className="text-orange-400 font-semibold">Long Nguyen</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm mr-2">
              Theo dõi chúng tôi:
            </span>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-400 ${social.color} ${social.bgColor} transition-all duration-300 hover:scale-110 hover:border-current/50 group`}
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
