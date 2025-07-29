import { useParams } from 'react-router-dom';
import { Film, Star, Calendar, MapPin, Users, Tag } from 'lucide-react';

const PlaceholderPage = ({ title, description }) => {
  const { type, name } = useParams();
  
  const getPageInfo = () => {
    const path = window.location.pathname;
    
    if (path.includes('/country/')) {
      return {
        title: `Phim ${name?.replace(/-/g, ' ')?.toUpperCase() || 'Quốc gia'}`,
        description: `Khám phá những bộ phim hay nhất từ ${name?.replace(/-/g, ' ') || 'quốc gia này'}`,
        icon: <MapPin className="text-orange-500" size={48} />
      };
    }
    
    if (path.includes('/actors/')) {
      return {
        title: `Diễn viên ${name?.replace(/-/g, ' ')?.toLowerCase() || ''}`,
        description: `Tìm hiểu về các diễn viên tài năng và những tác phẩm nổi bật`,
        icon: <Users className="text-orange-500" size={48} />
      };
    }
    
    if (path.includes('/topic/')) {
      return {
        title: `Chủ đề: ${name?.replace(/-/g, ' ')?.toLowerCase() || ''}`,
        description: `Khám phá những bộ phim thuộc chủ đề này`,
        icon: <Tag className="text-orange-500" size={48} />
      };
    }
    
    return {
      title: title || 'Trang đang phát triển',
      description: description || 'Nội dung sẽ được cập nhật sớm',
      icon: <Film className="text-orange-500" size={48} />
    };
  };

  const pageInfo = getPageInfo();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-8">
            {pageInfo.icon}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {pageInfo.title}
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl">
            {pageInfo.description}
          </p>
          
          <div className="bg-gray-800/50 rounded-lg p-8 max-w-3xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="text-yellow-500" size={24} />
              <span className="text-lg font-semibold">Tính năng đang được phát triển</span>
            </div>
            
            <p className="text-gray-300 mb-6">
              Chúng tôi đang làm việc chăm chỉ để mang đến cho bạn những tính năng tuyệt vời nhất. 
              Trang này sẽ sớm có nội dung phong phú và hấp dẫn.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <Calendar className="text-orange-500 mb-2" size={20} />
                <div className="font-semibold mb-1">Sắp ra mắt</div>
                <div className="text-gray-400">Nội dung đầy đủ</div>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <Film className="text-orange-500 mb-2" size={20} />
                <div className="font-semibold mb-1">Phim chất lượng</div>
                <div className="text-gray-400">HD và 4K</div>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <Star className="text-orange-500 mb-2" size={20} />
                <div className="font-semibold mb-1">Trải nghiệm tốt</div>
                <div className="text-gray-400">Giao diện thân thiện</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors"
            >
              Quay lại trang trước
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
