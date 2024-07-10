import React, {useEffect} from "react";
import {FlatList, View, Text, StyleSheet, useColorScheme} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "../../store/redux/store";

import TodoItem from "./TodoItem";
import {GlobalColors} from "../../constants/colors";
import Todo from "../../model/todo";
import {loadTodosFromRealm} from "../../store/realm/todo-database";
import realm from "../../store/realm/realmConfig";

function TodoList(): React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        const todos = realm.objects<Todo>('Todo');
        console.log(todos); // Should output the list of todos
    }, [dispatch]);

    function renderTodoItem({item}: { item: Todo }) {
        return (
            <TodoItem todo={item}/>
        );
    }

    // if (todos.length === 0) {
    //     return (
    //         <View style={styles(isDarkMode).emptyContainer}>
    //             <Text style={styles(isDarkMode).emptyText}>No todos found</Text>
    //         </View>
    //     )
    // }

    return (
        <FlatList
            data={todos}
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
