import NavBarElement from "./NavBarElement.jsx";
import NavbarPages from "../types/NavbarPages.ts";
import {EditorChoice, ListAlt, Person} from "@nine-thirty-five/material-symbols-react/rounded";
import {EditorChoice as EditorChoiceF, ListAlt as ListAltF, Person as PersonF} from "@nine-thirty-five/material-symbols-react/rounded/filled";
import useUiStore from "../stores/useUiStore.ts";

export default function NavBar() {
    const getString         = useUiStore((state) => state.getString)
    const strings           = useUiStore((state) => state.strings)

    const navTo             = useUiStore((state) => state.navTo)
    const currentNavbarItem = useUiStore((state) => state.currentNavbarItem)

    return (
        <div className=
            "absolute flex w-fit flex-row z-2
            left-0 right-0 ml-auto mr-auto bottom-4 gap-1
            bg-(--bg-dark-mod) p-2 rounded-full backdrop-blur-xl"
        >
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
    )
}