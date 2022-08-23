const Book = require('../models/Book');
const Library = require('../models/Library');

const bookController = {
    async getBooks(_, res) {
        // Récupérer les derniers livres ajoutés sur par les utilisateurs
        const books = await Book.getLastBooks();
        res.json(books);
    },

    async getUsersByBook(req, res) {
        // Récupérer tous les utilisateurs possédant un livre
        // Récupération du googleApiId
        const googleApiId = req.params.googleId;
        const users = await Library.isBookInLibrary(googleApiId);
        res.json(users);
    },
};

module.exports = bookController;
