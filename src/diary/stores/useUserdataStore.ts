import { create } from "zustand";
import {UserInfo} from "../types/UserInfo";


interface Session extends UserInfo{
    changeUser: (user: UserInfo) => void
    resetUser: () => void
    logout: () => void
}

const initUserInfo: UserInfo = {
    birthDate: '',
    changePassword: false,

    cityKg: "",
    cityRu: "",
    countryKg: "",
    countryRu: "",
    districtKg: "",
    districtRu: "",
    schoolKg: "",
    schoolRu: "",
    schoolRuShort: "",
    schoolUceoNumber: "",

    firstName: "",
    lastName: "",
    middleName: "",

    grade: 0,
    letter: "",

    email: "",
    pin: 0,
    pinStr: "",

    classId: "",
    studentId: "",
    userId: "",
    schoolId: "",
    schoolInstitutionId: "",

    token: "",

    fullName: "",
    type: "",
}

const useUserdataStore = create<Session>((set, get) => ({
    ...initUserInfo,

    changeUser: (user) => { set(user) },
    resetUser:  () => { set(initUserInfo) },
    logout:     () => { set(initUserInfo) },
}));

export default useUserdataStore