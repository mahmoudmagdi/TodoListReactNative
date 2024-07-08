import React from "react";
import {Alert, Button, Pressable, TextInput, useColorScheme, View, StyleSheet} from "react-native";
import {useDispatch} from "react-redux";

import {addTodo, updateTodo} from "../../store/redux/actions";
import {GlobalColors} from "../../constants/colors";
import Todo from "../../model/todo";

type TodoFormProps = {
    todo?: Todo,
    setIsEditing?: (isEditing: boolean) => void
}

function TodoForm({todo, setIsEditing}: TodoFormProps): React.JSX.Element {

    const [title, setTitle] = React.useState(todo?.title ?? "");
    const dispatch = useDispatch();
    const isDarkMode = useColorScheme() === 'dark';

    function isTitleValid(): boolean {
        return title.trim().length !== 0
    }

    function handleSubmit() {
        if (isTitleValid()) {
            if (todo) {
                dispatch(updateTodo({...todo, title}));
                if (setIsEditing) setIsEditing(false);
            } else {
                dispatch(addTodo({
                    id: Math.random().toString(),
                    title
                } as Todo));
                setTitle("");
            }
        } else {
            Alert.alert("Please enter a valid title");
        }
    }

    return (
        <View style={styles(isDarkMode).container}>
            <TextInput
                style={styles(isDarkMode).input}
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={isDarkMode ? GlobalColors.dark.hint : GlobalColors.light.hint}
                placeholder="Todo title"/>
            <Pressable>
                <Button title={(todo != null) ? "Update todo" : "Add todo"} onPress={handleSubmit}/>
            </Pressable>
        </View>
    )
}

export default TodoForm;

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        backgroundColor: isDarkMode ? GlobalColors.dark.footerBackground : GlobalColors.light.footerBackground,
        paddingVertical: 10,
        borderRadius: 10
    },
    input: {
        height: 40,
        borderColor: isDarkMode ? GlobalColors.dark.border : GlobalColors.light.border,
        borderWidth: 1,
        padding: 8,
        borderRadius: 10,
        marginVertical: 10,
        color: isDarkMode ? GlobalColors.dark.text : GlobalColors.light.text,
        marginHorizontal: 10
    }
});
