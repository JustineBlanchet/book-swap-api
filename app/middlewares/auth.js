// Middleware de gestion de l'authentification qui va vérifier la validité d'un token
const jwt = require('../helpers/jwt');
const AuthError = require('../errors/authError');

module.exports = (req, _, next) => {
    // On vérifie qu'il y a bien un header authorization
    if (!req.headers.authorization) {
        throw new AuthError('Missing authorization header');
    }

    // On vérifie que le token est bien présent
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        throw new AuthError('Missing token');
    }

    // Vérification du token
    const user = jwt.verify(token);
    req.user = user;
    next();
};
