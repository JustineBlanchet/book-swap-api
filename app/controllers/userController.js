const { hashSync, compareSync } = require('bcrypt');
const AuthError = require('../errors/authError');
const ClientError = require('../errors/clientError');
const jwt = require('../helpers/jwt');
const User = require('../models/User');
const libraryController = require('./libraryController');

const userController = {
    // Fonction pour créer un nouvel utilisateur
    async createUser(req, res) {
        // Récupération des données utilisateur
        const {
            username,
            password,
            passwordConfirm,
            email,
        } = req.body;

        // Vérifier que les champs obligatoires ont été renseignés
        if (!username
            || !password
            || !passwordConfirm
            || !email) {
            throw new AuthError('Wrong input');
        }

        // Vérifier que le user n'existe pas déjà en BDD avec son email
        const userByEmail = await User.findOne('email', email);
        if (userByEmail) {
            throw new AuthError('Email already used');
        }

        // Vérifier que le user n'existe pas déjà avec son username
        const userByUsername = await User.findOne('username', username);
        if (userByUsername) {
            throw new AuthError('Username already used');
        }

        // Comparer les MDP
        if (password !== passwordConfirm) {
            throw new AuthError('Password and Password confirmation must match');
        }

        // Hashage du MDP
        const hashedPassword = hashSync(password, 10);

        // Création d'un nouvel utilisateur
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        // Insertion du nouvel utilisateur en BDD
        await newUser.create();
        res.status(200).json('New user created');
    },

    async login(req, res) {
        // Récupération des données utilisateur
        const { email, password } = req.body;

        // On vérifie que l'utilisateur a saisi toutes les infos
        if (!email || !password) {
            throw new AuthError('Invalid input');
        }

        // On vérifie que l'utilisateur existe bien en BDD
        const user = await User.findOne('email', email);
        if (!user) {
            throw new AuthError('This email does not exist');
        }

        // Comparaison du MDP saisi avec le hash
        const isPasswordCorrect = compareSync(password, user.password);
        if (!isPasswordCorrect) {
            throw new AuthError('Wrong password');
        }

        // Génération et envoi du token au client
        const token = jwt.create(user);
        req.user = user;

        const library = await libraryController.myLibrary(req);
        res.json({
            token,
            isLogged: true,
            library,
        });
    },

    async getProfile(req, res) {
        // Renvoyer les infos personnelles de l'utilisateur
        // Récupération de l'id de l'utilisateur
        const userId = Number(req.user.id);
        const user = await User.getProfileInformations(userId);
        res.json(user);
    },

    async updateProfile(req, res) {
        // Modifier les infos personnelles de l'utilisateur
        // Récupération de l'id de l'utilisateur
        const userId = Number(req.user.id);

        // Récupération de l'utilisateur en BDD
        const oldUser = await User.findByPk(userId);

        // Si on reçoit une information avec un nouveau MDP
        if (req.body.password) {
            // Comparaison MDP saisi et celui enregistré en BDD
            const comparePassword = compareSync(req.body.oldPassword, oldUser.password);
            if (!comparePassword) {
                throw new AuthError('Wrong password');
            }
            // Vérifier que password et passwordConfirm sont identiques
            if (req.body.password !== req.body.passwordConfirm) {
                throw new AuthError('Password must match with password confirm');
            }
            // Hashage du nouveau MDP
            req.body.password = hashSync(req.body.password, 10);
        }
        // Création d'une nouvelle instance de User en lui passant ses anciennes informations
        // Que l'on surcharge avec les nouvelles infos saisies grâce au spread operator (...)
        const updatedUser = new User({
            ...oldUser,
            ...req.body,
        });
        // Mise à jour du user
        const user = await updatedUser.update(userId);
        res.json(user);
    },

    async deleteProfile(req, res) {
        // Supprimer le profil d'un utilisateur
        // Récupération de l'id du user
        const userId = Number(req.user.id);
        // Suppression de l'utilisateur
        await User.delete(userId);
        res.status(200).json('User removed');
    },

    async getContactInfos(req, res) {
        // Récupérer les infos de contact de l'utilisateur prêteur
        // Récupérer le username de l'utilisateur
        const { username } = req.params;

        // Vérifier que l'utilisateur existe bien en BDD
        const user = await User.findOne('username', username);
        if (!user) {
            throw new ClientError('This user does not exist');
        }

        // Récupérer les infos de contact
        const contactInfos = await User.getContactInformations(username);

        res.json(contactInfos);
    },

    async getAllUsers(req, res) {
        const users = await User.findAll();
        res.json(users);
    },
};

module.exports = userController;
