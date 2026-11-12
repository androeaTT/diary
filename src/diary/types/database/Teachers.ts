
export type Teacher = {
    "firstName" : string,
    "lastName"  : string,
    "midName"   : string,
};

type Teachers = {
    [key: string]: Teacher;
}
export default Teachers