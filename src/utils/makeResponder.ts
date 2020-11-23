import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { Response } from 'express';

/**
 * Makes a responder function.
 */
export function makeResponder (res: Response) {
    const twiml = new MessagingResponse();

    /**
     * Responds to the incoming message with the specified response.
     */
    return (msg: string) => {
        twiml.message(msg);

        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    };
}