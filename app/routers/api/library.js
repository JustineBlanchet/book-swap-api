const express = require('express');

// Import des helpers nécessaires
const controllerHandler = require('../../helpers/controllerHandler');
const auth = require('../../middlewares/auth');

// Import des controllers
const libraryController = require('../../controllers/api/libraryController');

// Création router express
const router = express.Router();

// Récupérer les informations personnelles de librairie
/**
 * GET /mylibrary
 * @summary Get user's personnal library
 * @tags Library
 * @security BearerAuth
 * @return {PersonnalLibraryModel} 200 - success response - application/json
 * @return {AuthError} 403 - Authentification failed - application/json
 */
router.get('/mylibrary', auth, controllerHandler(libraryController.getMyLibrary));

// Associer un livre à un utilisateur
/**
  * POST /mylibrary/addBook
  * @summary Add book in user's library
  * @tags Library
  * @security BearerAuth
  * @param {AddLibraryModel} request.body.required - Book informations
  * @return {LibraryModel} 200 - success response - application/json
  * @return {AuthError} 403 - Authentification failed - application/json
  */
router.post('/mylibrary/addBook', auth, controllerHandler(libraryController.addBookInLibrary));

// Modifier la disponibilité d'un livre
/**
  * PATCH /mylibrary/book/:id
  * @summary Update user's library
  * @tags Library
  * @security BearerAuth
  * @param {number} id.path.required - Library identifier
  * @param {UpdateLibraryModel} request.body.required - Availability of the book
  * @return {LibraryModel} 200 - success response - application/json
  * @return {AuthError} 403 - Authentification failed - application/json
  * @return {ClientError} 400 - user error response - application/json
  */
router.patch('/mylibrary/book/:id', auth, controllerHandler(libraryController.updateBookInLibrary));

// Supprimer l'association entre un livre et un utilisateur
/**
  * DELETE /mylibrary/book/:id
  * @summary Delete user's library
  * @tags Library
  * @security BearerAuth
  * @param {number} id.path.required - Library identifier
  * @return {string} 200 - "Library deleted" - application/json
  * @return {AuthError} 403 - Authentification failed - application/json
  * @return {ClientError} 400 - user error response - application/json
  */
router.delete('/mylibrary/book/:id', auth, controllerHandler(libraryController.deleteBookFromLibrary));

// Récupérer les infos utilisateur à partir d'un id de librairie
/**
 * GET /library/:id
 * @summary Get other user library
 * @tags Library
 * @param {number} id.path.required - Library's identifier
 * @return {UserLendInfosModel} 200 - success response - application/json
 * @return {ClientError} 400 - user error response - application/json
 */
router.get('/library/:id', controllerHandler(libraryController.getUserInfosByLibrary));

// Récupérer les informations de librairie d'un autre utiliateur
/**
 * GET /visitedlibrary/:username
 * @summary Get other user library
 * @tags Library
 * @param {number} username.path.required - User's username
 * @return {LibraryModel} 200 - success response - application/json
 * @return {ClientError} 400 - user error response - application/json
 */
router.get('/visitedlibrary/:username', controllerHandler(libraryController.getLibrary));

module.exports = router;
