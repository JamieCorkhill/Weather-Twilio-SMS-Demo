import { LocationType } from './../weather/api/getWeather';

/**
 * Ensures the incoming request is valid.
 * 
 * @param body 
 * The body to validation.
 */
export function isValid(body: string): boolean {
    if (!body) 
        return false;
    
    const processed = body.trim().toLowerCase();
    console.log('Processed:', processed)
    const allowedValues = ['city:', 'city: ', 'zip:', 'zip: '];

    let isValid = false;
    allowedValues.forEach(val => processed.includes(val) ? isValid = true : null)

    return isValid;
}


/**
 * Parses a location target and location type out of a valid body.
 * 
 * @param body 
 * The data target to parse.
 */
export function parseLocationAndGetType(body: string): [string, LocationType] {
    if (!isValid(body))
        throw new Error('Body is invalid.');

    const processed = body.trim().toLowerCase().replace(' ', '');

    const locationType = processed.includes('city') 
        ? LocationType.CITY 
        : LocationType.ZIP;
    const location = processed.split(':')[1];

    return [
        location,
        locationType
    ];
}