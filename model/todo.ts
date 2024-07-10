import Realm from 'realm';

class Todo extends Realm.Object {
    _id!: number;
    title?: string;

    static schema: Realm.ObjectSchema = {
        name: 'Todo',
        primaryKey: '_id',
        properties: {
            _id: 'int',
            title: 'string',
        },
    };
}

export default Todo;
