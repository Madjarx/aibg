const Connector = require('./Connector/Connector')

require('dotenv').config();



/** ENV variables processing */
const apiUrl = process.env.AIBG_URL;
const port = process.env.AIBG_PORT;
const username = 'ProtokoliMATFmudraca';
const password = 'qQZygGFGdW';
/** DEPRECATED -> Remove this stuff */
// const username = process.env.AIBG_USERNAME;
// const password = process.env.AIBG_PASSWORD;

const url = `${apiUrl}:${port}`;


/**
 * Main function definition
 */
async function main() {
    const connector = new Connector(url, username, password);

    const botTokens = await connector.getBotTokens();
    const gameCreationResponse = await connector.createGame();
    const togetherJoinResponse = await connector.togetherJoin();
    console.log(togetherJoinResponse.length);
    // let gameCreationResponse;
    // try {
        // console.log(gameCreationResponse);
    // } catch (error) {
        // console.er/ror('Failed to create game:', error);
        // return; // Exit the function if game creation fails
    // }

    // const botJoinResponses = await connector.joinGameWithAllBots();

    // console.log(botJoinResponses);
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