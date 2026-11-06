import ProfilePictire from "../../elements/ProfilePictire.jsx";
import useUserSessionStore from "../../stores/useUserSessionStore.ts";
import {useEffect} from "react";


export default function ProfilePage() {
    const fullName = useUserSessionStore((state) => state.fullName);

    useEffect(() => {
        console.log(useUserSessionStore.getState());
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