// Import du CoreDatamapper, class parente des Models
const CoreDatamapper = require('./coreDatamapper');
const client = require('../config/db');

/**
 * "User" Model Object
 * @typedef {object} UserModel
 * @property {string} firstname - User firstname
 * @property {string} lastname - User lastname
 * @property {string} username - User username
 * @property {string} password - User password
 * @property {string} email - User email
 * @property {number} tel - User tel
 * @property {string} zipcode - User postal code
 * @property {string} localisation - User localisation
 * @property {string} biography - User biographie
 * @property {string} profilePicture - User profile picture url
 */

module.exports = class User extends CoreDatamapper {
    static tableName = 'user';

    constructor(user) {
        super();
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        this.zipcode = user.zipcode;
        this.localisation = user.localisation;
        this.tel = user.tel;
        this.biography = user.biography;
        this.profile_picture = user.profile_picture;
    }

    static async getProfileInformations(id) {
        const sql = {
            text: 'SELECT * FROM "profile_informations" WHERE "id"=$1',
            values: [id],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }

    static async getContactInformations(username) {
        const sql = {
            text: 'SELECT * FROM "profile_informations" WHERE "username"=$1',
            values: [username],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }

    async create() {
        const sql = {
            text: 'SELECT * FROM insert_user($1)',
            values: [this],
        };
        const results = await client.query(sql);
        return results.rows[0];
    }

    async update(id) {
        const sql = {
            text: 'SELECT * FROM update_user($1, $2)',
            values: [this, id],
        };
        const results = await client.query(sql);
        return results.rows[0];
    }
};
