module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?@react-native|react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
    ],
    setupFiles: ['<rootDir>/setup-jest.js'],
};
