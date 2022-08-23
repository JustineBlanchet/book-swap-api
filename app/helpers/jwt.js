const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const secret = process.env.JWT_SECRET || 'secretphrase';

module.exports = {
    create(userData) {
        const options = {};
        options.expiresIn = 1000;

        const user = {
            id: userData.id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
        };

        return jwt.sign(user, secret, options);
    },

    verify(token) {
        return jwt.verify(token, secret, (err, user) => {
            if (err) {
                throw new AuthError('Authentification failed');
            }
            return user;
        });
    },
};
