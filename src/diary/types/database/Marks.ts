import {UUID} from "../UUID";
import MarksValue from "../MarksValue";
import Term from "../Term";

export type Mark = {
    "mark"  : MarksValue,
    "date"  : string,
    "term"  : Term
};

type Marks = {
    [key: UUID]: Mark;
}
export default Marks