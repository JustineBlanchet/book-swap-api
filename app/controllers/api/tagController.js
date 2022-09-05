const Tag = require('../../models/Tag');
const ClientError = require('../../errors/clientError');

const tagController = {

    async getTags(_, res) {
        // Récupérer tous les tags
        const tags = await Tag.findAll();
        res.json(tags);
    },

    async addTagToUser(req, res) {
        // Ajouter un tag à un utilisateur
        // Vérifier que le tag existe bien en BDD
        const tagId = Number(req.body.tagId);
        const tag = await Tag.findByPk(tagId);
        if (!tag) {
            throw new ClientError('This tag does not exist');
        }

        // Récupération du UserId
        const userId = Number(req.user.id);

        // Vérifier que l'association n'existe pas déjà en BDD
        const userHasTag = await Tag.userHasTag(tagId, userId);
        if (userHasTag) {
            throw new ClientError('Association between tag and user already exist');
        }

        const addTagToUser = await Tag.addTagToUser(tagId, userId);
        res.json(addTagToUser);
    },

    async removeTagFromUser(req, res) {
        // Supprimer un tag d'un utilisateur
        // Récupération de l'id du tag à supprimer
        const tagId = Number(req.params.id);

        // Récupération de l'id du user
        const userId = Number(req.user.id);

        // On vérifie que l'association existe bien en BDD
        const userHasTag = await Tag.userHasTag(tagId, userId);
        if (!userHasTag) {
            throw new ClientError('This association between tag and user does not exist');
        }

        await Tag.removeTagFromUser(tagId, userId);
        res.status(200).json('Association removed');
    },

};

module.exports = tagController;
