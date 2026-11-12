import {UUID} from "../UUID";
import ItemResponse from "../responses/all";




export type Topic = {
    "body" : string,
    "date"  : string
};

type Topics = {
    [key: UUID]: Topic;
}
export default Topics