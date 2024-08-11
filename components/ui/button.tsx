import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button
        className={cn("bg-black flex items-center px-4 py-2 rounded-full w-auto ",className)}
            ref={ref}
        >
            {children}
        </button>
    )
})

export default Button