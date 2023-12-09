
/**
 * The Errors class used in the InfluxDB Manager module
 * 
 * Available methods:
 * @method throwMethodNotImplemented
 * @method throwMethodNotReachable
 * 
 * TODO: add locations for the errors to throw. It would be a smart idea to know where it popped.
 */
module.exports = class Errors {

    /**
     * Constructor
     */
    constructor() {};


    /**
     * @param methodName - the name of the method that was not implemented
     */
    static throwMethodNotImplemented(methodName) {
        throw new Error(`Error calling the method ${methodName}: Method not implemented`);
    };

    /**
     * @param methodName - the name of the method that was not reachable
     */
    static throwNotReachable(methodName) {
        throw new Error(`Error calling the method ${methodName}: Method not reachable`);
    };

    /**
     * @param methodName - the name of the method that failed
     * @param message - the message to throw
     * 
     */
    static throwMethodFailed(methodName) {
        throw new Error(`Error calling the method ${methodName}: Method failed`);
    };

    /** 
     * @param message - the message to throw 
     */
    static throwError(message) {
        if (message === undefined) {
            message = "An error occured";
        };
        throw new Error(message);
    };

};