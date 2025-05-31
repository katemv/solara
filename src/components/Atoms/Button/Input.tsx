import { cn } from "@/utils/tailwind";
import { ReactNode, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  className?: string
}

export const Input = ({ icon, className, ...props }: InputProps) => {
    return (
        <div className={cn("relative w-full", className)}>
            {icon && (
                <span className={"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"}>
                    {icon}
                </span>
            )}
            <input
                className={cn(
                    "w-full h-12 rounded-md bg-gray-800 text-white placeholder-gray-400 pl-10 pr-4",
                    "focus:outline-none focus:ring-2 focus:ring-violet-500",
                    "transition-all duration-200",
                    icon ? "" : "pl-4"
                )}
                {...props}
            />
        </div>
    );
};
