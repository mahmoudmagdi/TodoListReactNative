import {createSlice} from '@reduxjs/toolkit';
import Todo from '../../model/todo';

const todosSlice = createSlice({
    name: 'todos',
    initialState: [] as Todo[],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        removeTodo: (state, action) => {
            return state.filter((todo: Todo) => todo.id !== action.payload.id);
        },
        updateTodo: (state, action) => {
            return state.map((todo: Todo) =>
                todo.id === action.payload.id ? action.payload : todo,
            );
        },
        setTodos: (state, action) => {
            return action.payload;
        },
    },
});

export const {
    addTodo,
    removeTodo,
    updateTodo,
    setTodos
} = todosSlice.actions;
export default todosSlice.reducer;
