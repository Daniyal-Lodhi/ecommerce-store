
import { cn } from "@/lib/utils"
import { MouseEventHandler, ReactHTMLElement } from "react"


interface IconbuttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onclick?:MouseEventHandler<HTMLButtonElement> | undefined
    icon:React.ReactElement
    className?: string
}

const Iconbutton:React.FC<IconbuttonProps> = ({
    onclick,
    icon,
    className,
    ...props
})=>{

    return (
        <button
        {...props}
        onClick={onclick}
        className={cn("bg-white rounded-full flex justify-center items-center p-2 border shadow-md hover:scale-110 transition",className)}
        >
            {icon}
        </button>
    )
}

export default Iconbutton