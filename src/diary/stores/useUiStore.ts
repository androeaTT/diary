import {create} from "zustand";
import NavbarPages from "../types/NavbarPages";
import FullscreenPage from "../types/FullscreenPage";
import Language from "../types/Language";
import Strings from "../Strings"
import TranslationDictionary from "../types/TranslationDictionary";
import usePreferencesStore from "./usePreferencesStore";

interface UiState {
    //main nav
    currentNavbarItem: NavbarPages;
    navTo: (newPage: NavbarPages) => void;
    //fullscreen view
    currentFsView: FullscreenPage
    changeView: (newView: FullscreenPage) => void
    //translation
    lang: Language
    setLangLocally: (lang: Language) => void
    strings: TranslationDictionary | string,
    getString: (path: string, obj: any) => string
}


const useUiStore = create<UiState>((set, get) => ({
    currentNavbarItem: NavbarPages.SCHEDULE,
    navTo: (newPage) => {
        set({ currentNavbarItem: newPage })
    },

    currentFsView: FullscreenPage.MAIN_NAVIGATION,
    changeView: (newView) => {
        set({ currentFsView: newView })
    },

    lang: Language.ENGLISH,
    setLangLocally: (lang) => {
        set( {lang: lang} )
        set( {strings: Strings[lang]} )
    },
    strings: Strings[Language.ENGLISH],
    getString: (path, obj) => {
        return path.split('.').reduce((acc, key) => acc?.[key], obj);
    }
}));

export default useUiStore;