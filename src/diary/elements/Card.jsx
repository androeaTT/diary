import {twMerge} from "tailwind-merge";


export default function Card({children, className, onClick, ripple = false}) {
    return (
        <div
            className = {twMerge(
                "bg-(--bg-dark-mod) rounded-4xl",
                className,
                ripple ? twMerge( // before
                    "before:absolute before:top-0 before:left-0 before:w-full before:h-full",
                    "relative overflow-hidden",
                    "hover:before:bg-(--bg-half-dark-mod) active:before:bg-(--bg-dark-mod)",
                ): ""
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}