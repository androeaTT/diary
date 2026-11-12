import {Button} from "../../elements/Button.jsx";
import {MoveGroup} from "@nine-thirty-five/material-symbols-react/rounded";
import FullscreenPage from "../../types/FullscreenPage.ts";
import useUiStore from "../../stores/useUiStore.ts";
import {ViewTransition} from "react";
import {SPRING, SLIDE_UP} from "../../animations.js";

export default function MarksPage() {
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
            <Button
                label="To login page"
                icon={<MoveGroup />}
                variant='filled'
                onClick={() => {
                    useUiStore.getState().changeView(FullscreenPage.LOGIN_PAGE)
                }}
            />
        </ViewTransition>
    )
}