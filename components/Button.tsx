import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className = '', ...props }) => {
  const baseStyle = "transition-all duration-300 active:scale-95 font-bold rounded-full flex items-center justify-center gap-2 shadow-sm focus:outline-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:shadow-lg hover:from-rose-500 hover:to-pink-600 py-3 px-6 text-lg",
    secondary: "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-rose-500 hover:border-rose-200 py-2 px-4 text-sm",
    ghost: "bg-transparent text-gray-500 hover:text-rose-500 hover:bg-rose-50 py-2 px-4 text-sm",
    icon: "p-3 bg-white text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full border border-gray-100 shadow-md hover:shadow-lg"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
