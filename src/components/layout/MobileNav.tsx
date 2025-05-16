import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/helpers';
import { X, LayoutDashboard, Package, Boxes, Users, Settings, LogOut } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { currentUser } = useApp();
  const { signOut } = useAuth();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: 'Orders',
      href: '/orders',
      icon: <Package size={20} />,
    },
    {
      name: 'Materials',
      href: '/materials',
      icon: <Boxes size={20} />,
    },
    {
      name: 'Team',
      href: '/team',
      icon: <Users size={20} />,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: <Settings size={20} />,
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={cn(
      'fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden transition-opacity duration-200',
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    )}>
      <div className={cn(
        'fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-200 ease-in-out z-50',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Adinath</h1>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Production Management</p>
          </div>

          <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="px-2 space-y-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'bg-gray-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <span className={cn('mr-3', isActive ? 'text-blue-700' : 'text-gray-500')}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src={currentUser?.avatarUrl || 'https://i.pravatar.cc/150?img=1'}
                  alt={currentUser?.name || 'User avatar'}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                <p className="text-xs font-medium text-gray-500">{currentUser?.role}</p>
              </div>
              <button 
                onClick={handleSignOut}
                className="ml-auto p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;