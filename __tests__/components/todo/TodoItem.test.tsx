import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore, {MockStoreEnhanced} from "redux-mock-store";
import TodoItem from "../../../components/todo/TodoItem";
import thunk from "redux-thunk";
import {Todo} from "../../../model/todo";
import {removeTodoFromRealm} from "../../../store/realm/todo-database";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../store/realm/todo-database', () => ({
    removeTodoFromRealm: jest.fn(),
}));

describe('TodoItem', () => {
    let store: MockStoreEnhanced<unknown>;
    let sampleTodoId = 1;
    let sampleTodo = {_id: sampleTodoId, title: 'Sample Todo'} as Todo;

    beforeEach(() => {
        store = mockStore({
            todos: [{id: "1", title: 'Sample Todo'}],
        });
        store.dispatch = jest.fn();
    });

    it('renders correctly', () => {
        const {getByText} = render(
            <Provider store={store}>
                <TodoItem todo={sampleTodo}/>
            </Provider>
        );

        expect(getByText('Sample Todo')).toBeTruthy();
    });

    it('calls deleteTodo action when delete button is pressed', () => {
        const {getByText} = render(
            <Provider store={store}>
                <TodoItem todo={sampleTodo}/>
            </Provider>
        );

        fireEvent.press(getByText('Delete'));
        expect(removeTodoFromRealm).toHaveBeenCalledWith(sampleTodoId);
    });
});
