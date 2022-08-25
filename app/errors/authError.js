/**
 * @typedef {object} AuthError
 * @property {string} message - Error message
 * @property {string} name - Error name
 */
module.exports = class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthentificationError';
    }
};
