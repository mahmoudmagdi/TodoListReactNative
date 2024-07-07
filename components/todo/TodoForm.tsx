import React from "react";
import Todo from "../../model/todo.ts";
import {useDispatch} from "react-redux";
import {Alert, Button, Pressable, TextInput, View} from "react-native";
import {addTodo, updateTodo} from "../../store/redux/actions.ts";

type TodoFormProps = {
    todo?: Todo,
    setIsEditing?: (isEditing: boolean) => void
}

function TodoForm({todo, setIsEditing}: TodoFormProps): React.JSX.Element {

    const [title, setTitle] = React.useState(todo?.title ?? "");
    const dispatch = useDispatch();

    function handleSubmit() {
        console.log("handleSubmit");
        if (todo) {
            dispatch(updateTodo({...todo, title}));
            if (setIsEditing) setIsEditing(false);
        } else {
            if (title.trim().length === 0) {
                Alert.alert("Please enter a valid title");
                return;
            }

            dispatch(addTodo({
                id: Math.random().toString(),
                title
            } as Todo));
            setTitle("");
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={title} onChangeText={setTitle}/>
            <Pressable>
                <Button title={(todo != null) ? "Update todo" : "Add todo"} onPress={handleSubmit}/>
            </Pressable>
        </View>
    )
}

export default TodoForm;

const styles = {
    container: {
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
        marginBottom: 10
    }
};
