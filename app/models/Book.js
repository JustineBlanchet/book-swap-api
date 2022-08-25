const CoreDatamapper = require('./coreDatamapper');
const client = require('../config/db');

/**
 * "Book" Model Object
 * @typedef {object} BookModel
 * @property {number} id - Book id
 * @property {string} isbn - ISBN number of the book
 * @property {string} created_at - Book's creation date
 * @property {string} updated_at - Book's update date
*/

module.exports = class Book extends CoreDatamapper {
    static tableName = 'book';

    constructor(isbn) {
        super();
        this.isbn = isbn;
    }

    static async getLastBooks() {
        const sql = `SELECT * FROM ${this.tableName} ORDER BY "created_at" LIMIT 50`;
        const results = await client.query(sql);
        return results.rows;
    }

    static async getBookByLibraryId(libraryId) {
        const sql = {
            text: `SELECT "book"."id", "book"."isbn" FROM ${this.tableName} JOIN "library" ON "library"."book_id" = "book"."id" WHERE "library"."id"=$1`,
            values: [libraryId],
        };

        const results = await client.query(sql);
        return results.rows[0];
    }

    static async getBooksByUserId(userId) {
        const sql = {
            text: `SELECT "book".* FROM book 
                    JOIN "library" ON "library"."book_id" = "book"."id"
                    JOIN "user" ON "user"."id" = "library"."user_id" 
                    WHERE "user"."id"=$1`,
            values: [userId],
        };
        const results = await client.query(sql);
        return results.rows;
    }

    async insert() {
        const sql = {
            text: 'SELECT * FROM insert_book($1)',
            values: [this.isbn],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }
};
