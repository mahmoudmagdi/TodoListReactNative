import Realm from 'realm';

export const TODOS_SCHEMA = 'Todos';

export class Todo extends Realm.Object<Todo> {
    _id!: number;
    title?: string;

    static schema: Realm.ObjectSchema = {
        name: TODOS_SCHEMA,
        primaryKey: '_id',
        properties: {
            _id: 'int',
            title: 'string',
        }
    };
}
