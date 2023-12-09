/** Class imports */
const axios = require('axios');

/** Module imports */
const ErrorLogger = require('./ErrorLogger')


/**
 * Wrapper Class
 * 
 * This class wraps around the AIBG api provided to us
 */
module.exports = class APIWrapper {

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

            // console.log(response)

            return response.data;

        } catch(err) {
            console.log(err)
        }
    };
}