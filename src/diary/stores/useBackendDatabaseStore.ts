import {create} from "zustand";
import {persist} from "zustand/middleware";
import Classrooms, {Classroom} from "../types/database/Classrooms";
import Marks, {Mark} from "../types/database/Marks";
import Subjects, {Subject} from "../types/database/Subjects";
import Tasks, {Task} from "../types/database/Tasks";
import Teachers, {Teacher} from "../types/database/Teachers";
import Topics, {Topic} from "../types/database/Topics";
import {UUID} from "../types/UUID";
import isEqual from "lodash/isEqual"
import ScheduleItems, {ScheduleItem} from "../types/database/ScheduleItems";


interface MultiUserStore {
    classrooms  : Classrooms
    addClassroom: (classroom: Classroom, uid: UUID) => void

    marks       : Marks
    addMark     : (mark: Mark, uid: UUID) => void

    subjects    : Subjects
    addSubject  : (subject: Subject, uid: UUID) => void

    tasks       : Tasks
    addTask     : (task: Task, uid: UUID) => void

    teachers    : Teachers
    addTeacher  : (teacher: Teacher, pin: string) => void

    topics      : Topics
    addTopic    : (topic: Topic, uid: UUID) => void

    items       : ScheduleItems
    addItem     : (item: ScheduleItem, uid: UUID) => void
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
    }
}),{ name: "backendSaves" }))

export default useBackendDatabaseStore