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

interface TermDate {
    from: Date,
    to: Date
}

export function getTermDate(term: Term): TermDate{
    switch (term) {
        case Term.FIRST:
            return {
                from: new Date("2026-09-15"),
                to: new Date("2026-11-10")
            }
        case Term.SECOND:
            return {
                from: new Date("2026-11-16"),
                to: new Date("2026-12-31")
            }
        case Term.THIRD:
            return {
                from: new Date("2027-01-11"),
                to: new Date("2027-03-02")
            }
        case Term.FOURTH:
            return {
                from: new Date("2027-03-09"),
                to: new Date("2027-05-25")
            }
    }
}

export default Term