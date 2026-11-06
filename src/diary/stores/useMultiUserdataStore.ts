import { create } from "zustand"
import {persist} from "zustand/middleware"

import {UserInfo} from "../types/UserInfo"
import useUiStore from "./useUiStore"

type UserRecord = Record<string, UserInfo>

interface Users {
    users: UserRecord
    currentUserId: string;
    isLoginRequired: boolean;
    add: (user: UserInfo) => void;
    logout: (userId: string) => void;
    init: () => void
    changeUser: (userId: string) => void
}


const useMultiUserdataStore = create<Users>()( persist((set, get, store) => ({
    users: {},
    currentUserId: "",
    isLoginRequired: false,

    add: (user) => {
        const strings = useUiStore.getState().strings
        const getString = useUiStore.getState().getString

        set((state) => {
            if (user.token.length > 10) {
                return {
                    users: {
                        ...state.users,
                        [user.userId]: user
                    }
                }
            } else {
                throw new Error(getString("loginpage.tokenError", strings));
            }

        })
        set({
            isLoginRequired: Object.keys(get().users).length < 1
        })
    },
    logout: (userId) => {
        set((state) => {
            const {[userId]: trash, ...newDict} = state.users

            return { users: newDict }
        })
    },
    init: () => {
        const state = get()
        const keys = Object.keys(state.users)
        set({
            isLoginRequired: keys.length < 1
        })
    },

    changeUser: (userId) => ( set({ currentUserId: userId }) )
}),{
    name: "userdata",
    onRehydrateStorage: () => (state) => {
        if (state) {
            state.init()
        }
    }
}))

export default useMultiUserdataStore