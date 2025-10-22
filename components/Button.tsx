
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`
        flex items-center justify-center gap-2
        px-4 py-2.5 rounded-lg text-sm font-semibold text-white
        bg-purple-600 hover:bg-purple-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500
        disabled:bg-gray-500 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        shadow-lg shadow-purple-900/40
        transform hover:scale-[1.02] active:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
