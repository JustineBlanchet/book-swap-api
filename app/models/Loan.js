// Import du CoreDatamapper, class parente des Models
const CoreDatamapper = require('./coreDatamapper');
// Import du client
const client = require('../config/db');

/**
 * "Loan" Model Object
 * @typedef {object} LoanModel
 * @property {number} id - Loan id
 * @property {string} status - Loan status
 * @property {string} loanDate - Loan date
 * @property {number} libraryId - Library id who lends the book
 * @property {number} userId - User id who borrows the book
 * @property {string} created_at - Loan's creation date
 * @property {string} updated_at - Loan's update date
 */

/**
 * "AddLoan" Model Object
 * @typedef {object} AddLoanModel
 * @property {string} libraryId - Library identifier who owns the book
 */

/**
 * "UpdateLoan" Model Object
 * @typedef {object} UpdateLoanModel
 * @property {string} status - Status of the loan
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
        const sql = `SELECT "loan"."id" as loanId, "loan"."status", "loan"."date", "book"."isbn", "library"."id" as libraryId, "user"."username", "user"."profile_picture" FROM ${this.tableName}
        JOIN "library" ON "library"."id" = "loan"."library_id"
        JOIN "book" ON "book"."id" = "library"."book_id"
        JOIN "user" ON "user"."id" = "loan"."user_id"
        ORDER BY "loan"."created_at" DESC LIMIT 10`;
        const results = await client.query(sql);
        return results.rows;
    }

    static async getLoanByLibrary(libraryId) {
        const sql = {
            text: 'SELECT * FROM "loan_details" WHERE libraryid=$1',
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

    static async update(loan, loanId) {
        const sql = {
            text: 'SELECT * FROM update_loan($1, $2)',
            values: [loan, loanId],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }

    async insert() {
        const sql = {
            text: 'SELECT * FROM create_loan($1, $2)',
            values: [this.user_id, this.library_id],
        };

        const result = await client.query(sql);
        return result.rows[0];
    }
};
