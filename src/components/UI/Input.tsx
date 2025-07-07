import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
  helpText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefix, suffix, helpText, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-xs sm:text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm sm:text-base">{prefix}</span>
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              block w-full px-2 sm:px-3 py-3 sm:py-3 border border-gray-300 rounded-lg
              text-sm sm:text-base placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-amazon-orange focus:border-amazon-orange
              disabled:bg-gray-50 disabled:text-gray-500
              ${prefix ? 'pl-7 sm:pl-8' : ''}
              ${suffix ? 'pr-10 sm:pr-12' : ''}
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
              ${className || ''}
            `}
            {...props}
          />
          {suffix && (
            <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm sm:text-base">{suffix}</span>
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs sm:text-sm text-red-600">{error}</p>
        )}
        {helpText && !error && (
          <p className="text-xs sm:text-sm text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 