import useUiStore from "./stores/useUiStore.ts";
import NavbarPages from "./types/NavbarPages.ts";
import SchedulePage from "./pages/mainNavigation/SchedulePage.jsx";
import MarksPage from "./pages/mainNavigation/MarksPage.jsx";
import ProfilePage from "./pages/mainNavigation/ProfilePage.jsx";


export default function MainNavContent() {
    const currentItem = useUiStore((state) => state.currentNavbarItem)


    switch (currentItem) {
        case NavbarPages.SCHEDULE:
            return (<SchedulePage />)
        case NavbarPages.MARKS:
            return (<MarksPage />)
        case NavbarPages.PROFILE:
            return (<ProfilePage />)
    }
}