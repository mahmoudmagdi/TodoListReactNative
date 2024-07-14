import {Todo} from "../../../model/todo";
import todoReducers from "../../../store/redux/reducers";
import {addTodo, deleteTodo, setTodos, updateTodo} from "../../../store/redux/actions";

describe("Todo Reducers", () => {
    const initialState = {
        todos: [] as Todo[]
    };

    it("should handle addTodo", () => {
        const newTodo = {_id: 1, title: "New Todo"} as Todo;
        const action = addTodo(newTodo);
        const newState = todoReducers(initialState, action);

        expect(newState.todos).toHaveLength(1);
        expect(newState.todos[0]).toEqual(newTodo);
    });

    it("should handle deleteTodo", () => {
        const stateWithTodo = {
            todos: [{_id: 1, title: "Test Todo"} as Todo]
        };
        const action = deleteTodo(1);
        const newState = todoReducers(stateWithTodo, action);

        expect(newState.todos).toHaveLength(0);
    });

    it("should handle updateTodo", () => {
        const stateWithTodo = {
            todos: [{_id: 1, title: "Old Todo"} as Todo]
        };
        const updatedTodo: Todo = {_id: 1, title: "Updated Todo"} as Todo;
        const action = updateTodo(updatedTodo);
        const newState = todoReducers(stateWithTodo, action);

        expect(newState.todos).toHaveLength(1);
        expect(newState.todos[0].title).toEqual("Updated Todo");
    });

    it("should handle setTodos", () => {
        const todos: Todo[] = [
            {_id: 1, title: "Test Todo 1"} as Todo,
            {_id: 2, title: "Test Todo 2"} as Todo
        ];
        const action = setTodos(todos);
        const newState = todoReducers(initialState, action);

        expect(newState.todos).toHaveLength(2);
        expect(newState.todos).toEqual(todos);
    });
});
