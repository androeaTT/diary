import {create} from "zustand";
import {persist} from "zustand/middleware";
import Classrooms, {Classroom} from "../types/database/Classrooms";
import Marks, {Mark} from "../types/database/Marks";
import Subjects, {Subject} from "../types/database/Subjects";
import Tasks, {Task} from "../types/database/Tasks";
import Teachers, {Teacher} from "../types/database/Teachers";
import Topics, {Topic} from "../types/database/Topics";
import {isUUID, UUID} from "../types/UUID";
import isEqual from "lodash/isEqual"
import ScheduleItems, {ScheduleItem} from "../types/database/ScheduleItems";
import Term, {getTermDate} from "../types/Term";
import {sNetwork} from "../Network"
import useUserdataStore from "./useUserdataStore";
import ItemResponse from "../types/responses/all";
import {
    convertClassroom, ConvertedClassroom,
    convertItem, convertMark,
    convertSubject,
    convertTask,
    convertTeacher,
    convertTopic
} from "../types/database/converter";


interface MultiUserStore {
    classrooms  : Classrooms
    addClassroom: (classroom: Classroom , uid: UUID) => void

    marks       : Marks
    addMark     : (mark: Mark           , uid: UUID) => void

    subjects    : Subjects
    addSubject  : (subject: Subject     , uid: UUID) => void

    tasks       : Tasks
    addTask     : (task: Task           , uid: UUID) => void

    teachers    : Teachers
    addTeacher  : (teacher: Teacher     , pin:string)=> void

    topics      : Topics
    addTopic    : (topic: Topic         , uid: UUID) => void

    items       : ScheduleItems
    addItem     : (item: ScheduleItem   , uid: UUID) => void


    updatedAt   : Date | null,
    update      : () => Promise<void>
}

const useBackendDatabaseStore = create<MultiUserStore>()( persist((set, get) => ({
    classrooms  : {},
    addClassroom: (classroom, uid) => {
        const classrooms = get().classrooms
        const curClassroom = classrooms[uid]

        if (curClassroom === undefined || !isEqual(curClassroom, classroom)){
            set( (state) => ({
                classrooms: {
                    ...state.classrooms,
                    [uid]: classroom
                }
            }) )
        }
    },

    marks       : {},
    addMark     : (mark, uid) => {
        const marks = get().marks
        const curMark = marks[uid]

        if (curMark === undefined || !isEqual(curMark, mark)) {
            set((state) => ({
                marks: {
                    ...state.marks,
                    [uid]: mark
                }
            }))
        }
    },

    subjects    : {},
    addSubject  : (subject, uid) => {
        const subjects = get().subjects
        const curSubject = subjects[uid]

        if (curSubject === undefined || !isEqual(curSubject, subject)) {
            set((state) => ({
                subjects: {
                    ...state.subjects,
                    [uid]: subject
                }
            }))
        }
    },

    tasks       : {},
    addTask     : (task, uid) => {
        const tasks = get().tasks
        const curTask = tasks[uid]

        if (curTask === undefined || !isEqual(curTask, task)) {
            set((state) => ({
                tasks: {
                    ...state.tasks,
                    [uid]: task
                }
            }))
        }
    },

    teachers    : {},
    addTeacher  : (teacher, pin) => {
        const teachers = get().teachers
        const curTeacher = teachers[pin]

        if (curTeacher === undefined || !isEqual(curTeacher, teacher)) {
            set((state) => ({
                teachers: {
                    ...state.teachers,
                    [pin]: teacher
                }
            }))
        }
    },

    topics      : {},
    addTopic    : (topic, uid) => {
        const topics = get().topics
        const curTopic = topics[uid]

        if (curTopic === undefined || !isEqual(curTopic, topic)) {
            set((state) => ({
                topics: {
                    ...state.topics,
                    [uid]: topic
                }
            }))
        }
    },

    items       : {},
    addItem     : (item: ScheduleItem, uid: UUID) => {
        const items = get().items
        const curItem = items[uid]

        if (curItem === undefined || !isEqual(curItem, item)) {
            set((state) => ({
                items: {
                    ...state.items,
                    [uid]: item
                }
            }))
        }
    },

    updatedAt   : null,
    update      : async () => {
        const token     = `Bearer ${useUserdataStore.getState().token}`
        const userId    = useUserdataStore.getState().userId
        const state     = get()
        if (!isUUID(userId)) return


        const yearStart = getTermDate(Term.FIRST).from.toDateString()
        const yearEnd   = getTermDate(Term.FOURTH).to.toDateString()

        function ensureArray(response: unknown): ItemResponse[] {
            const actionResult = (response as any)?.actionResult;
            if (!actionResult || !Array.isArray(actionResult)) {
                return []
            }
            return actionResult as ItemResponse[];
        }

        const [
            rawScheduleResponse,
            rawMarks1Response,
            rawMarks2Response,
            rawMarks3Response,
            rawMarks4Response,
            rawMarks1ResponseAbsent,
            rawMarks2ResponseAbsent,
            rawMarks3ResponseAbsent,
            rawMarks4ResponseAbsent,
        ] = await Promise.all([
            sNetwork.getGradeList(token, {
                "start_date": yearStart,
                "end_date": yearEnd
            }),
            sNetwork.getGradeterm1(token, {}),
            sNetwork.getGradeterm2(token, {}),
            sNetwork.getGradeterm3(token, {}),
            sNetwork.getGradeterm4(token, {}),
            sNetwork.getGradeterm1(token, {"absent": 1}),
            sNetwork.getGradeterm2(token, {"absent": 1}),
            sNetwork.getGradeterm3(token, {"absent": 1}),
            sNetwork.getGradeterm4(token, {"absent": 1})
        ]);

        const scheduleResponse      = ensureArray(rawScheduleResponse);
        const marks1Response        = ensureArray(rawMarks1Response);
        const marks2Response        = ensureArray(rawMarks2Response);
        const marks3Response        = ensureArray(rawMarks3Response);
        const marks4Response        = ensureArray(rawMarks4Response);
        const marks1ResponseAbsent  = ensureArray(rawMarks1ResponseAbsent);
        const marks2ResponseAbsent  = ensureArray(rawMarks2ResponseAbsent);
        const marks3ResponseAbsent  = ensureArray(rawMarks3ResponseAbsent);
        const marks4ResponseAbsent  = ensureArray(rawMarks4ResponseAbsent);

        const bigBob: ItemResponse[] = [
            ...scheduleResponse,
            ...marks1Response,
            ...marks2Response,
            ...marks3Response,
            ...marks4Response,
            ...marks1ResponseAbsent,
            ...marks2ResponseAbsent,
            ...marks3ResponseAbsent,
            ...marks4ResponseAbsent
        ];

        bigBob.forEach((e) => {
            const classroom = convertClassroom(e)
            const subject   = convertSubject(e)
            const task      = convertTask(e)
            const topic     = convertTopic(e)
            const teacher   = convertTeacher(e)
            const mark      = convertMark(e)

            const item      = convertItem(e, userId)

            if (classroom)
                state.addClassroom(classroom.object, classroom.id )
            if (subject)
                state.addSubject(subject.object, subject.id)
            if (task)
                state.addTask(task.object, task.id)
            if (topic)
                state.addTopic(topic.object, topic.id)
            if (teacher)
                state.addTeacher(teacher.object, teacher.pin)
            if (item)
                state.addItem(item.object, item.id)
            if (mark)
                state.addMark(mark.object, mark.id)
        })
    }
}),{ name: "backendSaves" }))

export default useBackendDatabaseStore