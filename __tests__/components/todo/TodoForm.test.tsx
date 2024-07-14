import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import TodoForm from "../../../components/todo/TodoForm";
import thunk from "redux-thunk";
import {Todo} from "../../../model/todo";
import {Alert} from "react-native";
import {saveTodoToRealm, updateTodoInRealm} from "../../../store/realm/todo-database";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn()
}));

jest.mock('../../../store/realm/todo-database', () => ({
    saveTodoToRealm: jest.fn(),
    updateTodoInRealm: jest.fn()
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

    it('calls updateTodoInRealm action when form is submitted with valid input and todo prop is present', () => {
        const {getByPlaceholderText, getByText} = render(
            <Provider store={store}>
                <TodoForm todo={{_id: 1, title: 'Existing Todo'} as Todo}/>
            </Provider>
        );
        const input = getByPlaceholderText('Todo title');
        fireEvent.changeText(input, 'Updated Todo');
        fireEvent.press(getByText('Update todo'));

        expect(updateTodoInRealm).toHaveBeenCalledWith({_id: 1, title: 'Updated Todo'});
    });

    it('calls saveTodoToRealm action when form is submitted with valid input', () => {
        const {getByPlaceholderText, getByText} = render(
            <Provider store={store}>
                <TodoForm/>
            </Provider>
        );
        const input = getByPlaceholderText('Todo title');
        fireEvent.changeText(input, 'New Todo');
        fireEvent.press(getByText('Add todo'));

        expect(saveTodoToRealm).toHaveBeenCalledWith({_id: expect.any(Number), title: 'New Todo'});
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

    it('should show an alert if the title is invalid', () => {
        const {getByText} = render(
            <Provider store={store}>
                <TodoForm/>
            </Provider>
        );
        const button = getByText('Add todo');

        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith('Please enter a valid title');
    });
});
