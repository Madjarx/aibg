const Connector = require('../../src/Connector/Connector')

require('dotenv').config();



/** ENV variables processing */
const apiUrl = process.env.AIBG_URL;
const port = process.env.AIBG_PORT;
const username = 'ProtokoliMATFmudraca';
const password = 'qQZygGFGdW';
const botToken = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlByb3Rva29saU1BVEZtdWRyYWNhMSIsInBhc3N3b3JkIjoicVFaeWdHRkdkVyJ9.CiWg9nyohyMje1lab1NYjmt9v7lOKUaQ9h4Mx4LsQ55oxpAbntunUJiuj_HP_nbiNHo6XVp3pDaCZWY5HelaIQ';
// const botToken = process.env.BOT1_TOKEN;

const url = `${apiUrl}:${port}`;


/**
 * Main function definition
 */
async function main() {
    const connector = new Connector(url, username, password);

    try {
        const gameJoinResponse = await connector.joinGame(botToken);
        console.log(gameJoinResponse);
    } catch (error) {
        console.error('Failed to join game:', error);
        return; // Exit the function if game creation fails
    }
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