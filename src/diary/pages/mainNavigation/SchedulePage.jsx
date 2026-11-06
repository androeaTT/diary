import usePreferencesStore from "../../stores/usePreferencesStore.ts";
import ListofCards from "../../elements/ListofCards.jsx";
import TextCard from "../../elements/TextCard.jsx";
import useUiStore from "../../stores/useUiStore.ts";
import ThemeSelector from "../../elements/widgets/ThemeSelector.jsx";
import RandBackground from "../../elements/RandBackground.jsx";
import {Button} from "../../elements/Button.jsx";

export default function SchedulePage() {
    const changeLanguage = useUiStore((state) => state.changeLanguage)
    const langSelected = usePreferencesStore((state) => state.prefLang)

    const theme  = usePreferencesStore((state) => state.theme)
    const setPref   = usePreferencesStore((state) => state.setPref)

    return (
        <div className="h-dvh flex flex-col gap-4 items-center justify-center w-full max-w-xl">
            <ListofCards
                label="Testing Page"
                gap={1}
            >
                {/*Theme card*/}
                <TextCard
                    label="Theme"
                    desc="Change theme"
                    ripple={true}
                    onClick={() => {
                        switch (theme) {
                            case "system":
                                setPref("theme", "light")
                                break
                            case "light":
                                setPref("theme", "dark")
                                break
                            default:
                            case "dark":
                                setPref("theme", "system")
                                break
                        }
                    }}
                >
                    <ThemeSelector />
                </TextCard>

                <TextCard
                    label="Language swicher"
                    desc="Click and change language"
                    ripple={true}
                    onClick={() => {
                        if (langSelected === "ru")
                            changeLanguage("en")
                        else
                            changeLanguage("ru")
                    }}
                >
                    <div className="bg-(--text-color) text-(--bg-color) rounded-full flex items-center justify-center w-10 h-10">
                        {langSelected.toUpperCase()}
                    </div>
                </TextCard>

            </ListofCards>
        </div>
    )
}