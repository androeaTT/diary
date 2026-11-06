import {twMerge} from "tailwind-merge";
import {Ripple} from "m3-ripple";


export default function Card({children, className, onClick, ripple = false}) {
    return (
        <div
            className = {twMerge(
                "bg-(--bg-dark-mod) rounded-md relative",
                className
            )}
            onClick={onClick}
        >
            <div className="absolute inset-x-0 w-full h-full">
                <Ripple hoverOpacity={0.1} pressedOpacity={0.15} disabled={!ripple} />
            </div>
            {children}
        </div>
    )
}