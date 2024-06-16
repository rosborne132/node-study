// Clients
const { purchaseV1 } = require('./lib/clients/purchase-v1');
const { purchaseV2 } = require('./lib/clients/purchase-v2');

const main = async () => {
    await Promise.all([
        purchaseV1(),
        purchaseV2() // Should be faster than purchaseV1
    ]);

    console.log('All purchases completed.');
}

main();
