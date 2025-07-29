import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Làm thế nào để tìm kiếm phim?",
      answer:
        "Bạn có thể sử dụng thanh tìm kiếm ở đầu trang. Chỉ cần nhập tên phim, diễn viên hoặc đạo diễn bạn muốn tìm và nhấn Enter.",
    },
    {
      question: "Chất lượng phim có tốt không?",
      answer:
        "Chúng tôi cung cấp nhiều tùy chọn chất lượng, từ HD, FullHD đến 4K, tùy thuộc vào từng bộ phim. Bạn có thể chọn chất lượng phù hợp với tốc độ mạng của mình.",
    },
    {
      question: "Làm sao để tạo tài khoản?",
      answer:
        'Nhấp vào nút "Đăng ký" ở góc trên bên phải, điền thông tin cần thiết và bạn sẽ có ngay một tài khoản để trải nghiệm đầy đủ các tính năng.',
    },
    {
      question: "Tôi có thể xem phim trên những thiết bị nào?",
      answer:
        "MOVIE DEV tương thích với hầu hết các thiết bị, bao gồm máy tính, máy tính bảng và điện thoại thông minh. Giao diện sẽ tự động điều chỉnh để phù hợp với màn hình của bạn.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Trung tâm trợ giúp</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-800/50 rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-6 text-left"
            >
              <span className="text-lg font-medium text-gray-200">
                {faq.question}
              </span>
              {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-6 text-gray-400">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpPage;
