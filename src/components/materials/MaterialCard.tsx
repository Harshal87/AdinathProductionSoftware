import React, { useState } from 'react';
import { Material } from '../../types';
import Card, { CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Box, PlusCircle, MinusCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  const { updateMaterial, loading } = useApp();
  const [quantity, setQuantity] = useState(0);
  
  const isLowStock = material.quantity < material.minThreshold;
  
  const handleAddStock = () => {
    if (quantity <= 0) return;
    
    const updatedMaterial = {
      ...material,
      quantity: material.quantity + quantity,
    };
    
    updateMaterial(updatedMaterial);
    setQuantity(0);
  };
  
  const handleRemoveStock = () => {
    if (quantity <= 0 || quantity > material.quantity) return;
    
    const updatedMaterial = {
      ...material,
      quantity: material.quantity - quantity,
    };
    
    updateMaterial(updatedMaterial);
    setQuantity(0);
  };
  
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-blue-100 text-blue-700">
              <Box size={20} />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">{material.name}</h3>
              <p className="text-sm text-gray-500">Min: {material.minThreshold} {material.unit}</p>
            </div>
          </div>
          
          {isLowStock ? (
            <Badge variant="error">Low Stock</Badge>
          ) : (
            <Badge variant="success">In Stock</Badge>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">Current Stock</p>
            <p className={`text-2xl font-semibold ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
              {material.quantity} <span className="text-sm font-normal text-gray-500">{material.unit}</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="number"
                min="0"
                className="w-20 h-10 pl-2 pr-8 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                {material.unit}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<MinusCircle size={16} />}
          onClick={handleRemoveStock}
          disabled={quantity <= 0 || loading || quantity > material.quantity}
        >
          Remove
        </Button>
        
        <Button
          size="sm"
          leftIcon={<PlusCircle size={16} />}
          onClick={handleAddStock}
          disabled={quantity <= 0 || loading}
        >
          Add Stock
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaterialCard;