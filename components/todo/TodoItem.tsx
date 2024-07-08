import React from "react";
import {Button, View, Text, StyleSheet, useColorScheme} from "react-native";
import {useDispatch} from "react-redux";

import {deleteTodo} from "../../store/redux/actions";
import {GlobalColors} from "../../constants/colors";
import Todo from "../../model/todo";

import TodoForm from "./TodoForm";
import VerticalLine from "../UI/VerticalLine";

function TodoItem({todo}: { todo: Todo }): React.JSX.Element {

    const [isEditing, setIsEditing] = React.useState(false);
    const dispatch = useDispatch();
    const isDarkMode = useColorScheme() === 'dark';

    function editPressHandler() {
        setIsEditing(true);
    }

    function deletePressHandler() {
        dispatch(deleteTodo(todo.id));
    }

    return (
        <View style={styles(isDarkMode).container}>
            {
                isEditing ? (
                    <TodoForm todo={todo} setIsEditing={setIsEditing}/>
                ) : (
                    <View>
                        <Text style={styles(isDarkMode).text}>
                            {todo.title}
                        </Text>
                        <View style={styles(isDarkMode).buttonContainer}>
                            <Button title="Edit" onPress={editPressHandler}/>
                            <VerticalLine style={styles(isDarkMode).verticalLine}/>
                            <Button title="Delete" onPress={deletePressHandler}/>
                        </View>
                    </View>
                )
            }
        </View>
    )
}

export default TodoItem;

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        marginHorizontal: 10,
        padding: 4,
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? GlobalColors.dark.border : GlobalColors.light.border
    },
    text: {
        fontSize: 18,
        color: isDarkMode ? GlobalColors.dark.text : GlobalColors.light.text
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    verticalLine: {
        height: 20
    }
})
