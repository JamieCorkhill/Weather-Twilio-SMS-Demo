/**
 * Wraps a likely to fail operation within an error handler.
 * 
 * @param responder 
 * The responder function.
 * 
 * @param f 
 * The likely to fail async operation to perform.
 */
export async function withErrorHandling(
    responder: (msg: string) => any,
    f: () => Promise<void>,
) {
    try {
        return await f();
    } catch (e) {
        return responder('Something went wrong. Please try again later.');
    }
}   