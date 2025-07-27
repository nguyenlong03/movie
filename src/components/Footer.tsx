import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/70 backdrop-blur-sm border-t border-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold mb-4 text-white">
              <Film className="text-orange-500" size={28} />
              <span>MOVIE DEV</span>
            </Link>
            <p className="text-sm mb-4">
              Nền tảng xem phim trực tuyến hàng đầu, mang đến những bộ phim bom tấn với chất lượng cao và trải nghiệm mượt mà.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Khám phá</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/trending" className="hover:text-orange-500 transition-colors">Phim hot</Link></li>
              <li><Link to="/latest" className="hover:text-orange-500 transition-colors">Mới cập nhật</Link></li>
              <li><Link to="/top-rated" className="hover:text-orange-500 transition-colors">Xếp hạng cao</Link></li>
              <li><Link to="/movies" className="hover:text-orange-500 transition-colors">Phim lẻ</Link></li>
              <li><Link to="/series" className="hover:text-orange-500 transition-colors">Phim bộ</Link></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-orange-500 transition-colors">Trung tâm trợ giúp</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">Về chúng tôi</Link></li>
              <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Điều khoản dịch vụ</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Chính sách bảo mật</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Đăng ký nhận tin</h3>
            <p className="text-sm mb-4">Nhận thông tin cập nhật về phim mới và các chương trình khuyến mãi.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-full text-sm"
              />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md transition-colors">
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MOVIE DEV. All Rights Reserved. </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;