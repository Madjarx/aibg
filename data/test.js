const Sanitizer = require('../src/Connector/Sanitizer');
const Connector = require('../src/Connector/Connector');
const gameStateData = require('./gameState.json')


async function main() {

    const sanitizer = new Sanitizer(gameStateData);
    sanitizer.indexResponseData();
    // const tile = sanitizer.getField(0, 11);
    // const tile = sanitizer.getField(14, -14);
    const neighbours = sanitizer.getNeighbours(0, 0);
    console.log(neighbours);

};


main();

