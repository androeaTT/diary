import useUsersStore from "./diary/stores/useUsersStore.ts";
import useUserSessionStore from "./diary/stores/useUserSessionStore.ts";
import {useEffect} from "react";
import useUiStore from "./diary/stores/useUiStore.ts";
import FullscreenPage from "./diary/types/FullscreenPage.ts";
import LoginPage from "./diary/pages/LoginPage.jsx";
import MainNavContent from "./diary/MainNavContent.jsx";
import NavBar from "./diary/elements/NavBar.jsx";
import "./App.css"


export default function App(){

    useEffect(() => {
        useUsersStore.getState().init()
        useUserSessionStore.getState().init()
    }, [])


    const isLoginRequired = useUserSessionStore((state) => state.loginRequired)
    const fsView = useUiStore((state) => state.currentFsView)

    useEffect(() => {
        if (fsView === FullscreenPage.REQUIRED_LOGIN_PAGE && !isLoginRequired) {
            useUiStore.getState().changeView(FullscreenPage.MAIN_NAVIGATION)
        }
    }, [fsView, isLoginRequired])

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