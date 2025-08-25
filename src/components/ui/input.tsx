import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={
          "px-4 py-2 rounded border border-gray-300 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-purple-500 " +
          (className || "")
        }
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
export default Input;
