const CoreDatamapper = require('./coreDatamapper');
// Import du client
const client = require('../config/db');

/**
 * "Tag" Model Object
 * @typedef {object} TagModel
 * @property {string} label - Label
 *
*/
module.exports = class Tag extends CoreDatamapper {
    static tableName = 'tag';

    // création d'un nouveau Tag
    constructor(tag) {
        super();
        this.label = tag.label;
    }

    static async userHasTag(tagId, userId) {
        const sql = {
            text: 'SELECT * FROM "user_has_tag" WHERE "tag_id"=$1 AND "user_id"=$2',
            values: [tagId, userId],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }

    static async addTagToUser(tagId, userId) {
        const sql = {
            text: 'SELECT * FROM add_tag_to_user($1, $2)',
            values: [tagId, userId],
        };
        const result = await client.query(sql);
        return result.rows[0];
    }

    static async removeTagFromUser(tagId, userId) {
        const sql = {
            text: 'DELETE FROM "user_has_tag" WHERE "tag_id"=$1 AND "user_id"=$2',
            values: [tagId, userId],
        };
        await client.query(sql);
    }
};
