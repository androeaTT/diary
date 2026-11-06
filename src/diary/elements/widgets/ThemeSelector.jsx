import {BrightnessAuto, DarkMode, LightMode} from "@nine-thirty-five/material-symbols-react/rounded";
import {BrightnessAuto as BrightnessAutoF, DarkMode as DarkModeF, LightMode as LightModeF} from "@nine-thirty-five/material-symbols-react/rounded/filled";
import {SpringButton} from "../SpringButton.jsx";
import useUserPrefsStore from "../../stores/useUserPrefsStore.ts";

export default function ThemeSelector() {
    const theme  = useUserPrefsStore((state) => state.theme)
    const setPref   = useUserPrefsStore((state) => state.setPref)

    return (
        <div className='flex flex-row items-center justify-center'>
            <SpringButton
                icon    ={ theme === "system" ? <BrightnessAutoF /> : <BrightnessAuto /> }
                label   ={ theme === "system" && 'System' }
                variant ={ theme === "system" ? 'filled' : 'flat'}
                onClick ={ () => setPref("theme", "system") }
            />
            <SpringButton
                icon    ={ theme === "light" ? <LightModeF /> : <LightMode /> }
                label   ={ theme === "light" && 'Light' }
                variant ={ theme === "light" ? 'filled' : 'flat' }
                onClick ={ () => setPref("theme", "light") }
            />
            <SpringButton
                icon    ={ theme === "dark" ? <DarkModeF /> : <DarkMode /> }
                label   ={ theme === "dark" && 'Dark' }
                variant ={ theme === "dark" ? 'filled' : 'flat' }
                onClick ={ () => setPref("theme", "dark") }
            />
        </div>
    )
}