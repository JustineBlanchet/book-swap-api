const Book = require('../../models/Book');
const Library = require('../../models/Library');

const bookController = {
    async getBooks(_, res) {
        // Récupérer les derniers livres ajoutés sur par les utilisateurs
        const books = await Book.getLastBooks();
        res.json(books);
    },

    async getUsersByBook(req, res) {
        // Récupérer tous les utilisateurs possédant un livre
        // Récupération du numéro ISBN
        const { isbn } = req.params;
        const users = await Library.isBookInLibrary(isbn);
        res.json(users);
    },

};

module.exports = bookController;
