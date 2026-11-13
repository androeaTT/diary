import ItemResponse from "../responses/all";
import {isUUID, UUID} from "../UUID";
import {Topic} from "./Topics";
import {Teacher} from "./Teachers";
import {Task} from "./Tasks";
import {Subject} from "./Subjects";
import {Classroom} from "./Classrooms";
import {Mark} from "./Marks";
import {ScheduleItem} from "./ScheduleItems";
import {toMarksValueEnum} from "../MarksValue";
import {toTermEnum} from "../Term";

export interface ConvertedTopic {
    object: Topic
    id: UUID,
}
export interface ConvertedTask {
    object: Task
    id: UUID,
}
export interface ConvertedSubject {
    object: Subject
    id: UUID,
}
export interface ConvertedClassroom {
    object: Classroom
    id: UUID,
}

export interface ConvertedMark {
    object: Mark
    id: UUID,
}
export interface ConvertedScheduleItem {
    object: ScheduleItem
    id: UUID,
}
export interface ConvertedTeacher {
    object: Teacher
    pin: string,
}

export function convertTopic    (resp: ItemResponse): ConvertedTopic | undefined{
    const body = resp.topic?.name
    const date = resp.topic?.lessonDay
    if (!body || !date)
        return undefined

    const id = resp.topic?.objectId
    if (!id)
        return undefined

    if (!isUUID(id))
        return undefined

    return {
        id: id,
        object:{
            body: body,
            date: date
        }
    }
}

export function convertTask     (resp: ItemResponse): ConvertedTask | undefined{
    const body = resp.task?.name
    const date = resp.task?.lessonDay
    if (!body || !date)
        return undefined

    const id = resp.task?.objectId
    if (!id)
        return undefined

    if (!isUUID(id))
        return undefined

    return {
        id: id,
        object:{
            body: body,
            date: date
        }
    }
}

export function convertSubject  (resp: ItemResponse): ConvertedSubject | undefined{
    const name = resp.subject?.nameRu
    const short = resp.subject?.shortRu
    const grade = resp.subject?.grade
    if (!name || !short || !grade)
        return undefined

    const id = resp.subject?.code
    if (!id)
        return undefined
    if (!isUUID(id))
        return undefined

    return {
        id: id,
        object:{
            name: name,
            short: short,
            grade: grade
        }
    }
}

export function convertClassroom(resp: ItemResponse): ConvertedClassroom | undefined {
    const name = resp.roomData?.roomName
    const rawFloor = resp.roomData?.floor;
    const floor = (rawFloor !== null && rawFloor !== undefined && String(rawFloor).trim() !== '')
        ? Number(rawFloor)
        : NaN;
    if (!name || !Number.isFinite(floor))
        return undefined

    const id = resp.roomData?.id
    if (!id)
        return undefined

    if (!isUUID(id))
        return undefined

    return {
        id: id,
        object:{
            name: name,
            floor: floor
        }
    }
}

export function convertMark     (resp: ItemResponse, userId: UUID): ConvertedMark | undefined {
    const rawMark = resp.marks?.[0]?.mark
    const date = resp.marks?.[0]?.created_at
    const subjectId = resp.subject?.code
    const rawTeacherPin = resp.teacher?.pin

    const rawTerm = resp?.term
    if (
        rawMark === undefined   || rawMark === null ||
        !date                   || !subjectId       ||
        rawTerm === undefined   || rawTerm === null ||
        rawTeacherPin === null  || rawTeacherPin == undefined
    ) return undefined

    const teacherPin = rawTeacherPin.toString()
    if (teacherPin === undefined)
        return undefined

    const mark = toMarksValueEnum(rawMark)
    if (mark === undefined)
        return undefined

    const term = toTermEnum(rawTerm)
    if (term === undefined)
        return undefined


    const id = resp.marks?.[0]?.uid
    if (!id)
        return undefined

    if (!isUUID(id))
        return undefined

    if (!isUUID(subjectId))
        return undefined



    return {
        id: id,
        object:{
            mark: mark,
            date: date,
            term: term,
            subjectId: subjectId,
            userId: userId,
            teacherPin: teacherPin
        }
    }
}

export function convertTeacher  (resp: ItemResponse): ConvertedTeacher | undefined {
    const teacher = resp.teacher
    if (teacher === null)
        return undefined

    const firstName     = teacher.firstName
    const lastName      = teacher.lastName
    const midName       = teacher.midName
    if (!firstName || !lastName || !midName)
        return undefined

    const rawPin = teacher.pin
    if ( rawPin === null )
        return undefined
    const pin = String(rawPin)
    if ( !pin )
        return undefined

    return {
        pin: pin,
        object: {
            firstName   : firstName,
            lastName    : lastName,
            midName     : midName,
        }
    }
}

export function convertItem     (resp: ItemResponse, userId: UUID): ConvertedScheduleItem | undefined {
    const date = resp.lessonDay
    const startTime = resp.startTime
    const endTime = resp.endTime

    const rawPin = resp.teacher?.pin
    if ( rawPin === null ) return undefined
    const pin = String(rawPin)

    if ( !pin || !date || !startTime || !endTime )
        return undefined


    const classroomId = resp.roomData?.id
    if (!classroomId)
        return undefined

    if (!isUUID(classroomId))
        return undefined

    const subjectId = resp.subject?.code
    if (!subjectId)
        return undefined

    if (!isUUID(subjectId))
        return undefined

    const taskId = resp.task?.objectId
    if (!taskId)
        return undefined

    if (!isUUID(taskId))
        return undefined

    const topicId = resp.topic?.objectId
    if (!topicId)
        return undefined

    if (!isUUID(topicId))
        return undefined

    const itemId = resp.uid
    if (!itemId)
        return undefined

    if (!isUUID(itemId))
        return undefined



    return {
        id: itemId,
        object: {
            date: date,
            startTime: startTime,
            endTime: endTime,

            userId: userId,
            teacherPin: pin,
            classroomId: classroomId,
            subjectId: subjectId,
            taskId: taskId,
            topicId: topicId
        }
    }
}
