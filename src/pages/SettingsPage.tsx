import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useApp } from '../contexts/AppContext';
import { Save, User, Mail, Building, Globe, BellRing } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { currentUser } = useApp();
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                  <Input
                    label="Full Name"
                    defaultValue={currentUser.name}
                    leftIcon={<User size={16} />}
                  />
                </div>
                
                <div className="w-full md:w-1/2">
                  <Input
                    label="Email Address"
                    defaultValue={currentUser.email}
                    leftIcon={<Mail size={16} />}
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                  <Input
                    label="Job Title"
                    defaultValue="Production Manager"
                    leftIcon={<Building size={16} />}
                  />
                </div>
                
                <div className="w-full md:w-1/2">
                  <Input
                    label="Phone Number"
                    defaultValue="+91 9876543210"
                    type="tel"
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button leftIcon={<Save size={16} />}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* User Avatar */}
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Profile Picture</h2>
            </CardHeader>
            
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={currentUser.avatar || `https://i.pravatar.cc/150?img=1`}
                  alt={currentUser.name}
                  className="h-32 w-32 rounded-full object-cover border border-gray-200"
                />
                <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
                  <User size={16} />
                </div>
              </div>
              
              <p className="text-sm text-gray-500 text-center">
                Upload a new avatar. JPG, GIF or PNG. Max size 1MB.
              </p>
              
              <div className="mt-4">
                <input type="file" className="sr-only" id="avatar-upload" />
                <label
                  htmlFor="avatar-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  Choose File
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Company Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Company Settings</h2>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <Input
                label="Company Name"
                defaultValue="Adinath Industries"
                leftIcon={<Building size={16} />}
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <Input
                label="Company Website"
                defaultValue="https://adinathindustries.com"
                leftIcon={<Globe size={16} />}
              />
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Allowed Email Domains for Team Members
              </label>
              <p className="text-xs text-gray-500">
                Only users with email addresses from these domains can join your team.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md">
              <div className="bg-blue-100 text-blue-800 text-sm rounded px-2 py-1 flex items-center">
                adinathindustries.com
                <button className="ml-1 text-blue-600 hover:text-blue-800">×</button>
              </div>
              
              <input
                type="text"
                placeholder="Add domain..."
                className="flex-1 min-w-[150px] border-0 focus:ring-0 text-sm p-1"
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button leftIcon={<Save size={16} />}>
            Save Company Settings
          </Button>
        </CardFooter>
      </Card>
      
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BellRing size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">New Order Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications when new orders are created</p>
                </div>
              </div>
              
              <div className="relative inline-block w-10 align-middle select-none">
                <input
                  type="checkbox"
                  id="toggle-new-orders"
                  defaultChecked
                  className="sr-only"
                />
                <label
                  htmlFor="toggle-new-orders"
                  className="block h-6 overflow-hidden rounded-full bg-gray-200 cursor-pointer"
                >
                  <span
                    className="absolute block h-6 w-6 rounded-full bg-white border border-gray-200 transform transition-transform duration-200 ease-in-out translate-x-4"
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BellRing size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Low Stock Alerts</p>
                  <p className="text-xs text-gray-500">Get notified when materials reach low stock threshold</p>
                </div>
              </div>
              
              <div className="relative inline-block w-10 align-middle select-none">
                <input
                  type="checkbox"
                  id="toggle-low-stock"
                  defaultChecked
                  className="sr-only"
                />
                <label
                  htmlFor="toggle-low-stock"
                  className="block h-6 overflow-hidden rounded-full bg-gray-200 cursor-pointer"
                >
                  <span
                    className="absolute block h-6 w-6 rounded-full bg-white border border-gray-200 transform transition-transform duration-200 ease-in-out translate-x-4"
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BellRing size={20} className="text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Stage Updates</p>
                  <p className="text-xs text-gray-500">Get notified when order stages are updated</p>
                </div>
              </div>
              
              <div className="relative inline-block w-10 align-middle select-none">
                <input
                  type="checkbox"
                  id="toggle-stage-updates"
                  className="sr-only"
                />
                <label
                  htmlFor="toggle-stage-updates"
                  className="block h-6 overflow-hidden rounded-full bg-gray-200 cursor-pointer"
                >
                  <span
                    className="absolute block h-6 w-6 rounded-full bg-white border border-gray-200 transform transition-transform duration-200 ease-in-out"
                  ></span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button leftIcon={<Save size={16} />}>
            Save Notification Preferences
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsPage;