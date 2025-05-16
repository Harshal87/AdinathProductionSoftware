import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import SummaryCard from '../components/dashboard/SummaryCard';
import OrderCard from '../components/dashboard/OrderCard';
import Button from '../components/ui/Button';
import { Package, FileWarning, CheckSquare, AlertOctagon, Plus, BarChart3 } from 'lucide-react';
import { getActiveOrders, getPendingPOOrders, getOrdersInQC, getLowStockMaterials } from '../utils/mockData';

const DashboardPage: React.FC = () => {
  const { orders, materials, selectOrder } = useApp();
  
  const activeOrders = getActiveOrders();
  const pendingPOOrders = getPendingPOOrders();
  const ordersInQC = getOrdersInQC();
  const lowStockMaterials = getLowStockMaterials();
  
  const recentOrders = [...orders]
    .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <SummaryCard
          title="Active Orders"
          value={activeOrders.length}
          icon={<Package size={24} className="text-blue-600" />}
          color="border-blue-600"
          change={5}
          onClick={() => {}}
        />
        
        <SummaryCard
          title="PO Pending"
          value={pendingPOOrders.length}
          icon={<FileWarning size={24} className="text-yellow-600" />}
          color="border-yellow-600"
          change={-12}
          onClick={() => {}}
        />
        
        <SummaryCard
          title="Orders in QC"
          value={ordersInQC.length}
          icon={<CheckSquare size={24} className="text-green-600" />}
          color="border-green-600"
          change={8}
          onClick={() => {}}
        />
        
        <SummaryCard
          title="Low Stock Materials"
          value={lowStockMaterials.length}
          icon={<AlertOctagon size={24} className="text-red-600" />}
          color="border-red-600"
          change={2}
          onClick={() => {}}
        />
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link to="/orders">
            <Button 
              variant="outline" 
              size="sm"
              rightIcon={<BarChart3 size={16} />}
            >
              View All Orders
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {recentOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={(order) => {
                selectOrder(order);
                window.location.href = '/orders';
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Low Stock Materials */}
      <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Low Stock Materials</h2>
          <Link to="/materials">
            <Button 
              variant="outline" 
              size="sm"
              rightIcon={<Plus size={16} />}
            >
              Manage Inventory
            </Button>
          </Link>
        </div>
        
        <div className="overflow-x-auto -mx-4 lg:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Material
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stock
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Minimum Required
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockMaterials.map((material) => (
                  <tr key={material.id}>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{material.name}</div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{material.quantity} {material.unit}</div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{material.minThreshold} {material.unit}</div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Low Stock
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;