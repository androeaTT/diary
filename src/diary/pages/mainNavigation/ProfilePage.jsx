import ProfilePictire from "../../elements/ProfilePictire.jsx";
import useUserdataStore from "../../stores/useUserdataStore.ts";
import {useEffect} from "react";


export default function ProfilePage() {
    const fullName = useUserdataStore((state) => state.fullName);

    useEffect(() => {
        fullName
    }, [fullName]);

    return (
        <div className="w-full">
            <div className="flex flex-row items-center justify-center w-full h-28">
                <ProfilePictire fullName={fullName} />
            </div>
        </div>
    )
}