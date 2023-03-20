const config = {
    preset: 'jest-playwright-preset',
    testTimeout: 60000,
    testEnvironmentOptions: {
        'jest-playwright': {
            launchOptions: {
                headless: false,
                // logger: {
                //     isEnabled: (name, severity) => name === 'browser',
                //     log: (name, severity, message, args) => console.log(`${name} ${message}`)
                // }
            }
        },
    },
};

module.exports = config;