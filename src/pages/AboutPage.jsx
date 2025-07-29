const AboutPage = () => {
  return (
    <div className="text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">Về MOVIE DEV</h1>
      <div className="space-y-6 bg-gray-800/50 rounded-lg p-8">
        <p className="text-lg leading-relaxed">
          Chào mừng bạn đến với MOVIE DEV, dự án được tạo ra với niềm đam mê
          điện ảnh và công nghệ. Đây là một nền tảng xem phim trực tuyến hiện
          đại, mang đến cho bạn trải nghiệm giải trí tuyệt vời nhất.
        </p>
        <p className="leading-relaxed text-gray-300">
          MOVIE DEV được xây dựng bằng những công nghệ web tiên tiến nhất, bao
          gồm React, TypeScript, và Tailwind CSS, đảm bảo một giao diện người
          dùng nhanh, mượt mà và đáp ứng tốt trên mọi thiết bị.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-3 text-orange-400">
            Sứ mệnh của chúng tôi
          </h2>
          <p className="leading-relaxed text-gray-300">
            Sứ mệnh của MOVIE DEV là tạo ra một không gian giải trí chất lượng
            cao, nơi mọi người có thể khám phá và thưởng thức những bộ phim hay
            nhất từ khắp nơi trên thế giới. Chúng tôi cam kết liên tục cập nhật
            nội dung mới và cải tiến nền tảng để phục vụ người dùng tốt hơn.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 text-orange-400">
            Liên hệ
          </h2>
          <p className="leading-relaxed text-gray-300">
            Mọi ý kiến đóng góp hoặc thắc mắc, xin vui lòng liên hệ với chúng
            tôi qua email:
            <a
              href="mailto:contact@moviedev.com"
              className="text-orange-500 hover:underline ml-2"
            >
              contact@moviedev.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
