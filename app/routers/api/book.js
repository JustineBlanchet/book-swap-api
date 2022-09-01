const express = require('express');

// Import des helpers nécessaires
const controllerHandler = require('../../helpers/controllerHandler');

// Import des controllers
const bookController = require('../../controllers/api/bookController');

// Création router express
const router = express.Router();

// Récupérer les derniers ajouts de livres par les utilisateurs
/**
 * GET /books
 * @summary Get last books
 * @tags Book
 * @return {[BookModel]} 200 - success response - application/json
 * @return {ApiError} 400 - Internal Server Error - application/json
 */
router.get('/books', controllerHandler(bookController.getBooks));

// Récupérer les utilisateurs possédant un livre
/**
  * GET /book/:isbn
  * @summary Get last books
  * @tags Book
  * @param {string} isbn.path.required - Book's ISBN number
  * @return {[UserModel]} 200 - success response - application/json
  * @return {ApiError} 400 - Internal Server Error - application/json
  */
router.get('/book/:isbn', controllerHandler(bookController.getUsersByBook));

module.exports = router;
