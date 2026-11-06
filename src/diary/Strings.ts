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
        profile: {
            logout: "Logout",
        },
        main_navigation: {
            schedule: "Schedule",
            marks: "Marks",
            profile: "You",
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
        profile: {
            logout: "Выйти",
        },
        main_navigation: {
            schedule: "Расписание",
            marks: "Оценки",
            profile: "Вы",
        }
    }
}
export default Strings;