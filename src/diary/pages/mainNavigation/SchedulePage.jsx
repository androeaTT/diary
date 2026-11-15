import MainNavPage from "./MainNavPage.jsx";
import {useRef, useState} from "react";
import ScheduleDay from "../../elements/ScheduleDay.jsx";

export default function SchedulePage() {
    const [curDate, setCurDate] = useState(Date.parse("2026-11-16"))
    const dateRef = useRef(null)




    return (
        <MainNavPage className="h-dvh max-h-dvh overflow-y-scroll" >
            <div className="w-full p-2 flex flex-col items-stretch justify-evenly gap-1">

                <input
                    ref={dateRef}
                    type="date"
                    className="h-14 w-full bg-black text-white"
                    onChange={ ()=>{
                        if (dateRef.current){
                            setCurDate( Date.parse(dateRef.current.value))
                            console.log("parsed: " + Date.parse(dateRef.current.value))
                        }
                    }}
                />

                <ScheduleDay dateStamp={curDate} />
                <ScheduleDay dateStamp={curDate} />
                <ScheduleDay dateStamp={curDate} />

            </div>
        </MainNavPage>
    )
}