import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="flex-grow p-4 pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;