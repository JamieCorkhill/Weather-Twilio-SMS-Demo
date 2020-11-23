// Temperature
export const celsiusToFahrenheit = (value: number) => ((value * (9/5)) + 32);
export const kelvinToCelsius = (value: number) => (value - 273.15);

// Speed
export const metersPerSecondToMilesPerHour = (value: number) => (value * 2.237);