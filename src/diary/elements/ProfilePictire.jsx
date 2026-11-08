import { Person } from '@nine-thirty-five/material-symbols-react/rounded'
import {twMerge} from "tailwind-merge";

export default function ProfilePictire({ className }) {
    return (
        <div className={twMerge(
            "h-full aspect-square flex items-center justify-center",
            "rounded-full overflow-hidden",
            "bg-(--text-color) text-(--bg-color)",
            className
        )}>
                <svg
                    viewBox="0 0 100 100"
                    width="60%"
                    height="60%"
                    preserveAspectRatio="none"
                >
                        <Person
                            x="0%"
                            y="0%"
                            width="100%"
                            height="100%"
                            textAnchor="middle"
                            fill="currentColor"
                        />
                </svg>
        </div>
    )
}