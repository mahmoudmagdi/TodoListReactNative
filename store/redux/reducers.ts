import {createReducer} from "@reduxjs/toolkit";
import {Todo} from "../../model/todo";
import {addTodo, deleteTodo, setTodos, updateTodo} from "./actions";

interface TodoState {
    todos: Todo[]
}

const initialState: TodoState = {
    todos: []
}

const todoReducers = createReducer(initialState,
    (builder) => {
        builder
            .addCase(addTodo, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(deleteTodo, (state, action) => {
                state.todos = state.todos.filter(todo => todo._id !== action.payload);
            })
            .addCase(updateTodo, (state, action) => {
                const index = state.todos.findIndex(todo => todo._id === action.payload._id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(setTodos, (state, action) => {
                state.todos = action.payload;
            });
    });

export default todoReducers;
