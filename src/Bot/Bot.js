/**
 * This is the Bot module
 * 
 * It should combine all the logic and use all the interfaces presented to it 
 * in the other peer modules & interfaces
 */

/**
 * Imports
 */
const Connector = require('../Connector/Connector');
const Sanitizer = require('../Connector/Sanitizer');
require('dotenv').config();



/** ENV variables processing */
const apiUrl = process.env.AIBG_URL;
const port = process.env.AIBG_PORT;
const username = 'ProtokoliMATFmudraca';
const password = 'qQZygGFGdW';
const url = `${apiUrl}:${port}`;



/** 
 * Main function definition
 */
async function main() {
    const connector = new Connector(url, username, password);

    const botToken = await connector.login();
    
    const gameJoinResponse = await connector.joinGame(botToken);
    const sanitizer = new Sanitizer(gameJoinResponse);

    /**
     * Poll for the first request to be processed,
     * luckyshot at when we're playing
     */
    console.log("Hello from Protokoli MATF mudraca")
};


/**
 * Execute the main function
 */
main()
    .catch(err => {
        console.error(err);
    });