const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateBook, validateId } = require('../middleware/validate');

// Retrieve all books
router.get('/', bookController.getBooks);

// Get a book by ID
router.get('/:id', validateId, bookController.getSingle);

// Add a new book
router.post('/', bookController.addBook);

// Update a book by ID
router.put('/:id', validateId, validateBook, bookController.updateBook);

// Delete a book by ID
router.delete('/:id', validateId, bookController.deleteBook);

module.exports = router;
