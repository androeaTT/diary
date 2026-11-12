import {UUID} from "../UUID";
import ItemResponse from "../responses/all";

export function convert(resp: ItemResponse): Task | undefined {
    const topic = resp.topic
    if (topic === null)
        return undefined

    return {
        body: topic.name ?? "",
        date: topic.lessonDay ?? ""
    }
}

export type Task = {
    "body" : string,
    "date"  : string,
};

type Tasks = {
    [key: UUID]: Task;
}
export default Tasks