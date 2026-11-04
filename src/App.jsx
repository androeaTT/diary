import useUsersStore from "./diary/stores/useUsersStore.ts";
import useUserSessionStore from "./diary/stores/useUserSessionStore.ts";
import {useEffect} from "react";
import useUiStore from "./diary/stores/useUiStore.ts";
import FullscreenPage from "./diary/types/FullscreenPage.ts";
import LoginPage from "./diary/pages/LoginPage.jsx";
import MainNavContent from "./diary/MainNavContent.jsx";
import NavBar from "./diary/elements/NavBar.jsx";
import "./App.css"
import useUserPrefsStore from "./diary/stores/useUserPrefsStore.ts";


export default function App(){

    useEffect(() => {
        useUsersStore.getState().init()
        useUserSessionStore.getState().init()
    }, [])

    // login when required
    const isLoginRequired = useUserSessionStore((state) => state.loginRequired)
    const fsView = useUiStore((state) => state.currentFsView)
    useEffect(() => {
        if (fsView === FullscreenPage.REQUIRED_LOGIN_PAGE && !isLoginRequired) {
            useUiStore.getState().changeView(FullscreenPage.MAIN_NAVIGATION)
        }
    }, [fsView, isLoginRequired])

    //user prefs sync
    const changeUser = useUserPrefsStore((state) => state.changeUser)
    const userId = useUserSessionStore((state) => state.userId)
    useEffect(() => {
        changeUser(userId)
    }, [userId, changeUser])


    //theme
    const theme = useUserPrefsStore((state) => state.theme)
    useEffect(() => {
        const root = document.getElementById("root")
        switch (theme) {
            case "dark":
                root.setAttribute("data-theme", "dark")
                break
            case "light":
                root.setAttribute("data-theme", "light")
                break
            case "system":
                root.removeAttribute("data-theme")
        }
    }, [theme])



    switch (fsView) {
        case FullscreenPage.REQUIRED_LOGIN_PAGE:
        case FullscreenPage.LOGIN_PAGE:
            return (
                <LoginPage />
            )
        case FullscreenPage.MAIN_NAVIGATION:
            return (
                <div>
                    <NavBar />
                    <MainNavContent />
                </div>
            )
    }
}