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
import renderer from 'react-test-renderer';
import store from '../store/redux/store';

const ProviderApp = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
};

it('renders correctly', () => {
    renderer.create(<ProviderApp/>);
});

