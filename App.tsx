/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from "react-redux";
import store from "./store/redux/store.ts";
import MainComponent from "./components/MainComponent.tsx";

function App(): React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <Provider store={store}>
            {/*<SafeAreaView style={backgroundStyle}>*/}
                <MainComponent/>
            {/*</SafeAreaView>*/}
        </Provider>
    )
}

export default App;
