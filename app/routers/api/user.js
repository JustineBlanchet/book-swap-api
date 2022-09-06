const express = require('express');

// Import des helpers nécessaires
const controllerHandler = require('../../helpers/controllerHandler');
const auth = require('../../middlewares/auth');

// Import des controllers
const userController = require('../../controllers/api/userController');

// Création router express
const router = express.Router();

// Connexion, génération de token et récupération des infos personnelles de librairie
/**
 * POST /login
 * @summary User connexion to generate token
 * @tags User
 * @param {LoginDataModel} request.body.required - User connexion data
 * @return {LogedModel} 200 - success response - application/json
* @return {ClientError} 400 - user error response - application/json
 */
router.post('/login', controllerHandler(userController.login));

// Ajout d'un nouvel utilisateur en BDD
/**
 * POST /createuser
 * @summary Create new user
 * @tags User
 * @param {CreateUserModel} request.body.required - User informations
 * @return {string} 200 - User created - application/json
 * @return {ClientError} 400 - user error response - application/json
 */
router.post('/createuser', controllerHandler(userController.createUser));

router.route('/profile')
// Récupérer les informations personnelles de profil
    /**
     * GET /profile
     * @summary Get personnal profile informations
     * @tags User
     * @security BearerAuth
     * @return {UserModel} 200 - success response - application/json
     * @return {AuthError} 403 - Authentification failed - application/json
     */
    .get(auth, controllerHandler(userController.getProfile))
    // Modifier les informations de profil
    /**
     * PATCH /profile
     * @summary Update personnal profile informations
     * @tags User
     * @param {UpdateUserModel} request.body.required - User informations
     * @security BearerAuth
     * @return {UserModel} 200 - success response - application/json
     * @return {AuthError} 403 - Authentification failed - application/json
     * @return {ClientError} 400 - user error response - application/json
     */
    .patch(auth, controllerHandler(userController.updateProfile))
    // Supprimer un profil
    /**
     * DELETE /profile
     * @summary Delete user's profile
     * @tags User
     * @security BearerAuth
     * @return {string} 200 - "User deleted" - application/json
     * @return {AuthError} 403 - Authentification failed - application/json
     */
    .delete(auth, controllerHandler(userController.deleteProfile));

// Récupérer les informations de contact d'un utilisateur
/**
 * GET /userinfos/:id
 * @summary Get contact informations
 * @tags User
 * @param {number} id.path.required - Library's identifier
 * @return {UserModel} 200 - success response - application/json
 * @return {ClientError} 400 - user error response - application/json
 */
router.get('/userinfos/:id', controllerHandler(userController.getContactInfos));

module.exports = router;
