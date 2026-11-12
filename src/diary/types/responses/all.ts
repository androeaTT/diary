export interface ItemResponseTeacher {
    pinAsString: string | null;
    pin: number | null;
    firstName: string | null;
    lastName: string | null;
    midName: string | null;
    marks: any[] | null;
}

export interface ItemResponseStudent {
    gradeName: string | null;
    scheduleItemId: string | null;
    lessonDay: string | null;
    lessonDayAsDateOnly: string | null;
    marks: any | null;
    marksForToday: any | null;
    objectId: string | null;
    schoolId: string | null;
    gradeId: string | null;
    okpo: string | null;
    pin: number | null;
    pinAsString: string | null;
    grade: number | null;
    letter: string | null;
    name: string | null;
    lastName: string | null;
    firstName: string | null;
    midName: string | null;
    email: string | null;
    phone: string | null;
    groupId: string | null;
    subjectGroupName: string | null;
    teacher: any | null;
    districtName: string | null;
    cityName: string | null;
}

export interface ItemResponseRoomData {
    id: string | null;
    roomName: string | null;
    floor: string | null;
    block: string | null;
}

export interface ItemResponseSubject {
    code: string | null;
    name: string | null;
    nameKg: string | null;
    nameRu: string | null;
    short: string | null;
    shortKg: string | null;
    shortRu: string | null;
    grade: number | null;
}

export interface ItemResponseTopic {
    objectId: string | null;
    code: number | null;
    name: string | null;
    short: string | null;
    lessonDay: string | null;
    attachments: any[] | null;
}

export interface ItemResponseTask {
    objectId: string | null;
    code: number | null;
    name: string | null;
    note: string | null;
    lessonDay: string | null;
    lessonHour: string | null;
    attachments: any[] | null;
}

export interface ItemResponseMark {
    mark_id: string | null;
    ls_uid: string | null;
    uid: string | null;
    idStudent: string | null;
    student_pin: number | null;
    student_pin_as_string: string | null;
    first_name: string | null;
    last_name: string | null;
    mid_name: string | null;
    mark: number | null;
    mark_type: string | null;
    old_mark: number | null;
    custom_mark: string | null;
    absent: boolean | null;
    absent_type: string | null;
    absent_reason: string | null;
    late_minutes: number | null;
    status: string | null;
    note: string | null;
    created_at: string | null;
    updated_at: string | null;
    subject: string | null;
    topic: string | null;
    task: string | null;
    teacher: string | null;
    student: string | null;
    bell: string | null;
    lessonDay: string | null;
    message: string | null;
    success: boolean | null;
}

export default interface ItemResponse {
    teacher: ItemResponseTeacher | null;
    student: ItemResponseStudent | null;
    id: number | null;
    gbId: number | null;
    uid: string | null;
    scheduleItemId: string | null;
    okpo: string | null;
    gradeId: string | null;
    gradeName: string | null;
    grade: number | null;
    isKrujok: boolean | null;
    letter: string | null;
    group: number | null;
    year: number | null;
    term: number | null;
    month: number | null;
    day: number | null;
    shift: number | null;
    startTime: string | null;
    endTime: string | null;
    lessonTime: string | null;
    lessonDay: string | null;
    groupId: string | null;
    subjectGroupName: string | null;
    lesson: number | null;
    roomData: ItemResponseRoomData | null;
    room: any | null;
    lang: any | null;
    status: any | null;
    note: any | null;
    lecturer: any | null;
    subjectId: string | null;
    subject: ItemResponseSubject | null;
    topic: ItemResponseTopic | null;
    task: ItemResponseTask | null;
    lastTask: ItemResponseTask | null;
    school: string | null;
    schoolNameKg: string | null;
    schoolNameRu: string | null;
    marks: (ItemResponseMark | null)[] | null;
    allTopics: any | null;
    allTasks: any | null;
    dayOfWeek: number | null;
    isContentSubject: boolean | null;
    isTwelve: boolean | null;
    orderIndex: number | null;
}