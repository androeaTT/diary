import Language from "./Language";

export interface Preferences {
    prefLang: Language;
    theme: "dark" | "light" | "system";
}