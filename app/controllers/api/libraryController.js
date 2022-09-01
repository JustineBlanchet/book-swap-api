const Library = require('../../models/Library');
const Book = require('../../models/Book');
const User = require('../../models/User');
const Loan = require('../../models/Loan');
const ClientError = require('../../errors/clientError');
const Tag = require('../../models/Tag');

const libraryController = {
    async myLibrary(req) {
        // Récupérer l'id de l'utilisateur
        const id = Number(req.user.id);
        // Récupérer les infos de profil de l'utilisateur
        const user = await User.getProfileInformations(id);
        const tags = await Tag.getTagsByUserId(id);
        // Récupérer les livres en librairie de l'utilisateur
        const libraries = await Library.findSome('user_id', id);
        const books = [];
        const lends = [];
        libraries.forEach(async (library) => {
            const book = await Book.getBookByLibraryId(library.id);
            books.push(book);
            const lend = await Loan.getLoanByLibrary(library.id);
            lends.push(...lend);
        });
        lends.filter((lend) => lend.status !== 'Terminé');
        // Emprunts utilisateur
        const borrow = await Loan.getLoanByUser(id);
        // Prêts utilisateur
        return {
            userInfos: user,
            tags,
            books,
            lends,
            borrow,
        };
    },

    async getMyLibrary(req, res) {
        const library = await libraryController.myLibrary(req);
        res.json(library);
    },

    async addBookInLibrary(req, res) {
        // Ajouter un livre à la librairie d'un utilisateur
        // Récupération du numéro ISBN du livre
        const { isbn } = req.body;
        // Récupération du userId
        const userId = Number(req.user.id);

        // Vérifier si le livre existe déjà en BDD
        const book = await Book.findOne('isbn', isbn);
        let bookId;
        if (!book) {
            const newBook = new Book(isbn);
            const insertedBook = await newBook.insert();
            bookId = insertedBook.id;
        } else {
            bookId = book.id;
        }

        // Création d'une nouvelle entrée en librairie
        const newLibrary = new Library({
            user_id: userId,
            book_id: bookId,
        });
        const insertedLibrary = await newLibrary.insert();
        res.json(insertedLibrary);
    },

    async updateBookInLibrary(req, res) {
        // Modifier le status d'un livre dans la librairie de l'utilisateur
        // Récupération de l'id de l'entrée en librairie
        const libraryId = Number(req.params.id);
        // Récupération de l'information isAvailable
        const { isAvailable } = req.body;
        // Vérifier si l'entrée en librairie existe bien
        const library = await Library.findByPk(libraryId);
        if (!library) {
            throw new ClientError('This library does not exist');
        }

        // Vérifier que le livre n'est pas emprunté
        const isLoan = await Loan.getLoanByLibrary(libraryId);
        if (isLoan.status === 'En cours' || isLoan.status === 'En attente de validation') {
            throw new ClientError("Can't update availability, loan ongoing");
        }
        // Modification de la librairie
        const updatedLibrary = await Library.update(isAvailable, libraryId);

        res.json(updatedLibrary);
    },

    async deleteBookFromLibrary(req, res) {
        // Supprimer livre de la librairie de l'utilisateur
        // Récupération de l'id de l'entrée en librairie
        const libraryId = Number(req.params.id);
        // Vérifier que l'entrée existe bien
        const library = await Library.findByPk(libraryId);
        if (!library) {
            throw new ClientError('This library does not exist');
        }
        await Library.delete(libraryId);
        res.status(200).json('Library deleted');
    },

    async getLibrary(req, res) {
        // Récupérer les infos de librairie d'un autre utiliateur
        const { username } = req.params;
        const userInfos = await User.getUserInformations(username);
        const tags = await Tag.getTagsByUserId(userInfos.id);
        const books = await Book.getBooksByUserId(userInfos.id);
        res.json({
            userInfos,
            tags,
            books,
        });
    },

    async getUserInfosByLibrary(req, res) {
        // Récupérer les infos utilisateur à partir d'une librairie
        const libraryId = Number(req.params.id);
        const userInfos = await User.getUserInfosByLibrary(libraryId);
        if (!userInfos) {
            throw new ClientError('This library does not exist');
        }
        res.json(userInfos);
    },
};

module.exports = libraryController;
