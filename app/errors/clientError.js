/**
 * @typedef {object} ClientError
 * @property {string} message - Error message
 * @property {string} name - Error name
 */

module.exports = class ClientError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ClientError';
    }
};
