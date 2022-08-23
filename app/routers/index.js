const express = require('express');

// Création router express
const router = express.Router();

// Import des helpers nécessaires
const controllerHandler = require('../helpers/controllerHandler');
const auth = require('../middlewares/auth');

// Import des controllers
const userController = require('../controllers/userController');
const libraryController = require('../controllers/libraryController');
const tagController = require('../controllers/tagController');
const loanController = require('../controllers/loanController');
const bookController = require('../controllers/bookController');

/// Inscription / Connexion
/**
 * POST /login
 * @summary User connexion to generate token
 * @tags User
 * @param {string} request.body.required - User email
 * @return {string} 200 - success response - application/json
 * @return {string} 400 - user error response - application/json
 */
router.post('/login', controllerHandler(userController.login));
/**
 * POST /createuser
 * @summary Create new user
 * @tags User
 * @param {UserModel} request.body.required - User data to add to DB
 * @return {string} 200 - success response - application/json
 * @return {string} 400 - user error response - application/json
 */
router.post('/createuser', controllerHandler(userController.createUser));

/// Profil personnel utilisateur
router.route('/profile')
    /**
     * GET /profile
     * @summary Get personnal profile informations
     * @tags User
     * @return {string} 200 - success response - application/json
     * @return {string} 400 - user error response - application/json
     */
    .get(auth, controllerHandler(userController.getProfile))
    .patch(auth, controllerHandler(userController.updateProfile))
    .delete(auth, controllerHandler(userController.deleteProfile));

/// Infos personnelles utilisateur
/**
 * GET /mylibrary
 * @summary Get user personnal library
 * @tags User
 * @return {string} 200 - success response - application/json
 * @return {string} 400 - user error response - application/json
 */
router.get('/mylibrary', auth, controllerHandler(libraryController.getMyLibrary));
router.post('/mylibrary/addBook', auth, controllerHandler(libraryController.addBookInLibrary));
router.patch('/mylibrary/book/:id', auth, controllerHandler(libraryController.updateBookInLibrary));
router.delete('/mylibrary/book/:id', auth, controllerHandler(libraryController.deleteBookFromLibrary));

/// Infos de contact de l'utilisateur prêteur
router.get('/userinfos/:username', controllerHandler(userController.getContactInfos));

/// Librairie autre utilisateur
/**
 * GET /library/:id
 * @summary Get other user library
 * @tags Visitor
 * @return {string} 200 - success response - application/json
 * @return {string} 400 - user error response - application/json
 */
router.get('/library/:username', controllerHandler(libraryController.getLibrary));

/// Gestion des emprunts
router.post('/loan', auth, controllerHandler(loanController.generateLoan));
router.patch('/loan/:id', auth, controllerHandler(loanController.updateLoan));

router.get('/loans', controllerHandler(loanController.getLoans));

/// Récupération des informations de livres
router.get('/books', controllerHandler(bookController.getBooks));
router.get('/books/:googleId', controllerHandler(bookController.getUsersByBook));

/// Gestion des tags
router.get('/tags', controllerHandler(tagController.getTags));
router.post('/addTag', auth, controllerHandler(tagController.addTagToUser));
router.delete('/removeTag', auth, controllerHandler(tagController.removeTagFromUser));

module.exports = router;
