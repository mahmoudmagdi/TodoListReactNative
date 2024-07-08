import React from "react";
import {View, Text, StyleSheet, useColorScheme} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {GlobalColors} from "../../constants/colors.ts";


function CustomHeader(): React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={styles(isDarkMode).container}>
            <Text style={styles(isDarkMode).title}>
                Todo List Application
            </Text>
        </View>
    )
}

export default CustomHeader;

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: isDarkMode ? GlobalColors.dark.headerBackground : GlobalColors.light.headerBackground,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15
    },
    title: {
        color: isDarkMode ? GlobalColors.dark.text : GlobalColors.light.text,
        fontSize: 20,
        fontWeight: "bold"
    }
});
