import { cn } from "@/utils/tailwind";
import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "gradient-outlined" | "default"
type ButtonSize = "sm" | "base" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export const Button = ({ children, variant = "default", size = "base", className, ...props }: ButtonProps) => {
    const sizeStyles = {
        sm: "h-10",
        base: "h-12",
        lg: "h-14"
    };

    const variantStyles = {
        "gradient-outlined": cn(
            "bg-gradient-to-r from-indigo-500 to-fuchsia-500 p-0.5",
            "shadow-[0_0_35px_rgba(99,102,241,0.5)] hover:shadow-[0_0_50px_rgba(217,70,239,0.5)]",
            "hover:scale-105"
        ),
        default: ""
    };

    const spanStyles = {
        "gradient-outlined": "bg-gray-900",
        default: "bg-purple-800 hover:bg-purple-700 disabled:bg-purple-900 disabled:opacity-50"
    };

    return (
        <button
            className={cn(
                "rounded-lg font-bold relative whitespace-nowrap bg-purple-500",
                "transition-all duration-300 ease-in-out",
                "disabled:cursor-not-allowed disabled:opacity-50",
                sizeStyles[size], variantStyles[variant], className
            )}
            {...props}
        >
            <span
                className={cn(
                    "rounded-md px-6 py-2 flex items-center justify-center",
                    "text-white h-full w-full text-base mb-0.5",
                    "transition-all duration-300 ease-in-out",
                    spanStyles[variant]
                )}
            >
                {children}
            </span>
        </button>
    );
};
