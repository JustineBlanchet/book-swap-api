// Import du CoreDatamapper, class parente des Models
const CoreDatamapper = require('./coreDatamapper');
// Import du client
const client = require('../config/db');

/**
 * "Library" Model Object
 * @typedef {object} LibraryModel
 * @property {number} id - Library id
 * @property {number} user_id - User id
 * @property {number} book_id - Book id
 * @property {boolean} is_available - Availability of the book
 * @property {string} created_at - Library's creation date
 * @property {string} updated_at - Library's update date
 */

/**
 * "PersonnalLibrary" Model Object
 * @typedef {object} PersonnalLibraryModel
 * @property {UserModel} userInfos - User personnal informations
 * @property {BookModel} books - User's books
 * @property {LoanModel} lends - User's lends
 * @property {LoanModel} borrow - User's borrow
 */

/**
 * "AddLibrary" Model Object
 * @typedef {object} AddLibraryModel
 * @property {string} isbn - Book's ISBN number
 */

/**
 * "UpdateLibrary" Model Object
 * @typedef {object} UpdateLibraryModel
 * @property {boolean} isAvailable - Availability of the book
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
            text: 'SELECT * FROM user_library_details WHERE username=$1',
            values: [username],
        };
        const results = await client.query(sql);
        return results.rows[0];
    }

    // eslint-disable-next-line class-methods-use-this
    static async isBookInLibrary(isbn) {
        const sql = {
            text: 'SELECT * FROM "book_in_library" WHERE "isbn" = $1',
            values: [isbn],
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
