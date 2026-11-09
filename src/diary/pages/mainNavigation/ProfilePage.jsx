import ProfilePictire from "../../elements/ProfilePictire.jsx";
import useUserdataStore from "../../stores/useUserdataStore.ts";
import Card from "../../elements/Card.jsx";
import {twMerge} from "tailwind-merge";
import {KeyboardArrowRight} from "@nine-thirty-five/material-symbols-react/rounded";
import {Ripple} from "m3-ripple";
import StudentInfo from "../../elements/widgets/StudentInfo.jsx";


export default function ProfilePage() {
    const firstName = useUserdataStore((state) => state.firstName);
    const lastName = useUserdataStore((state) => state.lastName);

    return (
        <div className="w-full max-w-xl p-2 flex flex-col overflow-y-scroll gap-2" >
            <Card
                className={twMerge(
                    "flex flex-row items-center justify-between",
                    "rounded-4xl overflow-hidden w-full gap-4",
                    "p-4"
                )}
            >
                <ProfilePictire className="h-14" />
                <span align="center" className="text-[14pt] font-normal " >
                    {firstName + " " + lastName}
                </span>
                <KeyboardArrowRight size={24} />
                <Ripple />
            </Card>
            <StudentInfo padding={0} />
        </div>
    )
}