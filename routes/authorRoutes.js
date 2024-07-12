const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { validateId, validateAuthor } = require('../middleware/validate');

// Retrieve all authors
router.get('/', authorController.getAllAuthors);

// Get an author by ID
router.get('/:id', validateId, authorController.getSingleAuthor);

// Add a new author
router.post('/', validateAuthor ,authorController.addAuthor);

// Update an author by ID
router.put('/:id', validateId, validateAuthor, authorController.updateAuthor);

// Delete an author by ID
router.delete('/:id', validateId, authorController.deleteAuthor);

module.exports = router;
