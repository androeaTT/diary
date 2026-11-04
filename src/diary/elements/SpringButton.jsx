import {twMerge} from "tailwind-merge";
import SmoothWidthBox from "./SmoothWidthBox.jsx";

export function SpringButton({ variant,  buttonClassName, className, onClick, fill = false, open = true, label = false, icon = false }) {
    const variantClasses = {
        outlined: "border-solid border border-(--text-color)",
        filled: "bg-(--text-color) text-(--bg-color)",
        "accent-filled": "bg-(--accent) text-(--text-color)",
        "err-filled": "bg-(--err-color-bg) text-(--text-color)",
        flat: "bg-transparent text-(--text-color)",
    };

    return (
        <SmoothWidthBox fill={fill} open={open} className={twMerge("rounded-full", className)}>
            <button
                className={twMerge(
                    "overflow-hidden bg-center bg-contain bg-repeat",
                    "flex items-center relative justify-center",
                    "pt-3 pb-3 pl-3 pr-3 min-h-10 rounded-full h-max",
                    "w-full gap-2",
                    "transition-[width] duration-200 ease-in-out",
                    variantClasses[variant],
                    buttonClassName
                )}
                onClick={onClick}
            >
                <div hidden={icon === false} className="text-2xl" >{icon}</div>
                <div
                    className="absolute w-full h-full mix-blend-difference
                       top-0 left-0 right-0 bottom-0
                       transition duration-150 ease-in-out
                       hover:bg-(--bg-dark-mod) active:transition-none
                       active:bg-(--bg-darker-mod)"
                />
                <div hidden={label === false} className="flex-1 mr-1.5">{label}</div>
            </button>
        </SmoothWidthBox>
    )
}