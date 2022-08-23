const CoreDatamapper = require('./coreDatamapper');
const client = require('../config/db');

/**
 * "Book" Model Object
 * @typedef {object} BookModel
 * @property {string} google_api_id - Google API id of the book
*/

module.exports = class Book extends CoreDatamapper {
    static tableName = 'book';

    constructor(googleApiId) {
        super();
        this.google_api_id = googleApiId;
    }

    static async getLastBooks() {
        const sql = `SELECT * FROM ${this.tableName} ORDER BY "created_at" LIMIT 50`;
        const results = await client.query(sql);
        return results.rows;
    }

    static async getBookByLibraryId(libraryId) {
        const sql = {
            text: `SELECT "book"."id", "book"."google_api_id" FROM ${this.tableName} JOIN "library" ON "library"."book_id" = "book"."id" WHERE "library"."id"=$1`,
            values: [libraryId],
        };

        const results = await client.query(sql);
        return results.rows[0];
    }

    // eslint-disable-next-line class-methods-use-this
    async insert() {
        const sql = {
            text: 'SELECT * FROM insert_book($1)',
            values: [this.google_api_id],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }
};
