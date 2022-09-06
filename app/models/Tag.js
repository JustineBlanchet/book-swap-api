const CoreDatamapper = require('./coreDatamapper');
// Import du client
const client = require('../config/db');

/**
 * "Tag" Model Object
 * @typedef {object} TagModel
 * @property {number} id - Identifier
 * @property {string} label - Label
 * @property {string} created_at - Tag's creation date
 * @property {string} updated_at - Tag's update date
 *
*/

/**
 * "UpdateTag" Model Object
 * @typedef {object} UpdateTagModel
 * @property {string} tagId - Tag id
 */

module.exports = class Tag extends CoreDatamapper {
    static tableName = 'tag';

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

    static async getTagsByUserId(userId) {
        const sql = {
            text: `SELECT "tag"."id", "tag"."label", "tag"."color", "tag"."hover" FROM "tag"
                    JOIN "user_has_tag" ON "user_has_tag"."tag_id" = "tag"."id"
                    WHERE "user_has_tag"."user_id"=$1`,
            values: [userId],
        };
        const results = await client.query(sql);
        return results.rows;
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
