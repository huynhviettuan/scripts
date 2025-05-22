import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/.',
    timeout: 360000,
    expect: {
        timeout: 15000
    },
    use: {
        actionTimeout: 20000,
        headless: !!process.env.CI,
        baseURL: 'https://dev.everfit.io/',
        launchOptions: {
            args: ['--start-maximized']
        },
        testIdAttribute: 'data-testid',
        screenshot: 'only-on-failure',
        ignoreHTTPSErrors: true,
        httpCredentials: {
            username: 'guest',
            password: 'guest@QHQJT8z1W7'
        }
    },
    reporter: 'line',
    retries: process.env.CI ? 1 : 0,
    workers: 1,
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    projects: [
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] }
        },

        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] }
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] }
        },
        {
            name: 'Microsoft Edge',
            use: { ...devices['Desktop Edge'], channel: 'msedge' }
        },
        {
            name: 'chrome',
            use: { channel: 'chrome', viewport: process.env.CI ? { height: 1080, width: 1920 } : null }
        }
    ]
});
