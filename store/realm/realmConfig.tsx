import Realm from "realm"
import {Todo} from "../../model/todo";

let realm = new Realm({
    schema: [Todo],
    schemaVersion: 4
});

export default realm;
