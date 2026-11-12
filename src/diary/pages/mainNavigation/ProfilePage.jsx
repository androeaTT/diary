import ProfilePictire from "../../elements/ProfilePictire.jsx";
import useUserdataStore from "../../stores/useUserdataStore.ts";
import Card from "../../elements/Card.jsx";
import {twMerge} from "tailwind-merge";
import {KeyboardArrowRight} from "@nine-thirty-five/material-symbols-react/rounded";
import {Ripple} from "m3-ripple";
import StudentInfo from "../../elements/widgets/StudentInfo.jsx";
import {ViewTransition} from "react";
import {SPRING, SLIDE_UP} from "../../animations.js";
import TextCard from "../../elements/TextCard.jsx";
import ListofCards from "../../elements/ListofCards.jsx";
import ThemeSelector from "../../elements/widgets/ThemeSelector.jsx";
import usePreferencesStore from "../../stores/usePreferencesStore.ts";


export default function ProfilePage() {
    const firstName = useUserdataStore((state) => state.firstName);
    const lastName = useUserdataStore((state) => state.lastName);

    const langSelected = usePreferencesStore((state) => state.prefLang)

    const theme  = usePreferencesStore((state) => state.theme)
    const setPref   = usePreferencesStore((state) => state.setPref)

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
            <div className="w-full max-w-xl p-2 flex flex-col overflow-y-scroll gap-2 pt-[env(safe-area-inset-top, 0)]" >
                <ListofCards>
                    <Card
                        className={twMerge(
                            "flex flex-row items-center justify-between",
                            "rounded-4xl overflow-hidden w-full gap-4",
                            "p-4"
                        )}
                    >
                        <ProfilePictire className="h-14" />
                        <span align="center" className="text-[14pt] font-normal " >
                            {firstName + " " + lastName}
                        </span>
                        <KeyboardArrowRight size={24} />
                        <Ripple />
                    </Card>
                </ListofCards>
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
                                usePreferencesStore.getState().setPref("prefLang", "en")
                            else
                                usePreferencesStore.getState().setPref("prefLang", "ru")
                        }}
                    >
                        <div className="bg-(--text-color) text-(--bg-color) rounded-full flex items-center justify-center w-10 h-10">
                            {langSelected.toUpperCase()}
                        </div>
                    </TextCard>

                </ListofCards>
            </div>
        </ViewTransition>
    )
}