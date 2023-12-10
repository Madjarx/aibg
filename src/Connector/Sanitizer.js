const Errors = require('../Loggers/Errors')


/**
 * This class is meant to sanitize and pick out data that we specifically need.
 * Meant to be used to help other team members get their hands on data more easily
 * 
 * Refer to ~./dump/gameState.json for more information about example data
 * 
 * NOTE - since its a hackathon, go with the assumption that everything exists!!! no null safety
 * 
 * 
 * ######################
 * 
 * 
 * Class Sanitizer
 * 
 * This class focuses on providing cleaned data from the big blob that we get from the 
 * 
 */
module.exports = class Sanitizer {

    /**
     * Class properties
     */
    _gameState; // Non-indexed response object
    /** FULL entities (non walkable) */
    _stones = [];
    _cliffs = [];
    _trees = [];
    /** NORMAL entities (walkable) */
    _leaves = [];
    _chests = [];
    _skull = [];
    _none = [];
    /** PLAYER entites */
    _players = [];


    /**
     * Constructor
     * 
     * @param {Object} gameState 
     */
    constructor(gameState) {
        this._gameState = gameState;
    };


    /**
     * Returns the initial coordinates based on the given id
     */
    static validateResponse() {
        // This function should validate the response
        // since we may have answers that are not json
        // this function should be 
    }

    
    
    static getField() {
        
    };
    
    static getValidMoves() {
        
    }
    
    static getNeighbourFields() {
        // easy to implement since gameState is a list of lists
        // We could also add some manhattan distance to the fields
    };
    
    /**
     * 
     * @param {number} playerIdx - index of the player [1, 4]
     * @returns 
     */
    getInitialCoordinates(playerIdx) {
        if (playerIdx < 1 || playerIdx > 4) {
            throw new Error("Invalid player id");
        };
 
        switch (playerIdx) {
            case 1:
                return { q: -7, r: -7 };
            case 2:
                return { q: 14, r: -7 };
            case 3:
                return { q: -14, r: 7 };
            case 4:
                return { q: 7, r: 7 };
            default:
                console.log("Invalid player id")
                throw new Error("Invalid player id");
        }
    };

    /**
     * Returns the player with the given index
     * 
     * @param {number} playerIdx - index of the player
     * @returns {Object} The player with the given index
     */
    getPlayer(playerIdx) {
       const allPlayers = this.getAllPlayers();
       const player = allPlayers.find(player => player.playerIdx === playerIdx);

        if (!player) {
            console.log(`Player with index ${playerIdx} not found. Found Dead?`);
            return;
        }

        return player;
    };

    /**
     * Returns all the players in the game
     * 
     * @returns {Object[]} Array containing all the players
     */
    getAllPlayers() {
        try {
            const response = [];

            if (this._gameState.gameState.player1) {
                response.push(this._gameState.gameState.player1);
            }

            if (this._gameState.gameState.player2) {
                response.push(this._gameState.gameState.player2);
            }

            if (this._gameState.gameState.player3) {
                response.push(this._gameState.gameState.player3);
            }

            if (this._gameState.gameState.player4) {
                response.push(this._gameState.gameState.player4);
            }

            return response;

        } catch (error) {
            console.log(error);
        }
    };

    getTurnNumber() {
        try {
            return this._gameState.gameState.turn;
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * For the given game State object, this method will make it more easily accessible for the developer
     * to work with the data
     * 
     * Meant to be called upon the fetch response
     * 
     * It will fill the class properties with relevant data
     */
    indexResponseData() {
        try {
            // #region Player data indexation
            this._players = this.getAllPlayers();
            // #endregion

            let horizontalRows = this._gameState.gameState.map.tiles;
            /** These are all horizontal rows */
            for (let i = 0; i < horizontalRows.length; i++) {
                let singleHorizontalRow = horizontalRows[i]; // Converting the exposed array to a variable
                for (let j = 0; j < singleHorizontalRow.length; j++) {

                    let tile = singleHorizontalRow[j]; // This is a single tile in the given I,J position

                    // #region Tile Processing & indexing
                    switch (tile.entity.type) {
                        case 'LEAVES':
                            this._leaves.push(tile);
                            break;
                        case 'STONE':
                            this._stones.push(tile);
                            break;
                        case 'TREES':
                            this._trees.push(tile);
                            break;
                        case 'CHEST':
                            this._chests.push(tile);
                            break;
                        case 'SKULL':
                            this._skull.push(tile);
                            break;
                        case 'CLIFF':
                            this._cliffs.push(tile);
                            break;
                        case 'NONE':
                            this._none.push(tile);
                            break;
                        default:
                            console.log('Invalid tile type');
                            break;
                    }
                    // #endregion
                };
            };

        } catch (error) {
            console.log(error);
        };
    }


    getLeaves() {
        try {
            return this._leaves;
        } catch (error) {
            console.log(error);
        }
    };

    getPlayers() {
        try {
            return this._players;
        } catch (error) {
            console.log(error);
        }
    }

    getSkull() {
        try {
            return this._skull;
        } catch (error) {
            console.log(error);
        }
    }

    getNone() {
        try {
            return this._none;
        } catch (error) {
            console.log(error);
        }
    }

    getCliffs() {
        try {
            return this._cliffs;
        } catch (error) {
            console.log(error);
        }
    }


    
    getStones() {
        try {
            return this._stones;
        } catch (error) {
            console.log(error);
        }
    };

    getChests() {
        try {
            return this._chests;
        } catch (error) {
            console.log(error);
        }
    };

    getTrees() {
        try {
            return this._trees;
        } catch (error) {
            console.log(error);
        }
    };



    logIndexedData() {
        console.log('Stones: ', this._stones.length, 'tiles found. Data: \n', this._stones);
        console.log('Cliffs: ', this._cliffs.length, 'tiles found. Data: \n', this._cliffs);
        console.log('Trees: ', this._trees.length, 'tiles found. Data: \n', this._trees);
        console.log('Leaves: ', this._leaves.length, 'tiles found. Data: \n', this._leaves);
        console.log('Chests: ', this._chests.length, 'tiles found. Data: \n', this._chests);
        console.log('Skull: ', this._skull.length, 'tiles found. Data: \n', this._skull);
        console.log('None: ', this._none.length, 'tiles found. Data: \n', this._none);
        console.log('Players: ', this._players.length, 'tiles found. Data: \n', this._players);
    }


};