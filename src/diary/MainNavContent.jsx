import useUiStore from "./stores/useUiStore.ts";
import NavbarPages from "./types/NavbarPages.ts";
import SchedulePage from "./pages/mainNavigation/SchedulePage.jsx";
import MarksPage from "./pages/mainNavigation/MarksPage.jsx";
import ProfilePage from "./pages/mainNavigation/ProfilePage.jsx";
import {startTransition, useEffect, useState} from "react";

export default function MainNavContent() {
    const [currentPage, setCurrentPage] = useState(NavbarPages.SCHEDULE);
    const currentItem = useUiStore((state) => state.currentNavbarItem)

    useEffect(() => {
        startTransition(() => setCurrentPage(currentItem) )
    }, [currentItem, setCurrentPage])


    return  currentPage === NavbarPages.SCHEDULE ? (<SchedulePage />)   :
            currentPage === NavbarPages.MARKS ? (<MarksPage />)         :
            currentPage === NavbarPages.PROFILE ? <ProfilePage />       :
            null
}