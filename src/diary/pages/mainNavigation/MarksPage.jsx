import {Button} from "../../elements/Button.jsx";
import {MoveGroup} from "@nine-thirty-five/material-symbols-react/rounded";
import FullscreenPage from "../../types/FullscreenPage.ts";
import useUiStore from "../../stores/useUiStore.ts";

export default function MarksPage() {
    return (
        <Button
            label="To login page"
            icon={<MoveGroup />}
            variant='filled'
            onClick={() => {
                useUiStore.getState().changeView(FullscreenPage.LOGIN_PAGE)
            }}
        />
    )
}