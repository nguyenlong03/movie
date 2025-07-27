import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-400">
        {description || `Đây là trang ${title}. Nội dung cho trang này sẽ được cập nhật sớm.`}
      </p>
    </div>
  );
};

export default PlaceholderPage;
