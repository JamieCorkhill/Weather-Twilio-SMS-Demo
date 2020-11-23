import { Request, Response } from 'express';

import { getWeather } from './api/getWeather';
import { isValid, parseLocationAndGetType } from '../utils/validation';
import { makeResponder } from './../utils/makeResponder';
import { withErrorHandling } from './../utils/withErrorHandling';

export async function getWeatherForSMS(req: Request, res: Response) {   
    // Makes a function for handling responses.
    const respond = makeResponder(res);
    console.log(req.body.Body)
    return withErrorHandling(respond, async () => {
        // Validate the body
        if (!req.body || !isValid(req.body.Body)) {
            return respond('The location was malformed.');
        }

        // Parse the input
        const [location, locationType] = parseLocationAndGetType(req.body.Body);

        // Return the weather
        const weather = await getWeather(location, locationType);
        return respond(weather);
    });
}

