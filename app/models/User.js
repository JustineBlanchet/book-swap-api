// Import du CoreDatamapper, class parente des Models
const CoreDatamapper = require('./coreDatamapper');
const client = require('../config/db');

/**
 * "User" Model Object
 * @typedef {object} UserModel
 * @property {number} id - User id
 * @property {string} firstname - User firstname
 * @property {string} lastname - User lastname
 * @property {string} username - User username
 * @property {string} email - User email
 * @property {string} tel - User phone
 * @property {string} zipcode - User postal code
 * @property {string} localisation - User localisation
 * @property {string} biography - User biographie
 * @property {string} profilePicture - User profile picture url
 * @property {string} created_at - User's creation date
 * @property {string} updated_at - User's update date
 */

/**
 * "CreateUser" Model Object
 * @typedef {object} CreateUserModel
 * @property {string} username - User pseudo
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} passwordConfirm - User password confirmation
 */

/**
 * "UpdateUser" Model Object
 * @typedef {object} UpdateUserModel
 * @property {string} username - User pseudo
 * @property {string} email - User email
 * @property {string} oldPassword - User old password
 * @property {string} password - User new password
 * @property {string} passwordConfirm - User new password confirmation
 * @property {string} firstname - User firstname
 * @property {string} lastname - User lastnameconfirmation
 * @property {string} zipcode - User postal code
 * @property {string} localisation - User localisation
 * @property {string} biography - User biographie
 * @property {string} profilePicture - User profile picture url
 */

/**
 * "LoginData" Model Object
 * @typedef {object} LoginDataModel
 * @property {string} email - User email
 * @property {string} password - User password
 */

/**
 * "Loged" Model Object
 * @typedef {object} LogedModel
 * @property {string} token - Token
 * @property {UserModel} userInfos - User personnal informations
 * @property {BookModel} books - User's books
 * @property {LoanModel} lends - User's lends
 * @property {LoanModel} borrow - User's borrow
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

    // Informations personnelles de profil
    static async getProfileInformations(id) {
        const sql = {
            text: 'SELECT * FROM "profile_informations" WHERE "id"=$1',
            values: [id],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }

    // Informations de contact au moment de l'acceptation d'un prêt
    static async getContactInformations(username) {
        const sql = {
            text: 'SELECT * FROM "profile_informations" WHERE "username"=$1',
            values: [username],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }

    // Informations publiques d'un utilisateur en fonction de son username
    static async getUserInformations(username) {
        const sql = {
            text: `SELECT "id", "username", "zipcode", "localisation", "biography", "profile_picture" FROM "${this.tableName}" WHERE username=$1`,
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
