import MainNavPage from "./MainNavPage.jsx";
import {useEffect, useRef, useState} from "react";
import useBackendDatabaseStore from "../../stores/useBackendDatabaseStore.ts";
import ListofCards from "../../elements/ListofCards.jsx";
import TextCard from "../../elements/TextCard.jsx";

export default function SchedulePage() {
    const [curDate, setCurDate] = useState(Date.parse("2026-11-09"))
    const dateRef = useRef(null)

    const items = useBackendDatabaseStore((state) => state.items)
    const subjects = useBackendDatabaseStore((state) => state.subjects)
    const classrooms = useBackendDatabaseStore((state) => state.classrooms)


    return (
        <MainNavPage className="" >
            <div className="w-full flex flex-col items-stretch justify-evenly gap-1">
                <input ref={dateRef} type="date" className="h-14 w-full bg-black text-white" onChange={()=>{
                    if (dateRef.current){
                        setCurDate( Date.parse(dateRef.current.value))
                    }
                }} />
                <ListofCards
                    label={new Date(curDate).toDateString()}
                >
                    { Object.keys(items).map((e) =>
                        ( curDate === Date.parse(items[e]?.date) && (
                            <TextCard
                                key={e}
                                label={subjects[items[e].subjectId].name}
                                desc={classrooms[items[e].classroomId].name}
                            >
                                {`${items[e].startTime} / ${items[e].endTime}`}
                            </TextCard>
                        ))
                    )}
                </ListofCards>

            </div>
        </MainNavPage>
    )
}