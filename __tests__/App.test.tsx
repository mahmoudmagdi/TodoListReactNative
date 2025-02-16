/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';
import {Provider} from 'react-redux';
// Note: test renderer must be required after react-native.
import store from '../store/redux/store';
import {render} from "@testing-library/react-native";

const ProviderApp = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
};

it('renders correctly', () => {
    render(<ProviderApp/>);
});

