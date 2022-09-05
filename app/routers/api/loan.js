const express = require('express');

// Import des helpers nécessaires
const controllerHandler = require('../../helpers/controllerHandler');
const auth = require('../../middlewares/auth');

// Import des controllers
const loanController = require('../../controllers/api/loanController');

// Création router express
const router = express.Router();

// Génerer un nouvel emprunt
/**
 * POST /loan
 * @summary Generate new loan
 * @tags Loan
 * @security BearerAuth
 * @param {AddLoanModel} request.body.required - Library identifier
 * @return {LoanModel} 200 - success response- application/json
 * @return {AuthError} 403 - Authentification failed - application/json
 * @return {ClientError} 400 - user error response - application/json
 */
router.post('/loan', auth, controllerHandler(loanController.generateLoan));

// Modifier un emprunt
/**
  * PATCH /loan/:id
  * @summary Update loan status
  * @tags Loan
  * @security BearerAuth
  * @param {number} id.path.required - Loan identifier
  * @param {UpdateLoanModel} request.body.required - Loan status
  * @return {LoanModel} 200 - success response- application/json
  * @return {AuthError} 403 - Authentification failed - application/json
  * @return {ClientError} 400 - user error response - application/json
  */
router.patch('/loan/:id', auth, controllerHandler(loanController.updateLoan));

// Récupérer les derniers emprunts de l'application
/**
  * GET /loans
  * @summary Get last loans
  * @tags Loan
  * @return {[LoanModel]} 200 - success response - application/json
  * @return {ApiError} 400 - Internal Server Error - application/json
  */
router.get('/loans', controllerHandler(loanController.getLoans));

module.exports = router;
