const { delay } = require('../utils');

const purchaseV1 = async () => {
    // Start the timer
    const startTime = Date.now();
    // Look up the user's account information
    const userAccount = await delay(200, { id: 1, name: 'Marcus' });

    // Look up the product information
    const product = await delay(200, { id: 1, name: 'Book' });

    // Look up promotion information
    const promotion = await delay(200, { id: 1, discount: 0 });

    // Create a cart with the product and promotion
    const cart = await delay(300, { id: 1, success: true });
    cart.product = product;
    cart.promotion = promotion;

    // Check if user is eligible for doing business
    const eligibility = await delay(200, { id: 1, eligible: true });

    // Validate user's billing address
    const billingAddress = await delay(300, { id: 1, street: '123 Main St' });

    // Construct the user account object
    userAccount.billingAddress = billingAddress;
    userAccount.eligibility = eligibility;

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

    // Construct the order object for downstream systems
    order.subscription = subscription;

    // Notify downstream systems with the order data
    await Promise.all([
        delay(200, { id: 1, success: true }),   // Send order data to downstream systems
        delay(200, { id: 1, success: true })    // Place order in the queue for further processing
    ]);

    // Collect data for purchase confirmation
    const purchaseConfirmation = {
        order,
        subscription,
        userAccount
    };

    // Send email confirmation
    const emailResponse = await delay(300, { id: 1, success: true });

    // Calculate the elapsed time
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log(`Function V1 took ${elapsedTime} milliseconds.`);

    return {
        purchaseConfirmation,
        emailResponse
    };
}

module.exports = {
    purchaseV1
};
