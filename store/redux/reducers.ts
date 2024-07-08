import {createReducer} from "@reduxjs/toolkit";
import Todo from "../../model/todo";
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
                console.log("addTodo");
                state.todos.push(action.payload);
            })
            .addCase(deleteTodo, (state, action) => {
                console.log("deleteTodo");
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            })
            .addCase(updateTodo, (state, action) => {
                console.log("updateTodo");
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(setTodos, (state, action) => {
                console.log("setTodos");
                state.todos = action.payload;
            });
    });

export default todoReducers;
