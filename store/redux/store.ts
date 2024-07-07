import {configureStore} from "@reduxjs/toolkit";
import todos from "./todos";

const store = configureStore({
    reducer: {
        todos: todos,
    }
});

export default store;
