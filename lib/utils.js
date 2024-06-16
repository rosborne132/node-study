const delay = (ms, value) =>
    new Promise(resolve => setTimeout(() => resolve(value), ms));

module.exports = {
    delay
};
