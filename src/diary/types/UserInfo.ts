export type UserInfo = {
    birthDate: string
    changePassword: boolean

    cityKg: string | null
    cityRu: string | null
    countryKg: string | null
    countryRu: string | null
    districtKg: string | null
    districtRu: string | null
    schoolKg: string
    schoolRu: string
    schoolRuShort: string
    schoolUceoNumber: string

    firstName: string
    lastName: string
    middleName: string

    grade: number
    letter: string

    email: string | null
    pin: number
    pinStr: string

    classId: string
    studentId: string
    userId: string
    schoolId: string
    schoolInstitutionId: string

    token: string

    fullName: string
    type: string
}