import RandBackground from "./RandBackground.jsx";
import {twMerge} from "tailwind-merge";

export default function ProfilePictire({ fullName, className }) {
    if (!fullName || fullName.length < 1) return null;
    return (
        <div className={twMerge(className,
            "h-full aspect-square flex items-center justify-center",
            "rounded-full overflow-hidden outline-2 outline-offset-2",
            "mt-5 outline-(--text-color-darker) outline-solid text-white"
        )}>
            <RandBackground
                className='h-full w-full pt-2 flex items-center justify-center'
                seed={fullName}
                s={34} l={48}
            >
                <svg
                    viewBox="0 0 100 100"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                >
                    <text
                        x="50%"
                        y="70%"
                        fontSize="70"
                        textAnchor="middle"
                        fill="currentColor"
                    >
                        {fullName?.charAt(0)?.toUpperCase()}
                    </text>
                </svg>
            </RandBackground>
        </div>
    )
}