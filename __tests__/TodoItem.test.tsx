import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {deleteTodo, updateTodo} from "../store/redux/actions";
import configureStore, {MockStoreEnhanced} from "redux-mock-store";
import TodoItem from "../components/todo/TodoItem";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../store/redux/actions', () => ({
    deleteTodo: jest.fn(),
    updateTodo: jest.fn(),
}));

describe('TodoItem', () => {
    let store: MockStoreEnhanced<unknown>;

    beforeEach(() => {
        store = mockStore({
            todos: [{id: "1", title: 'Sample Todo'}],
        });
        store.dispatch = jest.fn();
    });

    it('renders correctly', () => {
        const {getByText} = render(
            <Provider store={store}>
                <TodoItem todo={{id: "1", title: 'Sample Todo'}}/>
            </Provider>
        );

        expect(getByText('Sample Todo')).toBeTruthy();
    });

    it('calls updateTodo action when edit button is pressed', () => {
        const {getByText, getByPlaceholderText} = render(
            <Provider store={store}>
                <TodoItem todo={{id: "1", title: 'Sample Todo'}}/>
            </Provider>
        );

        fireEvent.press(getByText('Edit'));
        fireEvent.changeText(getByPlaceholderText('Todo title'), 'Updated Todo');
        fireEvent.press(getByText('Update todo'));
        expect(store.dispatch).toHaveBeenCalledWith(updateTodo({id: "1", title: 'Updated Todo'}));
    });

    it('calls deleteTodo action when delete button is pressed', () => {
        const {getByText} = render(
            <Provider store={store}>
                <TodoItem todo={{id: "1", title: 'Sample Todo'}}/>
            </Provider>
        );

        fireEvent.press(getByText('Delete'));
        expect(store.dispatch).toHaveBeenCalledWith(deleteTodo('1'));
    });
});
