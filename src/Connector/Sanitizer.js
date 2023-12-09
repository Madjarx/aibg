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
 * 
 */
module.exports = class Sanitizer {
     
    /**
     * Class properties
     */
    _gameState;


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
    static getInitialCoordinates() {
        //
    };

    static getRocks() {
        //
    };

    static getChest() {
        //
    };

    static getTrees() {
        //
    };

    static getField() {
        //
    };

    static getNeighbourFields() {
        //
    };

    
};