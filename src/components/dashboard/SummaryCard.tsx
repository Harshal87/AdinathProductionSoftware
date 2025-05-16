import React from 'react';
import Card from '../ui/Card';
import { cn } from '../../utils/helpers';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  change?: number;
  onClick?: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  color,
  change,
  onClick,
}) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className={cn('transition-all duration-200 border-l-4', color)} hoverable onClick={onClick}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold text-gray-900">{value}</h3>
            
            {typeof change !== 'undefined' && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    'text-xs font-medium mr-1.5',
                    isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'
                  )}
                >
                  {Math.abs(change)}%
                </span>
                {isPositive ? (
                  <ArrowUp className="h-3 w-3 text-green-600" />
                ) : isNegative ? (
                  <ArrowDown className="h-3 w-3 text-red-600" />
                ) : null}
                <span className="text-xs font-medium text-gray-500 ml-1">from last month</span>
              </div>
            )}
          </div>
          
          <div className={cn('p-3 rounded-full bg-opacity-20', color.replace('border-', 'bg-'))}>
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SummaryCard;