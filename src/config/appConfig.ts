/**
 * Global application level configuration parameters.
 */
export const config = {
    weather: {
        api: {
            baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
            appId: process.env.WEATHER_API_APP_ID,
        }
    },
    twilio: {
        ACCOUNT_SID: process.env.ACCOUNT_SID,
        AUTH_TOKEN: process.env.AUTH_TOKEN,
        PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER
    }
} as const;

