import useMultiUserdataStore from "./diary/stores/useMultiUserdataStore.ts";
import useUserdataStore from "./diary/stores/useUserdataStore.ts";
import {useEffect} from "react";
import useUiStore from "./diary/stores/useUiStore.ts";
import FullscreenPage from "./diary/types/FullscreenPage.ts";
import LoginPage from "./diary/pages/LoginPage.jsx";
import MainNavContent from "./diary/MainNavContent.jsx";
import NavBar from "./diary/elements/NavBar.jsx";
import usePreferencesStore from "./diary/stores/usePreferencesStore.ts";

import "./App.css"
import 'm3-ripple/ripple.css'
import {sNetwork} from "./diary/Network.js";
import useBackendDatabaseStore from "./diary/stores/useBackendDatabaseStore.ts";



export default function App(){
    const curUserId         = useMultiUserdataStore((state) => state.currentUserId)
    const isLoginRequired   = useMultiUserdataStore((state) => state.isLoginRequired)
    const users             = useMultiUserdataStore((state) => state.users)
    const changeUser        = useUserdataStore((state) => state.changeUser)
    const changePrefUser    = usePreferencesStore((state) => state.changeUser)
    const resetUser         = useUserdataStore((state) => state.resetUser)

    useEffect(() => {
        const user = users[curUserId]
        if (!isLoginRequired && user){
            changeUser(user)
            changePrefUser(curUserId)
        }
        else
            resetUser()
    }, [changePrefUser, changeUser, curUserId, isLoginRequired, resetUser, users])

    const fsView            = useUiStore((state) => state.currentFsView)
    const changeView        = useUiStore((state) => state.changeView)

    useEffect(() => {
        if (fsView === FullscreenPage.REQUIRED_LOGIN_PAGE && !isLoginRequired) {
            changeView(FullscreenPage.MAIN_NAVIGATION)
        }
        if (isLoginRequired && fsView === FullscreenPage.MAIN_NAVIGATION) {
            changeView(FullscreenPage.REQUIRED_LOGIN_PAGE)
        }
    }, [fsView, isLoginRequired, changeView])

    const changeLang            = useUiStore((state) => state.setLangLocally)
    const lang                  = usePreferencesStore((state) => state.prefLang)
    useEffect(() => {
        changeLang(lang)
    }, [changeLang, lang])

    //theme
    const theme = usePreferencesStore((state) => state.theme)
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

    const token = useUserdataStore((state) => state.token)
    useEffect(() => {
        if (token.length > 10) {
            useBackendDatabaseStore.getState().update()
        }
    }, [token]);


    switch (fsView) {
        case FullscreenPage.REQUIRED_LOGIN_PAGE:
        case FullscreenPage.LOGIN_PAGE:
            return (
                <LoginPage />
            )
        case FullscreenPage.MAIN_NAVIGATION:
            return (
                <div className='flex w-full justify-center align-center'>
                    <NavBar />
                    <MainNavContent />
                </div>
            )
    }
}