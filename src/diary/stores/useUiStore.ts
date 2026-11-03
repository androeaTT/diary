import {create} from "zustand";
import NavbarPages from "../types/NavbarPages";
import FullscreenPage from "../types/FullscreenPage";
import Language from "../types/Language";
import Strings from "../Strings"
import TranslationDictionary from "../types/TranslationDictionary";

interface UiState {
    //main nav
    currentNavbarItem: NavbarPages;
    navTo: (newPage: NavbarPages) => void;
    //fullscreen view
    currentFsView: FullscreenPage
    changeView: (newView: FullscreenPage) => void
    //translation
    lang: Language
    changeLanguage: (lang: Language) => void
    strings: TranslationDictionary | string,
    getString: (path: string, obj: any) => string
}


const useUiStore = create<UiState>((set, get) => ({
    currentNavbarItem: NavbarPages.SCHEDULE,
    navTo: (newPage) => {
        set({ currentNavbarItem: newPage })
    },

    currentFsView: FullscreenPage.REQUIRED_LOGIN_PAGE,
    changeView: (newView) => {
        set({ currentFsView: newView })
    },

    lang: Language.ENGLISH,
    changeLanguage: (lang) => {
        set( {lang: lang} )
        set( {strings: Strings[lang]} )
    },
    strings: Strings[Language.ENGLISH],
    getString: (path, obj) => {
        return path.split('.').reduce((acc, key) => acc?.[key], obj);
    }
}));

export default useUiStore;