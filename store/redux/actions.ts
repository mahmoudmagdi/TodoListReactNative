import {createAction} from "@reduxjs/toolkit";
import Todo from "../../model/todo";

export const addTodo = createAction<Todo>("ADD_TODO");
export const deleteTodo = createAction<string>("DELETE_TODO");
export const updateTodo = createAction<Todo>("UPDATE_TODO");
