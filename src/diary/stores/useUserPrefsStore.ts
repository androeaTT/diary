import {create} from "zustand";
import { persist } from 'zustand/middleware';
import Language from "../types/Language";


interface Preferences {
    prefLang: Language;
    theme: "dark" | "light" | "system";
}
const initialUserState: Preferences = {
    prefLang: Language.ENGLISH,
    theme: "system",
}

type UserDict = Record<string, Preferences>;

interface MultiUserPreferences {
    users: UserDict
    getPrefs: (userId: string) => Preferences
    initUser: (userId: string) => void;
}

const useUsersPrefStore = create<MultiUserPreferences>()(
    persist( (set, get) => ({
        users: {},

        getPrefs: (userId) => ( get().users[userId] ),
        initUser: (userId) => {
            const existing = get().users[userId];
            if (!existing) {
                const newPrefs = initialUserState;
                set((state) => ({
                    users: {
                        ...state.users,
                        [userId]: newPrefs
                    }
                }));
            }
        }

    }),{
        name: "preferences",
    })
)
export default useUsersPrefStore;