import {create} from "zustand";
import Language from "../types/Language";
import {Preferences} from "../types/Preferances";
import useMultiUserPrefStore from "./useMultiUserPrefStore";
import useUserdataStore from "./useUserdataStore";

const initialUserState: Preferences = {
    prefLang: Language.ENGLISH,
    theme: "system",
}

interface UsersPrefStore extends Preferences{
    setPref: <K extends keyof Preferences>( key: K, value: Preferences[K] ) => void
    changeUser: (userId: string) => void
}

const usePreferencesStore = create<UsersPrefStore>(
    ( set, get ) => ({
        ...initialUserState,
        setPref: (key, value) => {
            set({[key]: value})

            const { setPref, ...currentPrefs } = get();

            const userId = useUserdataStore.getState().userId
            useMultiUserPrefStore.getState().saveUser(userId, currentPrefs)
        },
        changeUser: (userId: string) => {
            const newUser: Preferences | undefined = useMultiUserPrefStore.getState().getUser(userId)
            if (newUser)
                set(newUser)
            else
                set(initialUserState)
        }
    })
)
export default usePreferencesStore;