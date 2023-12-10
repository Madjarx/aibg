/** Module imports */
require('dotenv').config();
const axios = require('axios');

/** Class imports */
const Errors = require('../Loggers/Errors');

/** Auth Bearer token used for api call auth */
// const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlByb3Rva29saU1BVEZtdWRyYWNhMSIsInBhc3N3b3JkIjoicVFaeWdHRkdkVyJ9.CiWg9nyohyMje1lab1NYjmt9v7lOKUaQ9h4Mx4LsQ55oxpAbntunUJiuj_HP_nbiNHo6XVp3pDaCZWY5HelaIQ'
const token1 = process.env.BOT1_TOKEN;
const token2 = process.env.BOT2_TOKEN;
const token3 = process.env.BOT2_TOKEN;
const token4 = process.env.BOT2_TOKEN;


/**
 * Conncetor Class
 * 
 * This class wraps around the AIBG api provided to us
 * 
 * Available methods:
 * 
 *  Misc methods
 * @method login
 * @method watchGame
 * 
 *  Production methods
 * @method createGame
 * @method joinGame
 * @method doAction
 * 
 *  Training methods - wont be used due to server failure
 * @method train
 * @method doActionTrain
 * 
 * TODO - implement other methods for the class, take a look at the google docs
 * TODO = implement token as a class property
 */
module.exports = class Connector {

    /**
     * Class properties
     */
    _apiUrl;
    _username;
    _password;
    _tokens = [];

    /**
     * Constructor
     * 
     */
    constructor(_apiUrl, username, password) {
        this._apiUrl = _apiUrl;
        this._username = username;
        this._password = password;
    };


    // #region Misc methods - methods used regardless
    /**
     * @method login
     * @method watchGame
     */

    /**
     * Logins and returns the bearer token
     * 
     * @param {string} username - predefined in the env 
     * @param {string} password - predefined in the env
     * @returns 
     */
    async login(
        username = this._username,
        password = this._password
    ) {
        console.log("Attempting a login to " + this._apiUrl + "/user/login");
        try {
            const response = await axios.post(`${this._apiUrl}/user/login`, {
                username: username,
                password: password
            });

            if (response.data.token) {
                console.log("Login successful");
            };

            return response.data.token;

        } catch(err) {
            console.log(err);
            Errors.throwMethodFailed('Login')
        }
    };

    /**
     * Called to get all 4 bot tokens for training purposes. Uses the login method
     * of the Connector class under the hood
     */
    async getBotTokens() {
        for (let i = 1; i <= 4; i++) {
            let botSpecificUsername = `${this._username}${i}`;
            this._tokens.push(await this.login(botSpecificUsername, this._password));
        }
        console.log(this._tokens);
    };
    // #endregion


    // #region Production methods - methods used in competition itself
    /**
     * @method createGame
     * @method doAction
     * @method joinGame
     * @method joinGameWithAllPlayers
     */
    /**
     * Joins the game with the given bearer token
     */
    async joinGame(bearerToken) {
        try {
            console.log("Attempting to join the game with the auth token");
            const response = await axios.get(`${this._apiUrl}/game/joinGame`, {
                headers: {
                    'Authorization' : `Bearer ${bearerToken}`
                },
                timeout: 100000
            });
            return response.data;
        } catch (error) {
            console.log(error);
            Errors.throwMethodFailed('joinGame')
        };
    };

    /**
     * The right way of joining to the game
     * 
     * @returns {object[]} Joins the bots and returns the proper response in the following format:
     * ```
     * [
     *  {
     *      response_info,
     *      data: {
     *          playerIdx: 1,
     *          gameState: {...}
     *  }
     * ...
     * ]
     * ```
     */
    async togetherJoin() {
        const endpoints = [
            `${this._apiUrl}/game/joinGame`,
            `${this._apiUrl}/game/joinGame`,
            `${this._apiUrl}/game/joinGame`,
            `${this._apiUrl}/game/joinGame`
        ]; 
        const authTokens = [
            this._tokens[0],
            this._tokens[1],
            this._tokens[2],
            this._tokens[3]
        ]; 
        const requests = endpoints.map((endpoint, index) => {
            return axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${authTokens[index]}`
                }
            });
        });
        try {
            const responses = await axios.all(requests);
            return responses; // This is an array
        } catch (error) {
            console.error(error);
        }
    };


    /**
     * Executes an action provided to it
     */
    async doAction(token, action, q, r) {
        const validActions = ['move', 'attack'];

        if (!validActions.includes(action)) {
            throw new Error(`Invalid action: ${action}. Action must be either 'move' or 'attack'.`);
        }

        if (q < -14 || q > 14 || r < -14 || r > 14) {
            throw new Error(`Invalid coordinates: ${q}, ${r}. Both q and r must be between -14 and 14.`);
        }

        try {
            const response = await axios.post(`${this._apiUrl}/game/doAction`, {
                action: `${action},${q},${r}`,
            }, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            Errors.throwMethodFailed('doAction')
        }
    };

    /**
     * Creates the game using the first bot token in the list [0]
     * 
     * Should return the initial state of the game

     */
    async createGame(mapName = "test1.txt") {
        try {
            const response = await axios.post(`${this._apiUrl}/game/createGame`, {
                playerUsernames: [
                                `${this._username}1`,
                                `${this._username}2`,
                                `${this._username}3`,
                                `${this._username}4`,
                ],
                mapName: mapName
            }, {
                headers: {
                    'Authorization' : `Bearer ${this._tokens[0]}`
                },
                timeout: 25000
            });
            console.log("Game created Successfully");
            return response.data;
        } catch(error) {
            console.log(error);
            Errors.throwMethodFailed('createGame')
        }
    };
    // #endregion
};