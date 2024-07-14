import {createAction} from "@reduxjs/toolkit";
import {Todo} from "../../model/todo";

export const addTodo = createAction<Todo>("ADD_TODO");
export const deleteTodo = createAction<number>("DELETE_TODO");
export const updateTodo = createAction<Todo>("UPDATE_TODO");
export const setTodos = createAction<Todo[]>("SET_TODOS");
