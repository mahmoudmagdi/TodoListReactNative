import {configureStore} from "@reduxjs/toolkit";
import todoReducers from "./reducers";

const store = configureStore({
    reducer: {
        todos: todoReducers,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
