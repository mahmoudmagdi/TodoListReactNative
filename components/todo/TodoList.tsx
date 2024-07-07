import React from "react";
import {FlatList} from "react-native";
import {useSelector} from "react-redux";
import Todo from "../../model/todo.ts";
import TodoItem from "./TodoItem.tsx";
import {RootState} from "../../store/redux/store.ts";

function TodoList(): React.JSX.Element {

    const todos = useSelector((state: RootState) => state.todos.todos);

    function renderTodoItem({item}: { item: Todo }) {
        return (
            <TodoItem todo={item}/>
        );
    }

    return (
        <FlatList
            data={todos}
            keyExtractor={(item: Todo) => item.id}
            renderItem={renderTodoItem}
        />
    )
}

export default TodoList;
