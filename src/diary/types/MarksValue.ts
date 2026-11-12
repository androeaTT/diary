enum MarksValue {
    LATE = 0,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    ABSENT = 10
}

export function toMarksValueEnum(value: number): MarksValue | undefined {
    if (Object.values(MarksValue).includes(value)) {
        return value as MarksValue;
    }
    return undefined;
}

export default MarksValue