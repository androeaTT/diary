import {twMerge} from "tailwind-merge";

export default function ListofCards({ children, className, gap = 1, padding = 4, label = false }) {
    return (
        <div className={ twMerge(className, "flex gap-2 flex-col w-full", "p-" + padding ) }>
            <div
                hidden={label === false}
                className="w-full font-bold pl-5"
            >
                {label}
            </div>
            <div
                className={ twMerge(
                    "flex flex-col w-full flex-1 rounded-4xl overflow-hidden",
                    "gap-" + gap
                ) }
            >
                {children}
            </div>
        </div>
    )
}