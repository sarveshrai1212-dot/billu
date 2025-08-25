import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "outline" | "default";
}

export const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded transition-all font-semibold",
          variant === "ghost" && "bg-transparent hover:bg-gray-100",
          variant === "outline" && "border border-gray-300 bg-transparent hover:bg-gray-100",
          variant === "default" && "bg-purple-600 text-white hover:bg-purple-700",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export default Button;
