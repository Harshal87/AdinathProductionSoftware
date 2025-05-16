import { OrderStage, OrderStatus } from '../types';
import { format, isToday, isYesterday } from 'date-fns';

export const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return `Today, ${format(date, 'h:mm a')}`;
  } else if (isYesterday(date)) {
    return `Yesterday, ${format(date, 'h:mm a')}`;
  } else {
    return format(date, 'MMM d, yyyy');
  }
};

export const getStageLabel = (stage: OrderStage): string => {
  const stageMap: Record<OrderStage, string> = {
    order_received: 'Order Received',
    po_uploaded: 'PO Uploaded',
    material_allocation: 'Material Allocation',
    printing_in_progress: 'Printing in Progress',
    quality_check: 'Quality Check',
    dispatched: 'Dispatched'
  };
  
  return stageMap[stage] || stage;
};

export const getStatusColor = (status: OrderStatus): string => {
  const statusColorMap: Record<OrderStatus, string> = {
    pending: 'bg-gray-200 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };
  
  return statusColorMap[status];
};

export const getStageNumber = (stage: OrderStage): number => {
  const stageOrder: OrderStage[] = [
    'order_received',
    'po_uploaded',
    'material_allocation',
    'printing_in_progress',
    'quality_check',
    'dispatched'
  ];
  
  return stageOrder.indexOf(stage) + 1;
};

export const cn = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};