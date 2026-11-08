import {twMerge} from "tailwind-merge";
import ProfilePictire from "../ProfilePictire.jsx";
import useUserdataStore from "../../stores/useUserdataStore.ts";
import useUiStore from "../../stores/useUiStore.ts";
import ListofCards from "../ListofCards.jsx";
import TextCard from "../TextCard.jsx";


export default function StudentInfo({className, padding, gap}) {
    const fullName = useUserdataStore((state) => state.fullName);
    const grade = useUserdataStore((state) => state.grade);
    const letter = useUserdataStore((state) => state.letter);
    const school = useUserdataStore((state) => state.schoolRuShort);
    const schoolNumber = useUserdataStore((state) => state.schoolUceoNumber);
    const pin = useUserdataStore((state) => state.pinStr);
    const email = useUserdataStore((state) => state.email);
    const city = useUserdataStore((state) => state.cityRu);
    const country = useUserdataStore((state) => state.countryRu);
    const district = useUserdataStore((state) => state.districtRu);

    const birthday = useUserdataStore((state) => state.birthDate);
    const date = new Date(birthday)
    const birthdayFormatted = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`


    const strings = useUiStore((state) => state.strings)
    const getString = useUiStore((state) => state.getString)

    return (
        <ListofCards
            label={getString("info.info", strings)}
            className={className}
            gap={gap}
            padding={padding}
        >
            <TextCard
                label={getString("info.fullName", strings)}
            >
                    <span className="text-right">
                        {fullName}
                    </span>
            </TextCard>
            <TextCard
                label={getString("info.grade", strings)}
            >
                    <span className="text-right">
                        {grade + letter}
                    </span>
            </TextCard>
            <TextCard
                label={getString("info.school", strings)}
            >
                    <span className="text-right">
                        {school}
                    </span>
            </TextCard>
            <TextCard
                label={getString("info.schoolNumber", strings)}
            >
                    <span className="text-right">
                        {schoolNumber}
                    </span>
            </TextCard>
            <TextCard
                label={getString("info.pin", strings)}
            >
                    <span className="text-right">
                        {pin}
                    </span>
            </TextCard>
            <TextCard
                label={getString("info.email", strings)}
            >
                    <span className="text-right">
                        {email}
                    </span>
            </TextCard>
            <TextCard
                label={getString("info.birthday", strings)}
            >
                    <span className="text-right">
                        {birthdayFormatted}
                    </span>
            </TextCard>
            <TextCard
                label={getString("info.city", strings)}
            >
                    <span className="text-right">
                        {city}
                    </span>
            </TextCard>
            <TextCard
                label={getString("info.country", strings)}
            >
                    <span className="text-right">
                        {country}
                    </span>
            </TextCard>
            <TextCard
                label={getString("info.district", strings)}
            >
                    <span className="text-right">
                        {district}
                    </span>
            </TextCard>
        </ListofCards>
    )
}