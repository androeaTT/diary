import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Preferences} from "../types/Preferances";

type UserDict = Record<string, Preferences>;

interface MultiUserStore {
    users: UserDict
    getUser: (userId: string) => Preferences | undefined
    saveUser: (userId: string, prefs: Preferences) => void
}

const useMultiUserPrefStore = create<MultiUserStore>()( persist((set, get) => ({
    users: {},
    getUser: (userId) => get().users[userId],
    saveUser: (userId, prefs) => {
        set( (state) => ({
            users: {
                ...state.users,
                [userId]: prefs
            }
        }))
    }
}),{ name: "prefs" }))

export default useMultiUserPrefStore