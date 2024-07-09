import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import TodoForm from "../components/todo/TodoForm";
import {addTodo} from "../store/redux/actions";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../store/redux/actions', () => ({
    addTodo: jest.fn(),
}));

describe('TodoForm', () => {
    let store: MockStoreEnhanced<unknown>;

    beforeEach(() => {
        store = mockStore({
            todos: [],
        });
        store.dispatch = jest.fn();
    });

    it('renders correctly', () => {
        const {getByPlaceholderText, getByText} = render(
            <Provider store={store}>
                <TodoForm/>
            </Provider>
        );

        expect(getByPlaceholderText('Todo title')).toBeTruthy();
        expect(getByText('Add todo')).toBeTruthy();
    });

    it('updates input value when text is entered', () => {
        const {getByPlaceholderText} = render(
            <Provider store={store}>
                <TodoForm/>
            </Provider>
        );

        const input = getByPlaceholderText('Todo title');
        fireEvent.changeText(input, 'New Todo');
        expect(input.props.value).toBe('New Todo');
    });

    it('calls addTodo action when form is submitted with valid input', () => {
        const {getByPlaceholderText, getByText} = render(
            <Provider store={store}>
                <TodoForm/>
            </Provider>
        );
        const input = getByPlaceholderText('Todo title');
        fireEvent.changeText(input, 'New Todo');
        fireEvent.press(getByText('Add todo'));

        expect(store.dispatch).toHaveBeenCalledWith(addTodo({id: "1", title: 'New Todo'}));
    });

    it('clears input field after form submission', () => {
        const {getByPlaceholderText, getByText} = render(
            <Provider store={store}>
                <TodoForm/>
            </Provider>
        );

        const input = getByPlaceholderText('Todo title');
        fireEvent.changeText(input, 'New Todo');
        fireEvent.press(getByText('Add todo'));

        const updatedInput = getByPlaceholderText('Todo title');
        expect(updatedInput.props.value).toBe('');
    });
});
