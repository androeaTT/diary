import {UserInfo} from "../UserInfo"

export interface School {
    institutionId: string
    isStaffActive: boolean
    name: string
    nameRu: string
    okpo: string
    schoolId: string
    short: string
}

export interface StudentProfile {
    birthdate: string       // ISO 8601 date string
    changePassword: boolean
    city: string | null
    cityRu: string | null
    classId: string         // UUID
    country: string | null
    countryRu: string | null
    county: string | null
    countyRu: string | null
    district: string | null
    districtRu: string | null
    email: string | null
    first_name: string
    grade: number
    isAgreementSigned: boolean
    last_name: string
    letter: string
    locale: string | null
    mid_name: string
    okpo: string
    password: string | null
    phone: string | null
    pin: number
    pinAsString: string
    refresh: string | null
    school: School
    schoolOkpo: string
    studentId: string       // UUID
    studentName: string
    token: string
    type: string            // e.g., "student"
    userId: string          // UUID
}

export function convertResponse(json: StudentProfile): UserInfo {
    return {
        birthDate: json.birthdate,
        changePassword: json.changePassword,

        cityKg: json.city,
        cityRu: json.cityRu,
        countryKg: json.country,
        countryRu: json.countryRu,
        districtKg: json.district,
        districtRu: json.districtRu,
        schoolKg: json.school.name,
        schoolRu: json.school.nameRu,
        schoolRuShort: json.school.short,
        schoolUceoNumber: json.schoolOkpo,

        firstName: json.first_name,
        lastName: json.last_name,
        middleName: json.mid_name,

        grade: json.grade,
        letter: json.letter,

        email: json.email,
        pin: json.pin,
        pinStr: json.pinAsString,

        classId: json.classId,
        studentId: json.studentId,
        userId: json.userId,
        schoolId: json.school.schoolId,
        schoolInstitutionId: json.school.institutionId,

        token: json.token,

        fullName: json.studentName,
        type: json.type
    }
}