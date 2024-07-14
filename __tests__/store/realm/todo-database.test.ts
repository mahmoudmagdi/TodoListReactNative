import {UpdateMode} from "realm";
import {
    getTodoFromRealm,
    removeTodoFromRealm,
    saveTodoToRealm,
    updateTodoInRealm
} from "../../../store/realm/todo-database";
import realm from "../../../store/realm/realmConfig";
import {Todo, TODOS_SCHEMA} from "../../../model/todo";
import {addTodo, deleteTodo, setTodos, updateTodo} from "../../../store/redux/actions";

jest.mock("../../../store/realm/realmConfig", () => ({
    objects: jest.fn(),
    write: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    objectForPrimaryKey: jest.fn()
}));

jest.mock("../../../store/redux/actions", () => ({
    addTodo: jest.fn(),
    deleteTodo: jest.fn(),
    setTodos: jest.fn(),
    updateTodo: jest.fn()
}));

describe("Realm Operations", () => {
    let dispatch: jest.Mock;

    beforeEach(() => {
        dispatch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch todos from Realm and dispatch setTodos", () => {
        const mockTodos: Todo[] = [{_id: 1, title: "Test Todo"} as Todo];
        (realm.objects as jest.Mock).mockReturnValue(mockTodos);

        getTodoFromRealm()(dispatch);

        expect(realm.objects).toHaveBeenCalledWith(TODOS_SCHEMA);
        expect(dispatch).toHaveBeenCalledWith(setTodos(mockTodos));
    });

    it("should save a todo to Realm and dispatch addTodo", () => {
        const newTodo: Todo = {_id: 1, title: "New Todo"} as Todo;

        (realm.write as jest.Mock).mockImplementation((callback) => callback());

        saveTodoToRealm(newTodo)(dispatch);

        expect(realm.write).toHaveBeenCalled();
        expect(realm.create).toHaveBeenCalledWith(TODOS_SCHEMA, newTodo);
        expect(dispatch).toHaveBeenCalledWith(addTodo(newTodo));
    });

    it("should remove a todo from Realm and dispatch deleteTodo", () => {
        const todoId = 1;
        const mockTodo: Todo = {_id: 1, title: "Test Todo"} as Todo;
        (realm.objectForPrimaryKey as jest.Mock).mockReturnValue(mockTodo);

        (realm.write as jest.Mock).mockImplementation((callback) => callback());

        removeTodoFromRealm(todoId)(dispatch);

        expect(realm.write).toHaveBeenCalled();
        expect(realm.objectForPrimaryKey).toHaveBeenCalledWith(TODOS_SCHEMA, todoId);
        expect(realm.delete).toHaveBeenCalledWith(mockTodo);
        expect(dispatch).toHaveBeenCalledWith(deleteTodo(todoId));
    });

    it("should update a todo in Realm and dispatch updateTodo", () => {
        const updatedTodo = {_id: 1, title: "Updated Todo"} as Todo;

        (realm.write as jest.Mock).mockImplementation((callback) => callback());

        updateTodoInRealm(updatedTodo)(dispatch);

        expect(realm.write).toHaveBeenCalled();
        expect(realm.create).toHaveBeenCalledWith(TODOS_SCHEMA, updatedTodo, UpdateMode.Modified);
        expect(dispatch).toHaveBeenCalledWith(updateTodo(updatedTodo));
    });
});
