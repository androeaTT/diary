import {UUID} from "../UUID";

export type Classroom = {
    "name"  : string,
    "floor"  : number
};

type Classrooms = {
    [key: UUID]: Classroom;
}
export default Classrooms