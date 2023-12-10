const Sanitizer = require('../src/Connector/Sanitizer');
const Connector = require('../src/Connector/Connector');
const gameStateData = require('./gameState.json')


async function main() {

    const sanitizer = new Sanitizer(gameStateData);
    sanitizer.indexResponseData();
    // const tile = sanitizer.getField(0, 11);
    // const tile = sanitizer.getField(14, -14);
    const validmoves = sanitizer.getValidMoves(14, 14);
    console.log(validmoves);

};


main();

