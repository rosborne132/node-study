// Libraries
const { parentPort, workerData } = require('worker_threads');

// Utilities
const { delay } = require('../utils');

const run = async () => {
    console.log('Cart job data: ', workerData);

    // Look up the product information
    const product = await delay(200, { id: 1, name: 'Book' });

    // Look up promotion information
    const promotion = await delay(200, { id: 1, discount: 0 });

    // Create a cart with the product and promotion
    const cart = await delay(300, { id: 1, success: true });
    cart.product = product;
    cart.promotion = promotion;

    return cart;
};

run().then(result => parentPort.postMessage(result));
