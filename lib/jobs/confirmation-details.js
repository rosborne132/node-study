// Libraries
const { parentPort, workerData } = require('worker_threads');

// Utilities
const { delay } = require('../utils');

const run = async () => {
    console.log('email job data: ', workerData);

    const {
        order,
        subscription,
        userAccount
    } = workerData.data;

    // Collect data for purchase confirmation
    const purchaseConfirmation = {
        order,
        subscription,
        userAccount
    };

    // Send email confirmation
    const emailResponse = await delay(200, { id: 1, success: true });

    return  {
        purchaseConfirmation,
        emailResponse
    };
};

run().then(result => parentPort.postMessage(result));
