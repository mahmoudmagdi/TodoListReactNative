import {configureStore, Tuple} from "@reduxjs/toolkit";
import todoReducers from "./reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

const store = configureStore({
    reducer: todoReducers,
    middleware: () => new Tuple<any>(thunk, logger),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
