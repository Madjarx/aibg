/** Class imports */
const axios = require('axios');

/** Module imports */
// const ErrorLogger = require('../ErrorLogger')
const Errors = require('../Loggers/Errors');

/** Auth Bearer token used for api call auth */
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlByb3Rva29saU1BVEZtdWRyYWNhIiwicGFzc3dvcmQiOiJxUVp5Z0dGR2RXIn0.taYkSor4_DPd-yEonJaLyE8A5D7MTvrWKS0o-guoVpTw5MQMZupzA_wzEpfwz8uzVrQ9_6Tx3yVJXWxIlSJ7hQ'



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
     * Should create Game
     * 
     * Possibly used by admins
     * 
     */
    async createGame() {
        console.log("Possibly to be used by game admins only")
        Errors.throwMethodNotImplemented('createGame')
    };

    
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
     * Used for training game purposes
     */
    async doActionTrain(actionType, QCoordinate, RCoordinate) {
        // Can you implement some checking and regex here
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
    // #endregion
}