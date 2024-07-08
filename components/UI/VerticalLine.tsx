import React from "react";
import {View, StyleSheet, useColorScheme} from "react-native";
import {GlobalColors} from "../../constants/colors.ts";

type VerticalLineProps = {
    style?: any
}

function VerticalLine({style}: VerticalLineProps): React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={[styles(isDarkMode).verticalLine, style]}/>
    )
}

export default VerticalLine;

const styles = (isDarkMode: boolean) => StyleSheet.create({
    verticalLine: {
        height: "100%",
        width: 1,
        backgroundColor: isDarkMode ? GlobalColors.dark.border : GlobalColors.light.border
    }
});
