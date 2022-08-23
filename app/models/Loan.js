// Import du CoreDatamapper, class parente des Models
const CoreDatamapper = require('./coreDatamapper');
// Import du client
const client = require('../config/db');

/**
 * "Loan" Model Object
 * @typedef {object} LoanModel
 * @property {string} status - Loan status
 * @property {date} loanDate - Loan date
 * @property {number} libraryId - Library id who lends the book
 * @property {number} userId - User id who borrows the book
 */

module.exports = class Loan extends CoreDatamapper {
    static tableName = 'loan';

    constructor(loan) {
        super();
        this.status = loan.status;
        this.loan_date = loan.loanDate;
        this.user_id = loan.userId;
        this.library_id = loan.libraryId;
    }

    static async getLastLoans() {
        const sql = `SELECT * FROM ${this.tableName} ORDER BY "created_at LIMIT 50`;
        const results = await client.query(sql);
        return results.rows;
    }

    static async getLoanByLibrary(libraryId) {
        const sql = {
            text: 'SELECT * FROM "loan_details" WHERE libraryId=$1',
            values: [libraryId],
        };
        const results = await client.query(sql);
        return results.rows;
    }

    static async getLoanByUser(userId) {
        const sql = {
            text: 'SELECT * FROM "loan_details" WHERE userId=$1',
            values: [userId],
        };
        const results = await client.query(sql);
        return results.rows;
    }

    static async isLoanExist(userId, libraryId) {
        const sql = {
            text: `SELECT * FROM ${this.tableName} WHERE "user_id"=$1 AND "library_id"=$2`,
            values: [userId, libraryId],
        };

        const result = await client.query(sql);
        return result.rows[0];
    }

    static async update(loan) {
        const sql = {
            text: 'SELECT * FROM update_loan($1)',
            values: [loan],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }

    async insert() {
        const sql = {
            text: 'SELECT * FROM insert_loan($1, $2)',
            values: [this.user_id, this.library_id],
        };

        const result = await client.query(sql);
        return result.rows[0];
    }
};
