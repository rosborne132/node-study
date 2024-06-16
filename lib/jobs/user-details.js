// Libraries
const { parentPort, workerData } = require('worker_threads');

// Utilities
const { delay } = require('../utils');

const run = async () => {
    console.log('User account job data: ', workerData);

    // Look up the user's account information
    const userAccount = await delay(200, { id: 1, name: 'Marcus' });

    // Check if user is eligible for doing business
    const eligibility = await delay(200, { id: 1, eligible: true });

    // Validate user's billing address
    const billingAddress = await delay(300, { id: 1, street: '123 Main St' });

    // Construct the user account object
    userAccount.billingAddress = billingAddress;
    userAccount.eligibility = eligibility;

    return userAccount;
};

run().then(result => parentPort.postMessage(result));
