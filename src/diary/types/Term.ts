import MarksValue from "./MarksValue";

enum Term {
    FIRST,
    SECOND,
    THIRD,
    FOURTH
}


export function toTermEnum(value: number): Term | undefined {
    if (Object.values(Term).includes(value)) {
        return value as Term;
    }
    return undefined;
}

export default Term