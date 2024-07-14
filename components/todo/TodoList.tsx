import React, {useEffect} from "react";
import {FlatList, View, Text, StyleSheet, useColorScheme} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/redux/store";

import {GlobalColors} from "../../constants/colors";
import {Todo} from "../../model/todo";
import {getTodoFromRealm} from "../../store/realm/todo-database";

import TodoItem from "./TodoItem";

function TodoList(): React.JSX.Element {

    const todos: Todo[] = useSelector((state: RootState) => state.todos);
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodoFromRealm());
    }, [dispatch]);

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
            keyExtractor={(item: Todo) => item._id.toString()}
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
        color: isDarkMode ? GlobalColors.dark.text : GlobalColors.light.text
    }
});
