import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import MaterialCard from '../components/materials/MaterialCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Search, Plus, Filter } from 'lucide-react';

const MaterialsPage: React.FC = () => {
  const { materials } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'low_stock' | 'in_stock'>('all');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = 
      material.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'low_stock' && material.quantity < material.minThreshold) || 
      (filter === 'in_stock' && material.quantity >= material.minThreshold);
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 md:mb-0">Materials Inventory</h2>
        
        <div className="flex flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-64">
            <Input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={handleSearch}
              leftIcon={<Search size={16} />}
            />
          </div>
          
          <div className="flex space-x-4">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'low_stock' | 'in_stock')}
              >
                <option value="all">All Materials</option>
                <option value="low_stock">Low Stock</option>
                <option value="in_stock">In Stock</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <Filter size={16} />
              </div>
            </div>
            
            <Button leftIcon={<Plus size={16} />}>
              New Material
            </Button>
          </div>
        </div>
      </div>
      
      {/* Materials Grid */}
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No materials found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default MaterialsPage;