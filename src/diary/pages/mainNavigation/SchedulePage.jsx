import {SpringButton} from "../../elements/SpringButton.jsx";
import {LightMode, BrightnessAuto, DarkMode, MoveGroup} from "@nine-thirty-five/material-symbols-react/rounded";
import useUserPrefsStore from "../../stores/useUserPrefsStore.ts";
import {Button} from "../../elements/Button.jsx";
import useUiStore from "../../stores/useUiStore.ts";
import FullscreenPage from "../../types/FullscreenPage.ts";

export default function SchedulePage() {
    const selected = useUserPrefsStore((state) => state.theme);
    const setSelected = useUserPrefsStore((state) => state.setPref);
    return (
        <div className="h-dvh flex flex-col gap-4 items-center justify-center">
            <div className='flex flex-row items-center justify-center'>
                <SpringButton
                    icon={<BrightnessAuto />}

                    label={ selected === "system" && 'System'}
                    variant={ selected === "system" ? 'filled' : 'flat'}
                    onClick={() => setSelected("theme", "system")}
                />
                <SpringButton
                    icon={<LightMode />}

                    label={ selected === "light" && 'Light'}
                    variant={ selected === "light" ? 'filled' : 'flat'}
                    onClick={() => setSelected("theme", "light")}
                />
                <SpringButton
                    icon={<DarkMode />}

                    label={ selected === "dark" && 'Dark'}
                    variant={ selected === "dark" ? 'filled' : 'flat'}
                    onClick={() => setSelected("theme", "dark")}
                />
            </div>
            <Button
                label="To login page"
                icon={<MoveGroup />}
                variant='filled'
                onClick={() => {
                    useUiStore.getState().changeView(FullscreenPage.LOGIN_PAGE)
                }}
            />
        </div>
    )
}