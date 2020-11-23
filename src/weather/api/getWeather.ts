import axios from 'axios';

import { config } from '../../config/appConfig';
import { parseWeatherDto } from './parseWeatherDto';

/**
 * Represents a response DTO shape from the Weather API.
 */
export interface IWeatherResponseDTO {
    weather: Array<{
        main: string,
        description: string
    }>,
    main: {
        temp: number,
        feels_like: number,
        pressure: number,
        humidity: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
    }
}

/**
 * Represents the two queryable location types.
 */
export enum LocationType {
    ZIP,
    CITY
}

/**
 * Constructs an API URL based on a specified target location and type.
 * 
 * @param location 
 * The target location to construct the URL against.
 * 
 * @param locationType 
 * The target location type to construct the URL against.
 */
function makeUrl(location: string, locationType: LocationType) {
    const BASE_URL = config.weather.api.baseUrl;
    const APP_ID = config.weather.api.appId;

    const partialUri = locationType === LocationType.ZIP
        ? `${BASE_URL}?zip=${location}`
        : `${BASE_URL}?q=${location}`
        
    // Full URL with query location and app ID.
    return `${partialUri}&appId=${APP_ID}`;
}

/**
 * Makes an API call to retrieve current weather information for a specified location.
 * 
 * @param target 
 * Target location to retrieve weather for.
 * 
 * @param type 
 * Target location type to retrieve weather for.
 */
async function queryApi(target: string, type: LocationType) {
    const response = await axios.get<IWeatherResponseDTO>(makeUrl(target, type)); 
    return response.data as IWeatherResponseDTO;
}

/**
 * Retrieves current weather information for a specified location.
 * 
 * @param target 
 * Target location to retrieve weather for.
 * 
 * @param type 
 * Target location type to retrieve weather for.
 */
export async function getWeather(target: string, type: LocationType) {
    const dto = await queryApi(target, type);
    return parseWeatherDto(dto);
}