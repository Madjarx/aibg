/**
 * This module simulates the turns and logs the outputs
 */
const Connector = require('../../src/Connector/Connector');
const Sanitizer = require('../../src/Connector/Sanitizer');
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

    const botTokens = await connector.getBotTokens();
    const gameCreationResponse = await connector.createGame();
    const togetherJoinResponse = await connector.togetherJoin();

    const sanitizerAlice = new Sanitizer(togetherJoinResponse[0]);
    const sanitizerBob = new Sanitizer(togetherJoinResponse[1]);
    const sanitizerCharlie = new Sanitizer(togetherJoinResponse[2]);
    const sanitizerDanny = new Sanitizer(togetherJoinResponse[3]);

    // call any sanitizer and figure out who is the first mover
    // store the order of movement to an array


    for (let i = 1; i <= 5000; i++) {
        // in this for loop, see whos turn it is to move, taking into account that the first mover
        // is the player with playerIdx equal to 1

        // before the turn begins, always index the data => its already indexed but make sure to 
        // within connector, get the bot's location
        // get the bot token
        // after you get the location, get the valid moves
        // choose a random move that is valid
        // make the move
    }

    console.log(togetherJoinResponse.length);
};



/**
 * Execute the main function
 */
main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    }
);