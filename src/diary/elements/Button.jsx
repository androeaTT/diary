import {twMerge} from "tailwind-merge";
import {Ripple} from "m3-ripple";

export function Button({ variant, icon = false, className, onClick, label = false }) {
    const variantClasses = {
        outlined: "border-solid border border-(--text-color)",
        filled: "bg-(--text-color) text-(--bg-color)",
        "accent-filled": "bg-(--accent) text-(--text-color)",
        "err-filled": "bg-(--err-color-bg) text-(--text-color)",
        flat: "bg-transparent text-(--text-color)",
    };

    return (
        <button
            className={twMerge(
                "overflow-hidden bg-center bg-contain bg-repeat",
                "flex items-center relative justify-center",
                "pt-3 pb-3 pl-3 pr-3 min-h-10 rounded-full h-max",
                "gap-2 relative",
                "transition-[width] duration-200 ease-in-out",
                variantClasses[variant],
                className
            )}
            onClick={(e) => {
                e.stopPropagation()
                onClick && onClick(e)
            }}
        >
            <div hidden={icon === false} className="text-2xl" >{icon}</div>
            <Ripple className="absolute" />
            <div hidden={label === false}  className="flex-1 mr-1.5">{label}</div>
        </button>
    )
}