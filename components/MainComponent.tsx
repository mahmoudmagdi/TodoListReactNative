import React from "react";
import {View, StyleSheet, useColorScheme} from "react-native";

import TodoForm from "./todo/TodoForm";
import TodoList from "./todo/TodoList";
import {GlobalColors} from "../constants/colors";
import CustomHeader from "./UI/CustomHeader";

function MainComponent(): React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={styles(isDarkMode).container}>
            <CustomHeader/>
            <TodoList/>
            <TodoForm/>
        </View>
    )
}

export default MainComponent;

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? GlobalColors.dark.mainBackground : GlobalColors.light.mainBackground,
    }
});
