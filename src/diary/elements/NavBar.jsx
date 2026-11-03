import NavBarElement from "./NavBarElement.jsx";
import NavbarPages from "../types/NavbarPages.ts";
import {CheckCircle, ListAlt, Person} from "@nine-thirty-five/material-symbols-react/outlined";
import useUiStore from "../stores/useUiStore.ts";

export default function NavBar() {


    const navTo = useUiStore((state) => state.navTo)
    const currentNavbarItem = useUiStore((state) => state.currentNavbarItem)

    return (
        <div className=
            "absolute flex w-fit flex-row
            left-0 right-0 ml-auto mr-auto bottom-4 gap-1
            bg-(--bg-dark-mod) p-2 rounded-full"
        >
            <NavBarElement
                isActive={currentNavbarItem === NavbarPages.SCHEDULE}
                onClick={() => navTo(NavbarPages.SCHEDULE)}
                icon={ <ListAlt /> }
                label="Schedule"
            />
            <NavBarElement
                isActive={currentNavbarItem === NavbarPages.MARKS}
                onClick={() => navTo(NavbarPages.MARKS)}
                icon={ <CheckCircle /> }
                label="Marks"
            />
            <NavBarElement
                isActive={currentNavbarItem === NavbarPages.PROFILE}
                onClick={() => navTo(NavbarPages.PROFILE)}
                icon={ <Person /> }
                label="Profile"
            />
        </div>
    )
}