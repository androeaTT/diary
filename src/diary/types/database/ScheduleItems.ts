import {UUID} from "../UUID";

export type ScheduleItem = {
    date        : string,
    startTime   : string,
    endTime     : string,

    teacherPin  : string,
    classroomId : UUID,
    subjectId   : UUID,
    taskId      : UUID,
    topicId     : UUID,
};

type ScheduleItems = {
    [key: UUID]: ScheduleItem;
}
export default ScheduleItems