import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import Input from '../ui/Input';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/orders':
        return 'Orders';
      case '/materials':
        return 'Materials Inventory';
      case '/team':
        return 'Team Members';
      case '/settings':
        return 'Settings';
      default:
        return 'Adinath Industries';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm fixed top-0 right-0 left-0 lg:left-64 z-10 h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{getTitle()}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block w-64">
            <Input
              type="text"
              placeholder="Search..."
              className="text-sm"
              leftIcon={<Search size={16} />}
            />
          </div>
          
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-500" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;