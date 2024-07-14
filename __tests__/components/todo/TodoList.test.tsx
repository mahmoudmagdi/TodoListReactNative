import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore, {MockStoreEnhanced} from "redux-mock-store";
import TodoList from "../../../components/todo/TodoList";
import thunk from "redux-thunk";
import {RootState} from "../../../store/redux/store";
import {Todo} from "../../../model/todo";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('TodoList', () => {
    let store: MockStoreEnhanced<unknown>;

    beforeEach(() => {
        const initialTodos: { todos: Todo[] } = {
            todos: [
                {_id: 1, title: 'Sample Todo 1'} as Todo,
                {_id: 2, title: 'Sample Todo 2'} as Todo,
            ],
        }

        const initialState: RootState = {
            todos: initialTodos.todos,
        };

        store = mockStore(initialState);
        store.dispatch = jest.fn();
    });

    it('renders correctly', () => {
        const {getByText} = render(
            <Provider store={store}>
                <TodoList/>
            </Provider>
        );

        expect(getByText('Sample Todo 1')).toBeTruthy();
        expect(getByText('Sample Todo 2')).toBeTruthy();
    });
});
