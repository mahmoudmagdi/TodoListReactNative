import {UpdateMode} from "realm";

import {Todo, TODOS_SCHEMA} from "../../model/todo";
import {Dispatch} from "@reduxjs/toolkit";
import {addTodo, deleteTodo, setTodos, updateTodo} from "../redux/actions";

import realm from "./realmConfig";

export const getTodoFromRealm = () => (dispatch: Dispatch) => {
    const todos = realm.objects<Todo>(TODOS_SCHEMA);
    dispatch(setTodos(todos.map((todo) => todo)));
};

export const saveTodoToRealm = (todo: Todo) => (dispatch: Dispatch) => {
    realm.write(() => {
        realm.create(TODOS_SCHEMA, todo);
        dispatch(addTodo(todo));
    });
};

export const removeTodoFromRealm = (todoId: number) => (dispatch: Dispatch) => {
    realm.write(() => {
        let todo = realm.objectForPrimaryKey(TODOS_SCHEMA, todoId);
        dispatch(deleteTodo(todoId));
        realm.delete(todo);
    });
};

export const updateTodoInRealm = (todo: Todo) => (dispatch: Dispatch) => {
    realm.write(() => {
        realm.create(TODOS_SCHEMA, todo, UpdateMode.Modified);
        dispatch(updateTodo(todo));
    });
};
