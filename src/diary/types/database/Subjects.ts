import {UUID} from "../UUID";

export type Subject = {
    "name" : string,
    "short"  : string,
    "grade"   : number,
};

type Subjects = {
    [key: UUID]: Subject;
}
export default Subjects