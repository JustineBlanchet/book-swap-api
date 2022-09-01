const express = require('express');

const bookRouter = require('./book');
const libraryRouter = require('./library');
const loanRouter = require('./loan');
const tagRouter = require('./tag');
const userRouter = require('./user');

const router = express.Router();

router.use(bookRouter);
router.use(libraryRouter);
router.use(loanRouter);
router.use(tagRouter);
router.use(userRouter);

module.exports = router;
