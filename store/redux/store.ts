import {configureStore} from "@reduxjs/toolkit";
import todoReducers from "./reducers.ts";

const store = configureStore({
    reducer: {
        todos: todoReducers,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
