import React from 'react';
import { formatDate, getStageLabel } from '../../utils/helpers';
import { Order } from '../../types';
import Card, { CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { ChevronRight, Clock } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onClick: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
  const getStatusVariant = (stage: string) => {
    switch(stage) {
      case 'dispatched':
        return 'success';
      case 'quality_check':
        return 'info';
      case 'order_received':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  return (
    <Card 
      className="transition-all duration-200 hover:translate-y-[-4px]" 
      hoverable 
      onClick={() => onClick(order)}
    >
      <CardContent className="p-0">
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
            <Badge variant={getStatusVariant(order.currentStage)}>
              {getStageLabel(order.currentStage)}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-gray-600">{order.clientName}</p>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Clock size={14} className="mr-1" />
              <span>Updated {formatDate(order.lastUpdated)}</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;