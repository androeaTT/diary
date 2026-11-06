import {Button} from "../Button.jsx";
import {Logout} from "@nine-thirty-five/material-symbols-react/rounded";
import useUserdataStore from "../../stores/useUserdataStore.ts";
import useMultiUserdataStore from "../../stores/useMultiUserdataStore.ts";
import useUiStore from "../../stores/useUiStore.ts";


export default function LogoutButton({className}) {
    const strings = useUiStore((state) => state.strings)
    const getString = useUiStore((state) => state.getString)

    return (<Button
        variant="err-filled"
        icon={<Logout />}
        label={getString("profile.logout", strings)}
        className={className}
        onClick={() => {
            useMultiUserdataStore.getState().logout(useUserdataStore.getState().userId)

        }}
    />)
}