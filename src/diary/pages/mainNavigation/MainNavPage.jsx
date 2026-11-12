import {SLIDE_UP, SPRING} from "../../animations.js";
import {ViewTransition} from "react";
import {twMerge} from "tailwind-merge";

export default function MainNavPage({children, className}) {
    return (
        <ViewTransition
            default="none"
            /* CSS driven cross fade defaults */
            enter="auto"
            exit="none"
            onEnter={(instance) => {
                const anim = instance.new.animate( SLIDE_UP, SPRING );
                return () => anim.cancel();
            }}
        >
            <div className={twMerge("h-dvh w-full max-w-xl", className)}>
                {children}
            </div>
        </ViewTransition>)
}