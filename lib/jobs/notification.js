// Libraries
const { parentPort, workerData } = require('worker_threads');

// Utilities
const { delay } = require('../utils');

const run = async () => {
    console.log('notification job data: ', workerData);

    const { order, subscription } = workerData.data;

    // Construct the order object for downstream systems
    order.subscription = subscription;

    // Notify downstream systems with the order data
    await Promise.all([
        delay(200, { id: 1, success: true }),   // Send order data to downstream systems
        delay(200, { id: 1, success: true })    // Place order in the queue for further processing
    ]);
};

run().then(result => parentPort.postMessage(result));
