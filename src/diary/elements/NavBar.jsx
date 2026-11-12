import NavBarElement from "./NavBarElement.jsx";
import NavbarPages from "../types/NavbarPages.ts";
import {EditorChoice, ListAlt, Person, Settings} from "@nine-thirty-five/material-symbols-react/rounded";
import {EditorChoice as EditorChoiceF, ListAlt as ListAltF, Person as PersonF} from "@nine-thirty-five/material-symbols-react/rounded/filled";
import useUiStore from "../stores/useUiStore.ts";
import {Button} from "./Button.jsx";

export default function NavBar() {
    const getString         = useUiStore((state) => state.getString)
    const strings           = useUiStore((state) => state.strings)

    const navTo             = useUiStore((state) => state.navTo)
    const currentNavbarItem = useUiStore((state) => state.currentNavbarItem)

    return (
        <div
            className=
                "absolute z-2 left-0 right-0 bottom-5 ml-auto mr-auto
                gap-2 flex w-fit flex-row justify-center items-stretch"
        >
            <div className="flex w-fit flex-row gap-1 bg-(--bg-neutral) p-2 rounded-full">
                <NavBarElement
                    isActive={currentNavbarItem === NavbarPages.SCHEDULE}
                    onClick={() => navTo(NavbarPages.SCHEDULE)}
                    icon={ <ListAlt /> }
                    iconActive={<ListAltF />}
                    label={getString("main_navigation.schedule", strings)}
                />
                <NavBarElement
                    isActive={currentNavbarItem === NavbarPages.MARKS}
                    onClick={() => navTo(NavbarPages.MARKS)}
                    icon={ <EditorChoice /> }
                    iconActive={<EditorChoiceF />}
                    label={getString("main_navigation.marks", strings)}
                />
                <NavBarElement
                    isActive={currentNavbarItem === NavbarPages.PROFILE}
                    onClick={() => navTo(NavbarPages.PROFILE)}
                    icon={ <Person /> }
                    iconActive={ <PersonF /> }
                    label={getString("main_navigation.profile", strings)}
                />
            </div>
        <Button
            icon={<Settings />}
            className="h-full aspect-square box-content"
            variant="neutral"
        />
        </div>
    )
}