// Import du CoreDatamapper, class parente des Models
const CoreDatamapper = require('./coreDatamapper');
// Import du client
const client = require('../config/db');

/**
 * "Library" Model Object
 * @typedef {object} LibraryModel
 * @property {number} user_id - User id
 * @property {number} book_id - Book id
 * @property {boolean} is_available - Availability of the book
 */

module.exports = class Library extends CoreDatamapper {
    static tableName = 'library';

    constructor(library) {
        super();
        this.user_id = library.user_id;
        this.book_id = library.book_id;
        this.is_available = library.is_available;
    }

    // eslint-disable-next-line class-methods-use-this
    static async getPersonnalLibraryDetails(id) {
        const sql = {
            text: 'SELECT * FROM personnal_library_details WHERE userId"=$1',
            values: [id],
        };
        const results = await client.query(sql);
        return results.rows[0];
    }

    // eslint-disable-next-line class-methods-use-this
    static async getUserLibraryDetails(username) {
        const sql = {
            text: 'SELECT * FROM user_library_details WHERE "user"."id"=$1',
            values: [username],
        };
        const results = await client.query(sql);
        return results.rows[0];
    }

    // eslint-disable-next-line class-methods-use-this
    static async isBookInLibrary(googleApiId) {
        const sql = {
            text: 'SELECT * FROM "book_in_library" WHERE "book"."google_api_id" = $1',
            values: [googleApiId],
        };
        const results = await client.query(sql);
        return results.rows;
    }

    static async update(isAvailable, libraryId) {
        const sql = {
            text: 'SELECT * FROM update_library($1, $2)',
            values: [isAvailable, libraryId],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }

    async insert() {
        const sql = {
            text: 'SELECT * FROM add_book_to_library($1, $2)',
            values: [this.user_id, this.book_id],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }
};
