/** Class imports */
const axios = require('axios');

/** Module imports */
// const ErrorLogger = require('../ErrorLogger')


/**
 * Conncetor Class
 * 
 * This class wraps around the AIBG api provided to us
 * 
 * Available methods:
 * @method login
 * 
 * TODO - implement other methods for the class, take a look at the google docs
 * 
 */
module.exports = class Connector {

    /**
     * Class properties
     */
    _apiUrl;


    /**
     * Constructor
     * 
     */
    constructor(_apiUrl) {
        this._apiUrl = _apiUrl;
    };


    /**
     * Logins and returns the bearer token
     * 
     * @param {string} username - predefined in the env 
     * @param {string} password - predefined in the env
     * @returns 
     */
    async login(username, password) {
        console.log("Logging in with the credentials: ", username, password);
        try {
            const response = await axios.post(`${this._apiUrl}/user/login`, {
                username: username,
                password: password
            });

            return response.data;

        } catch(err) {
            console.log(err)
        }
    };





}