import Realm from "realm";
import Todo from "../../model/todo";

const realm = new Realm({
    schema: [Todo],
    schemaVersion: 6,
});

export default realm;
