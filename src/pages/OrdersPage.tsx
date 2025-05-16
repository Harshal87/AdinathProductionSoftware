import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import OrderCard from '../components/dashboard/OrderCard';
import OrderDetail from '../components/orders/OrderDetail';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Search, Filter, Plus } from 'lucide-react';
import { OrderStage } from '../types';

const OrdersPage: React.FC = () => {
  const { orders, selectedOrder, selectOrder } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<OrderStage | 'all'>('all');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || order.currentStage === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  if (selectedOrder) {
    return <OrderDetail order={selectedOrder} onBack={() => selectOrder(null)} />;
  }
  
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 md:mb-0">Orders</h2>
        
        <div className="flex flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-64">
            <Input
              type="text"
              placeholder="Search orders..."
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
                onChange={(e) => setFilter(e.target.value as OrderStage | 'all')}
              >
                <option value="all">All Stages</option>
                <option value="order_received">Order Received</option>
                <option value="po_uploaded">PO Uploaded</option>
                <option value="material_allocation">Material Allocation</option>
                <option value="printing_in_progress">Printing in Progress</option>
                <option value="quality_check">Quality Check</option>
                <option value="dispatched">Dispatched</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <Filter size={16} />
              </div>
            </div>
            
            <Button leftIcon={<Plus size={16} />}>
              New Order
            </Button>
          </div>
        </div>
      </div>
      
      {/* Orders Grid */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={selectOrder}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No orders found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;