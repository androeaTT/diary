import {Button} from "./Button.jsx";
import {Logout} from "@nine-thirty-five/material-symbols-react/rounded";
import useUserSessionStore from "../stores/useUserSessionStore.ts";
import useUsersStore from "../stores/useUsersStore.ts";
import useUiStore from "../stores/useUiStore.ts";


export default function LogoutButton({className}) {
    const strings = useUiStore((state) => state.strings)
    const getString = useUiStore((state) => state.getString)

    return (<Button
        variant="err-filled"
        icon={<Logout />}
        label={getString("profile.logout", strings)}
        className={className}
        onClick={() => {
            useUsersStore.getState().logout(useUserSessionStore.getState().userId)

        }}
    />)
}