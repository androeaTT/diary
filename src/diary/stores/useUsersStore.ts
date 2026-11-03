import { create } from "zustand";
import {UserInfo} from "../types/UserInfo";
import useUserSessionStore from "./useUserSessionStore";
import useUiStore from "./useUiStore";

interface Users {
    users: UserInfo[];
    isLoginRequired: boolean;
    add: (user: UserInfo) => void;
    getUser: (id: string) => UserInfo | undefined;
    logout: (userId: string) => void;
    init: () => void;
    sync: () => void;
}

const useUsersStore = create<Users>((set, get) => ({
    users: [],
    isLoginRequired: false,

    add: (user) => {
        const strings = useUiStore.getState().strings
        const getString = useUiStore.getState().getString

        set((state) => {
            if (user.token.length > 10) {
                return { users: [...state.users, user] }
            } else {
                throw new Error(getString("loginpage.tokenError", strings));
            }

        })
        get().sync()
    },
    logout: (userId) => {
        set(( state ) => {
            const logoutUserIndex = state.users.findIndex(
                (user) => user.userId === userId
            )

            if (logoutUserIndex === -1) {
                return state;
            }

            const updatedItems = [
                ...state.users.slice(0, logoutUserIndex),
                ...state.users.slice(logoutUserIndex + 1)
            ]

            if (useUserSessionStore.getState().userId === userId) {
                const nextUser = updatedItems.at(-1);

                if (!nextUser) {
                    useUserSessionStore.getState().logout();
                } else {
                    useUserSessionStore.getState().changeUser(nextUser);
                }
            }

            return { users: updatedItems }
        })
        get().sync()
    },
    getUser: (userId) => {
        return get().users.find((user) => user.userId === userId)
    },
    init: () => {
        const usersString = localStorage.getItem("users")

        if (!usersString || usersString.length <= 3)
            return

        if (usersString.length > 3) {
            let parsed: UserInfo[] = JSON.parse(usersString,);
            if (typeof parsed === "string") {
                parsed = JSON.parse(parsed);
            }
            if (!parsed)
                return
            set( { users: parsed } )
        }
    },
    sync: () => {
        const usersString = JSON.stringify( get().users )
        localStorage.setItem("users", JSON.stringify(usersString))
    },
}));

export default useUsersStore