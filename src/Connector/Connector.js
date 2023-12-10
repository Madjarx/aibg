/** Class imports */
const axios = require('axios');

/** Module imports */
const Errors = require('../Loggers/Errors');

/** Auth Bearer token used for api call auth */
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlByb3Rva29saU1BVEZtdWRyYWNhMSIsInBhc3N3b3JkIjoicVFaeWdHRkdkVyJ9.CiWg9nyohyMje1lab1NYjmt9v7lOKUaQ9h4Mx4LsQ55oxpAbntunUJiuj_HP_nbiNHo6XVp3pDaCZWY5HelaIQ'



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
 *  Training methods
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


    /**
     * Constructor
     * 
     */
    constructor(_apiUrl) {
        this._apiUrl = _apiUrl;
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
    async login(username, password) {
        console.log("Attempting a login to " + this._apiUrl + "/user/login");
        console.log("Logging in with the credentials: ", username, password);
        try {
            const response = await axios.post(`${this._apiUrl}/user/login`, {
                username: username,
                password: password
            });

            return response.data;

        } catch(err) {
            console.log(err);
            Errors.throwMethodFailed('Login')
        }
    };


    /**
     * Opens the given game id in the browser
     * 
     * NOT USED
     */
    async watchGame() {
        Errors.throwMethodNotImplemented('watchGame')
    };
    // #endregion

    // #region Production methods - methods used in competition itself
    /**
     * @method joinGame
     * @method doAction
     */
    /**
     * Joins the game with the given game id
     */
    async joinGame() {
        // production
    };

    async doAction() {
        // production
    };
    // #endregion

    // #region Training methods - methods used in training & trial and error
    /**
     * @method train
     * @method doActionTrain
     * @method createGame
     */
    /**
     * Creates the train game with desired parameters
     * 
     * @param {string} mapName = name of the desired map, exmpl. test1.txt
     * @param {number} playerIdx - id of the player position
     * 
     * NOTE = playerIdx is predefined, being [1, 4] (4 predefined positions
     * 
     * @returns generates the game with desired parameters and spawns test bots 
     */
    async train(mapName, playerIdx) {
        try {
            
            const response = await axios.post(`${this._apiUrl}/game/train`, {
                mapName: mapName,
                playerIdx: playerIdx
            }, {
                headers: {
                    'Authentication' : token
                }
            });

            console.log(response.data)
            return null

        } catch (error) {
            console.log(error);
            Errors.throwMethodFailed('train')
        }
    };


    /**
     * Creates the game for the training purposes
     * 
     * @returns Freshly created game
     * 
     */
    async createGame() {
        try {
            const response = await axios.post(`${this._apiUrl}/game/createGame`, {
                playerUsernames: [
                    'ProtokolMATICfudraca1',
                    'ProtokolMATICfudraca2',
                    'ProtokolMATICfudraca3',
                    'ProtokolMATICfudraca4'
                ],
                mapName: 'test1.txt'
            }, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });

            console.log(response.data)
            return null
        } catch (error) {
            console.log(error);
            Errors.throwMethodFailed('createGame')
        }
    };


    /**
     * Used for training game purposes
     */
    async doActionTrain(actionType, QCoordinate, RCoordinate) {
        // Need a transformer function to match the parameters with one of the predefined actions
        // i.e. MOVE, ATTACK and shove in the parameters then
        try {
             
            const response = await axios.get(`${this._apiUrl}/game/actionTrain`, {
                action : 'attack, -3, 3'
            }, {
                headers: {
                    'Authentication' : token
                }
            })

        } catch (error) {
            console.log(error)
            Errors.throwMethodFailed('doActionTrain')
        }
    };


    /**
     * Join Game
     */
    async joinGame() {
        //
    }
    // #endregion
};