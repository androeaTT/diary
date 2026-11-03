import { create } from "zustand";
import {UserInfo} from "../types/UserInfo";
import useUsersStore from "./useUsersStore";
import useUiStore from "./useUiStore";
import FullscreenPage from "../types/FullscreenPage";

interface Session {
    birthDate: Date;
    changePassword: boolean;
    loginRequired: boolean;

    cityKg: string;
    cityRu: string;
    countryKg: string;
    countryRu: string;
    districtKg: string;
    districtRu: string;
    schoolKg: string;
    schoolRu: string;
    schoolRuShort: string;
    schoolUceoNumber: string;

    firstName: string;
    lastName: string;
    middleName: string;

    grade: number;
    letter: string;

    email: string;
    pin: number;
    pinStr: string;

    classId: string;
    studentId: string;
    userId: string;
    schoolId: string;
    schoolInstitutionId: string;

    token: string;

    fullName: string;
    type: string;

    changeUser: (user: UserInfo) => void;
    logout: () => void;
    init: () => void;
}

const useUserSessionStore = create<Session>((set, get) => ({
    birthDate: new Date(0),
    changePassword: false,
    loginRequired: true,

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

    changeUser: (user) => {
        set({
            birthDate: user.birthDate,
            changePassword: user.changePassword,
            loginRequired: false,

            cityKg: user.cityKg,
            cityRu: user.cityRu,
            countryKg: user.countryKg,
            countryRu: user.countryRu,
            districtKg: user.districtKg,
            districtRu: user.districtRu,
            schoolKg: user.schoolKg,
            schoolRu: user.schoolRu,
            schoolRuShort: user.schoolRuShort,
            schoolUceoNumber: user.schoolUceoNumber,

            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,

            grade: user.grade,
            letter: user.letter,

            email: user.email,
            pin: user.pin,
            pinStr: user.pinStr,

            classId: user.classId,
            studentId: user.studentId,
            userId: user.userId,
            schoolId: user.schoolId,
            schoolInstitutionId: user.schoolInstitutionId,

            fullName: user.fullName,
            type: user.type,
        })
        localStorage.setItem("currentUserId", get().userId)
    },
    logout: () => {
        set({
            birthDate: new Date(0),
            changePassword: false,
            loginRequired: true,

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
        })
        useUiStore.getState().changeView(FullscreenPage.REQUIRED_LOGIN_PAGE)
    },
    init: () => {
        const currentUserId = localStorage.getItem("currentUserId");
        if (!currentUserId || currentUserId.length < 3) {
            set({loginRequired: true})
            return
        }
        const usr = useUsersStore.getState().getUser(currentUserId)
        if (!usr || usr.token.length < 3)
            return
        get().changeUser(usr)
    }
}));

export default useUserSessionStore;