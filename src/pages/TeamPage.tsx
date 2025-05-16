import React from 'react';
import { useApp } from '../contexts/AppContext';
import Card, { CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { UserPlus, Mail, Phone } from 'lucide-react';

const TeamPage: React.FC = () => {
  const { users } = useApp();
  
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin':
        return <Badge variant="info">Admin</Badge>;
      case 'purchase':
        return <Badge variant="success">Purchase</Badge>;
      case 'production':
        return <Badge variant="warning">Production</Badge>;
      case 'qc':
        return <Badge variant="error">Quality Control</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };
  
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
        <Button leftIcon={<UserPlus size={16} />}>
          Add Team Member
        </Button>
      </div>
      
      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={user.avatar || `https://i.pravatar.cc/150?img=${user.id}`}
                    alt={user.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                    {getRoleBadge(user.role)}
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail size={14} className="mr-1" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone size={14} className="mr-1" />
                      <span>+91 9876543210</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;