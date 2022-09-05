const express = require('express');

// Import des helpers nécessaires
const controllerHandler = require('../../helpers/controllerHandler');
const auth = require('../../middlewares/auth');

// Import des controllers
const tagController = require('../../controllers/api/tagController');

// Création router express
const router = express.Router();

// Récupérer tous les tags disponibles
/**
 * GET /tags
 * @summary Get all tags
 * @tags Tag
 * @return {[TagModel]} 200 - success response - application/json
 * @return {ApiError} 400 - Internal Server Error - application/json
 */
router.get('/tags', controllerHandler(tagController.getTags));

// Associer un tag à un utilisateur
/**
  * POST /addtag
  * @summary Add tag to user
  * @tags Tag
  * @security BearerAuth
  * @param {UpdateTagModel} request.body.required - Tag identifier
  * @return {TagModel} 200 - success response - application/json
  * @return {AuthError} 403 - Authentification failed - application/json
  * @return {ClientError} 400 - user error response - application/json
  */
router.post('/addtag', auth, controllerHandler(tagController.addTagToUser));

// Dissocier un tag d'un utilisateur
/**
  * DELETE /removetag
  * @summary Remove tag from user
  * @tags Tag
  * @security BearerAuth
  * @param {UpdateTagModel} id.path.required - Tag identifier
  * @return {string} 200 - Association removed - application/json
  * @return {AuthError} 403 - Authentification failed - application/json
  * @return {ClientError} 400 - user error response - application/json
  */
router.delete('/removetag/:id', auth, controllerHandler(tagController.removeTagFromUser));

module.exports = router;
