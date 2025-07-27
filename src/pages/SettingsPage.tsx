import React from 'react';
import { ChevronRight } from 'lucide-react';

// A simple toggle component to avoid complexity
const Toggle: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`w-12 h-6 rounded-full flex items-center px-1 ${active ? 'bg-orange-500 justify-end' : 'bg-gray-600 justify-start'}`}>
    <div className="w-4 h-4 bg-white rounded-full" />
  </div>
);

const SettingsPage: React.FC = () => {
  const settingsGroups = [
    {
      title: 'Tài khoản',
      items: [
        { label: 'Chỉnh sửa hồ sơ', action: 'navigate' as const },
        { label: 'Thay đổi mật khẩu', action: 'navigate' as const },
        { label: 'Quản lý thông báo', action: 'toggle' as const, active: false },
      ],
    },
    {
      title: 'Giao diện',
      items: [
        { label: 'Chế độ tối', action: 'toggle' as const, active: true },
        { label: 'Ngôn ngữ', action: 'select' as const, value: 'Tiếng Việt' },
      ],
    },
    {
      title: 'Chất lượng phát',
      items: [
        { label: 'Chất lượng mặc định', action: 'select' as const, value: 'Tự động' },
        { label: 'Tự động phát trailer', action: 'toggle' as const, active: true },
      ],
    },
  ];

  return (
    <div className="text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Cài đặt</h1>
      <div className="space-y-8">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-400">{group.title}</h2>
            <ul className="divide-y divide-gray-700">
              {group.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center justify-between py-4">
                  <span className="text-gray-300">{item.label}</span>
                  <div className="flex items-center gap-4">
                    {item.action === 'toggle' && (
                      <Toggle active={item.active} />
                    )}
                    {item.action === 'select' && (
                      <span className="text-gray-400">{item.value}</span>
                    )}
                    {(item.action === 'navigate' || item.action === 'select') && (
                      <ChevronRight size={20} className="text-gray-500" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
