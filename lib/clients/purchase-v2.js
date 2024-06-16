
// Clients
const { run } = require('./job-runner');

// Utilities
const { delay } = require('../utils');

const purchaseV2 = async () => {
    const startTime = Date.now();
    const [userAccount, cart] = await Promise.all([
        run({
            path: './lib/jobs/user-details.js',
            data: 'data for user account job'
        }),
        run({
            path: './lib/jobs/cart-details.js',
            data: 'data for cart job'
        })
    ]);

    // Calculate taxes based on the billing information
    const taxes = await delay(400, { id: 1, amount: 10 });

    // Make purchase with payment provider
    const purchase = await delay(300, { id: 1, success: true });

    // Create order in the database
    const order = await delay(300, { id: 1, success: true });
    order.cart = cart;
    order.taxes = taxes;
    order.purchase = purchase;

    // Create subscription for user
    const subscription = await delay(400, { id: 1, success: true });

    const [_, confirmation] = await Promise.all([
        run({
            path: './lib/jobs/notification.js',
            data: {
                order,
                subscription
            }
        }),
        run({
            path: './lib/jobs/confirmation-details.js',
            data: {
                order,
                subscription,
                userAccount
            }
        })
    ]);

    // Calculate the elapsed time
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log(`Function V2 took ${elapsedTime} milliseconds.`);

    return confirmation
};

module.exports = {
    purchaseV2
};
