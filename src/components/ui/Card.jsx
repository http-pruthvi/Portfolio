import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  variant = 'default', 
  hover = true,
  className = '',
  onClick,
  ...props 
}, ref) => {
  const baseClasses = 'rounded-lg transition-all duration-300';
  
  const variants = {
    default: 'bg-white shadow-md border border-gray-200',
    elevated: 'bg-white shadow-lg border border-gray-200',
    outlined: 'bg-white border-2 border-gray-300 shadow-sm',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg'
  };
  
  const hoverEffects = hover ? {
    default: 'hover:shadow-lg hover:-translate-y-1',
    elevated: 'hover:shadow-xl hover:-translate-y-2',
    outlined: 'hover:border-blue-300 hover:shadow-md hover:-translate-y-1',
    glass: 'hover:bg-white/90 hover:shadow-xl hover:-translate-y-1'
  } : {};
  
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${hover ? hoverEffects[variant] : ''} ${clickableClasses} ${className}`;
  
  return (
    <div
      ref={ref}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
