const Connector = require('./Connector/Connector')

require('dotenv').config();



/** ENV variables processing */
const apiUrl = process.env.AIBG_URL;
const port = process.env.AIBG_PORT;
/** DEPRECATED -> Remove this stuff */
// const username = process.env.AIBG_USERNAME;
// const password = process.env.AIBG_PASSWORD;

const url = `${apiUrl}:${port}`;


/**
 * Main function definition
 */
async function main() {
    const connector = new Connector(url);
    // const response = await connector.login(username, password);
    const response = await connector.createGame();
    // const response = await connector.joinGame();
    console.log(response);
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