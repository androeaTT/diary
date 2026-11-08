import {BrightnessAuto, DarkMode, LightMode} from "@nine-thirty-five/material-symbols-react/rounded";
import {BrightnessAuto as BrightnessAutoF, DarkMode as DarkModeF, LightMode as LightModeF} from "@nine-thirty-five/material-symbols-react/rounded/filled";
import {SpringButton} from "../SpringButton.jsx";
import usePreferencesStore from "../../stores/usePreferencesStore.ts";
import useUiStore from "../../stores/useUiStore.ts";

export default function ThemeSelector() {
    const theme  = usePreferencesStore((state) => state.theme)
    const setPref   = usePreferencesStore((state) => state.setPref)

    const strings = useUiStore((state) => state.strings)
    const getString = useUiStore((state) => state.getString)

    return (
        <div className='flex flex-row items-center justify-center'>
            <SpringButton
                icon    ={ theme === "system" ? <BrightnessAutoF /> : <BrightnessAuto /> }
                label   ={ theme === "system" && getString("settings.systemTheme", strings) }
                variant ={ theme === "system" ? 'filled' : 'flat'}
                onClick ={ () => setPref("theme", "system") }
            />
            <SpringButton
                icon    ={ theme === "light" ? <LightModeF /> : <LightMode /> }
                label   ={ theme === "light" && getString("settings.lightTheme", strings) }
                variant ={ theme === "light" ? 'filled' : 'flat' }
                onClick ={ () => setPref("theme", "light") }
            />
            <SpringButton
                icon    ={ theme === "dark" ? <DarkModeF /> : <DarkMode /> }
                label   ={ theme === "dark" && getString("settings.darkTheme", strings) }
                variant ={ theme === "dark" ? 'filled' : 'flat' }
                onClick ={ () => setPref("theme", "dark") }
            />
        </div>
    )
}