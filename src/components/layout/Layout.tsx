import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:ml-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-4 lg:p-6 pt-20 lg:pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;