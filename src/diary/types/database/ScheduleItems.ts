import {UUID} from "../UUID";

export type ScheduleItem = {
    date        : string,
    startTime   : string,
    endTime     : string,

    teacherPin  : string,
    subjectId   : UUID,
    userId      : UUID,
    classroomId : UUID | null,
    taskId      : UUID | null,
    topicId     : UUID | null,
};

type ScheduleItems = {
    [key: UUID]: ScheduleItem;
}
export default ScheduleItems