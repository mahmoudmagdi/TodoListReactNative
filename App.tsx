import React from 'react';
import {
    SafeAreaView,
    useColorScheme,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import MainComponent from "./components/MainComponent";
import {GlobalColors} from "./constants/colors";

function App(): React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';
    const keyboardBehavior = Platform.OS === "ios" ? "padding" : "height";

    return (
        <SafeAreaView style={styles(isDarkMode).container}>
            <KeyboardAvoidingView
                behavior={keyboardBehavior}
                style={styles(isDarkMode).innerContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <MainComponent/>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default App;

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? GlobalColors.dark.headerBackground : GlobalColors.light.headerBackground,
    },
    innerContainer: {
        height: "100%"
    }
});
