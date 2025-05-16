import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Package, ChevronRight, Shield } from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Adinath Industries</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/admin">
                <Button leftIcon={<Shield size={16} />}>Admin Portal</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Production Management
              <span className="block text-blue-600">Simplified</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Streamline your manufacturing process with our comprehensive production management system.
              Track orders, manage inventory, and coordinate team activities all in one place.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link to="/login">
                <Button size="lg" rightIcon={<ChevronRight size={16} />}>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative rounded-2xl border border-gray-200 p-8 hover:border-blue-600 transition-colors">
              <div className="absolute -top-4 left-4">
                <div className="inline-flex items-center justify-center rounded-xl bg-blue-600 p-2">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Order Management</h3>
              <p className="mt-2 text-gray-500">
                Track orders from receipt to dispatch with our comprehensive order management system.
              </p>
            </div>
            
            <div className="relative rounded-2xl border border-gray-200 p-8 hover:border-blue-600 transition-colors">
              <div className="absolute -top-4 left-4">
                <div className="inline-flex items-center justify-center rounded-xl bg-blue-600 p-2">
                  <Building className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Inventory Control</h3>
              <p className="mt-2 text-gray-500">
                Maintain optimal stock levels with real-time inventory tracking and automated alerts.
              </p>
            </div>
            
            <div className="relative rounded-2xl border border-gray-200 p-8 hover:border-blue-600 transition-colors">
              <div className="absolute -top-4 left-4">
                <div className="inline-flex items-center justify-center rounded-xl bg-blue-600 p-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Team Collaboration</h3>
              <p className="mt-2 text-gray-500">
                Enable seamless communication and coordination between team members across departments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <p className="ml-2 text-sm text-gray-500">© 2025 Adinath Industries. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;