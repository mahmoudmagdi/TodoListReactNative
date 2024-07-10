// Thunk for fetching todos
import realm from "./realmConfig";
import Todo from "../../model/todo";
import {AppDispatch} from "../redux/store";
import {addTodo, deleteTodo, setTodos, updateTodo} from "../redux/actions";
import {UpdateMode} from "realm";
import todo from "../../model/todo";
import {useQuery} from "@realm/react";

const saveTodoToRealm = (todo: Todo) => (dispatch: AppDispatch) => {
    console.log("saveTodoToRealm");
    realm.write(() => {
        console.log("saveTodoToRealm:realm.write");
        realm.create("Todo", todo);
        dispatch(addTodo(todo));
        console.log("saveTodoToRealm:finish");
    });
}

const removeTodoFromRealm = (id: number) => (dispatch: AppDispatch) => {
    realm.write(() => {
        const todo = realm.objectForPrimaryKey("Todo", id);
        if (todo) {
            realm.delete(todo);
            dispatch(deleteTodo(id));
        }
    });
}

const updateTodoInRealm = (todo: Todo) => (dispatch: AppDispatch) => {
    realm.write(() => {
        realm.create("Todo", todo, UpdateMode.Modified);
        dispatch(updateTodo(todo));
    });
}

const loadTodosFromRealm = () => async (dispatch: AppDispatch) => {
    console.log("loadTodosFromRealm");
    try {
        const todos = realm.objects<Todo>("Todo");
        todos.forEach((value, index, array) => {
            console.log("loadTodosFromRealm: ", value);
        })
        dispatch(setTodos(todos as unknown as Todo[]));
    } catch (error) {
        console.log("Error on fetching todos: ", error);
        return "";
    }
};

export {saveTodoToRealm, removeTodoFromRealm, updateTodoInRealm, loadTodosFromRealm};

// export const loadTodos = () => async (dispatch: AppDispatch) => {
//     console.log("loadTodos");
//     createTodo("Todo 1");
//     const realm = useRealm();
//     const todos = realm.objects<Todo>('Todo');
//     console.log("loadTodos222");
// };
//
// // Thunk for creating a new todo
// export const createTodo = (title: string) => async (dispatch: AppDispatch) => {
//     console.log("createTodo");
//     const realm = useRealm();
//     realm.write(() => {
//         const newTodo = {
//             _id: getRandomInt(3),
//             title
//         } as Todo;
//         realm.create('Todo', newTodo);
//         dispatch(addTodo(newTodo));
//     });
//
//     console.log("todo created successfully!");
// };
//
// // Thunk for deleting a todo
// export const removeTodo = (id: number) => async (dispatch: AppDispatch) => {
//     const realm = useRealm();
//     realm.write(() => {
//         const todoToDelete = realm.objectForPrimaryKey('Todo', id);
//         if (todoToDelete) {
//             realm.delete(todoToDelete);
//             dispatch(deleteTodo(id));
//         }
//     });
//
//     console.log("todo deleted successfully!");
// };
//
// // Thunk for updating a todo
// export const editTodo = (id: number, title: string) => async (dispatch: AppDispatch) => {
//     const realm = useRealm();
//     realm.write(() => {
//         const todoToUpdate = realm.objectForPrimaryKey<Todo>('Todo', id);
//         if (todoToUpdate) {
//             todoToUpdate.title = title;
//             dispatch(updateTodo(todoToUpdate));
//         }
//     });
//
//     console.log("todo updated successfully!");
// };
