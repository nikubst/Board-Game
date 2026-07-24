import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  disabled,
  type = 'text',
  id,
  ...props
}) => {
  const reactId = useId();
  const inputId = id || `input-${reactId}`;
  const hasError = Boolean(error);

  const baseClasses = 'bg-white border text-slate-900 placeholder-slate-500 rounded-2xl transition-all duration-300 shadow-sm';
  const errorClasses = hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-cyan-500 focus:border-cyan-500';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`flex flex-col gap-1.5 ${widthClass}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-200/70 flex items-center gap-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          disabled={disabled}
          className={`${baseClasses} ${errorClasses} ${leftIcon ? 'pl-14' : 'pl-5'} ${rightIcon ? 'pr-14' : 'pr-5'} py-3.5 ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
      {hasError && (
        <p className="text-sm text-red-400 mt-1.5">{error}</p>
      )}
      {hint && !hasError && (
        <p className="text-sm text-slate-200/40 mt-1.5">{hint}</p>
      )}
    </div>
  );
};

// Textarea component
export const Textarea: React.FC<{
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  label,
  error,
  hint,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const textareaId = useId();
  const hasError = Boolean(error);

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-slate-200/70 flex items-center gap-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`bg-white border text-slate-900 placeholder-slate-500 rounded-2xl transition-all duration-300 p-5 ${
          hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-cyan-500 focus:border-cyan-500'
        } ${className}`}
        {...props}
      />
      {hasError && (
        <p className="text-sm text-red-400 mt-1.5">{error}</p>
      )}
      {hint && !hasError && (
        <p className="text-sm text-slate-200/40 mt-1.5">{hint}</p>
      )}
    </div>
  );
};

// Select component
export const Select: React.FC<{
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  fullWidth?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  label,
  error,
  hint,
  options,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const selectId = useId();
  const hasError = Boolean(error);

  return (
    <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-slate-700 flex items-center gap-1"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`bg-white border text-slate-900 rounded-lg transition-all duration-200 p-2.5 ${
          hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 focus:ring-cyan-500 focus:border-cyan-500'
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-white text-slate-900">
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      {hint && !hasError && (
        <p className="text-sm text-slate-500">{hint}</p>
      )}
    </div>
  );
};