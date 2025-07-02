import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
  helpText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  helpText,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`
            block w-full px-3 py-3 border border-gray-300 rounded-lg
            text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-amazon-orange focus:border-amazon-orange
            disabled:bg-gray-50 disabled:text-gray-500
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
            ${className || ''}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}; 