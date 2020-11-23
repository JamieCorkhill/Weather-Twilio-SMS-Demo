import { Immutable } from '../../utils/types';
import { IWeatherResponseDTO } from './getWeather';
import { 
    celsiusToFahrenheit, 
    kelvinToCelsius,
    metersPerSecondToMilesPerHour 
} from '../../utils/conversions';

/**
 * Parses a Weather API Response DTO into a readable string.
 * 
 * @param response 
 * The Weather API Response DTO
 */
export function parseWeatherDto(response: Immutable<IWeatherResponseDTO>) {
    // Current temperature in both units.
    const tempC = kelvinToCelsius(response.main.temp);
    const tempF = celsiusToFahrenheit(tempC);

    // Feels like temperature in both units.
    const feelsLikeC = kelvinToCelsius(response.main.feels_like);
    const feelsLikeF = celsiusToFahrenheit(feelsLikeC);

    // Reduce conditions array to one string.
    const addListSuffix = (idx: number) => `${((idx + 1) !== response.weather.length) ? ', ' : ''}`;
    const conditions = response.weather.reduce(
        (a, c, i) => a + `${c.main} (${c.description})${addListSuffix(i)}`, ''
    );

    // Wind speed in MPH
    const windSpeedMPS = response.wind.speed;
    const windSpeedMPH = metersPerSecondToMilesPerHour(windSpeedMPS);

    const lines = [
        `Conditions: ${conditions}`,
        `Temperature: C: ${tempC.toFixed(2)}, F: ${tempF.toFixed(2)}`,
        `Feels Like: C: ${feelsLikeC.toFixed(2)}, F: ${feelsLikeF.toFixed(2)}`,
        `Pressure: ${response.main.pressure} hPa`,
        `Humidity: ${response.main.humidity}%`,
        `Visibility: ${response.visibility}`,
        `Wind: ${windSpeedMPH.toFixed(2)} mi/hr at ${response.wind.deg} degrees`
    ];

    // Each on a new line.
    return lines.join('\n');
}