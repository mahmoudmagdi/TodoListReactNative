import React from "react";
import {FlatList, View, Text, StyleSheet, useColorScheme} from "react-native";
import {useSelector} from "react-redux";

import Todo from "../../model/todo";
import TodoItem from "./TodoItem";
import {RootState} from "../../store/redux/store";

function TodoList(): React.JSX.Element {

    const todos: Todo[] = useSelector((state: RootState) => state.todos.todos);
    const isDarkMode = useColorScheme() === 'dark';

    function renderTodoItem({item}: { item: Todo }) {
        return (
            <TodoItem todo={item}/>
        );
    }

    if (todos.length === 0) {
        return (
            <View style={styles(isDarkMode).emptyContainer}>
                <Text style={styles(isDarkMode).emptyText}>No todos found</Text>
            </View>
        )
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

const styles = (isDarkMode: boolean) => StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyText: {
        fontSize: 20,
        color: isDarkMode ? "white" : "black"
    }
});
