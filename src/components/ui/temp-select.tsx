import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  error?: string;
  [x: string]: any;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, error, ...rest }, ref) => {
    return (
      <>
        <div className="relative">
          <select
            className={`bg-white text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight cursor-pointer focus:outline-none focus:shadow-outline placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            ref={ref}
            {...rest}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="cursor-pointer"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </>
    );
  }
);
Select.displayName = "Select";

export default Select;
