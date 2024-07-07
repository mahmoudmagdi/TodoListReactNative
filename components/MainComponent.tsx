import React from "react";
import {View, StyleSheet} from "react-native";

import TodoForm from "./todo/TodoForm.tsx";
import TodoList from "./todo/TodoList.tsx";

function MainComponent(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <TodoForm/>
            <TodoList/>
        </View>
    )
}

export default MainComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 50
    }
});
