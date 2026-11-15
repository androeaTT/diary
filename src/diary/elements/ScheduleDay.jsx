import ScheduleListItem from "./ScheduleListItem.jsx";
import ListofCards from "./ListofCards.jsx";
import useBackendDatabaseStore from "../stores/useBackendDatabaseStore.ts";


export default function ScheduleDay({ dateStamp }){
    const items = useBackendDatabaseStore((state) => state.items)
    const subjects = useBackendDatabaseStore((state) => state.subjects)
    const classrooms = useBackendDatabaseStore((state) => state.classrooms)

    return (
        <ListofCards
            label={new Date(dateStamp).toDateString()}
        >
            { Object.keys(items).map((e) =>
                ( dateStamp === Date.parse(items[e]?.date) && (
                    <ScheduleListItem
                        key={e}
                        subject={subjects[items[e].subjectId].name}
                        classroom={classrooms[items[e].classroomId].name}
                    />
                ))
            )}
        </ListofCards>
    )
}