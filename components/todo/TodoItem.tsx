import React from "react";
import {Button, View, Text, StyleSheet} from "react-native";
import {useDispatch} from "react-redux";
import Todo from "../../model/todo.ts";
import TodoForm from "./TodoForm.tsx";
import {deleteTodo} from "../../store/redux/actions.ts";

function TodoItem({todo}: { todo: Todo }): React.JSX.Element {

    const [isEditing, setIsEditing] = React.useState(false);
    const dispatch = useDispatch();

    function editPressHandler() {
        setIsEditing(true);
    }

    function deletePressHandler() {
        dispatch(deleteTodo(todo.id));
    }

    return (
        <View style={styles.container}>
            {
                isEditing ? (
                    <TodoForm todo={todo} setIsEditing={setIsEditing}/>
                ) : (
                    <>
                        <Text style={styles.text}>
                            {todo.title}
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Edit" onPress={editPressHandler}/>
                            <Button title="Delete" onPress={deletePressHandler}/>
                        </View>
                    </>
                )
            }
        </View>
    )
}

export default TodoItem;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey"
    },
    text: {
        fontSize: 18,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    }
})
