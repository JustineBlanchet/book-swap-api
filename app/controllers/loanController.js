const Loan = require('../models/Loan');
const Library = require('../models/Library');
const ClientError = require('../errors/clientError');

const loanController = {
    async generateLoan(req, res) {
        // Générer un emprunt
        // Récupérer l'id du user emprunteur
        const userId = Number(req.user.id);

        // Récupérer l'id de la librairie prêteuse
        const libraryId = Number(req.body.libraryId);

        // Vérifier que l'emprunt n'existe pas déjà en BDD
        const isLoanExist = await Loan.isLoanExist(userId, libraryId);
        if (isLoanExist) {
            throw new ClientError('This loan already exist');
        }

        // Création d'un nouvel emprunt
        const loan = new Loan({
            userId,
            libraryId,
        });

        // On rend le livre indisponible
        await Library.update('false', libraryId);

        const newLoan = await loan.insert();
        res.json(newLoan);
    },

    async updateLoan(req, res) {
        // Modifier un emprunt
        // Récupérer l'id de l'emprunt
        const loanId = Number(req.params.id);

        // Vérifier que l'emprunt existe bien en BDD
        const loan = await Loan.findByPk(loanId);
        if (!loan) {
            throw new ClientError('This loan does not exist');
        }

        const updatedLoan = await Loan.update({ ...req.body }, loanId);
        res.json(updatedLoan);
    },

    async getLoans(_, res) {
        // Récupérer les derniers emprunts effectués
        const loans = await Loan.getLastLoans();
        res.json(loans);
    },

};

module.exports = loanController;
