import React from 'react';
import { cn } from '../../utils/helpers';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className,
  onClick,
  hoverable = false,
}) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-lg shadow-sm overflow-hidden',
        hoverable && 'transition-shadow hover:shadow-md',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className 
}) => {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-100', className)}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className 
}) => {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className 
}) => {
  return (
    <div className={cn('px-6 py-4 bg-gray-50 border-t border-gray-100', className)}>
      {children}
    </div>
  );
};

export default Card;