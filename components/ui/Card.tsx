import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  padding = 'md',
  border = true,
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const baseClasses = `bg-white/80 backdrop-blur-xl rounded-[1.6rem] transition-all duration-400 ${
    border ? 'border border-slate-200/80' : ''
  } ${paddingClasses[padding]} shadow-soft-lg`;

  const hoverClasses = hoverEffect ? 'hover:-translate-y-1 hover:bg-slate-50 hover:border-cyan-200 cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// Card header component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actions?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  title,
  actions,
}) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 truncate">{title}</h3>
      )}
      {children || actions}
    </div>
  );
};

// Card content component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => {
  return <div className={` ${className}`}>{children}</div>;
};

// Card footer component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => {
  return <div className={`mt-4 pt-4 border-t border-slate-200 ${className}`}>{children}</div>;
};

// Stat card for dashboard
export const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  trend?: string;
  className?: string;
}> = ({
  title,
  value,
  icon,
  color = 'text-purple-400',
  trend,
  className = '',
}) => {
  return (
    <Card className={`${className}`} padding="md">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <span className={`text-xl ${color}`}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-500 truncate">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
        {trend && (
          <div className={`text-sm ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {trend}
          </div>
        )}
      </div>
    </Card>
  );
};

// Empty state card
export const EmptyState: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <Card className={`text-center ${className}`} padding="lg">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="p-4 rounded-full bg-slate-100">
          <span className="text-2xl text-slate-500">{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 max-w-xs">{description}</p>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </Card>
  );
};