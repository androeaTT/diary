import TranslationDictionary from "./types/TranslationDictionary";

const Strings: TranslationDictionary = {
    en: {
        loginpage: {
            next: "Next",
            login: "Login",
            nameplaceholder : "Enter username...",
            pwdplaceholder : "Enter password...",
            tokenError: "Login or password are invalid.",
            unknownError: "Unknown error occurred.",
        },
        info: {
            info: "Information",
            fullName: "Full Name",
            school: "School",
            schoolNumber: "School Number",
            grade: "Grade",
            pin: "PIN",
            email: "Email",
            birthday: "Birthday",
            city: "City",
            country: "Country",
            district: "District",
        },
        main_navigation: {
            schedule: "Schedule",
            marks: "Marks",
            profile: "You",
        },
        settings: {
            theme: "Theme",
            changeTheme: "Change theme",
            systemTheme: "System",
            lightTheme: "Light",
            darkTheme: "Dark",
        }
    },
    ru: {
        loginpage: {
            next: "Далее",
            login: "Войти",
            nameplaceholder : "Введите логин...",
            pwdplaceholder : "Введите пароль...",
            tokenError: "Неправильный логин или пароль",
            unknownError: "Неизвестная ошибка.",
        },
        info: {
            info: "Информация",
            fullName: "Полное имя",
            school: "Школа",
            schoolNumber: "ОКПО Школы",
            grade: "Класс",
            email: "Email",
            pin: "ПИН",
            birthday: "День рождения",
            city: "Город",
            country: "Страна",
            district: "Район",
        },
        main_navigation: {
            schedule: "Расписание",
            marks: "Оценки",
            profile: "Вы",
        },
        settings: {
            theme: "Тема",
            changeTheme: "Изменить тему",
            systemTheme: "Системная",
            lightTheme: "Светлая",
            darkTheme: "Тёмная",
        }
    }
}
export default Strings;