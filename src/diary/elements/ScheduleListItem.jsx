import TextCard from "./TextCard.jsx";
import {BookFive, KeyboardArrowRight} from "@nine-thirty-five/material-symbols-react/rounded";
import RandBackground from "./RandBackground.jsx";


export default function ScheduleListItem({ subject, classroom }){
    return (
        <TextCard
            label={subject}
            desc={classroom}
            className=""
            left={
                <RandBackground
                    seed={subject}
                    className="p-3 rounded-full text-xl"
                    l={30}
                    s={50}
                >
                        <BookFive />
                </RandBackground>
            }
            ripple={true}
        >
            <div className="text-xl">
                {<KeyboardArrowRight />}
            </div>
        </TextCard>
    )
}