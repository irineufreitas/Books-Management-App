const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getBooks = async (req, res) => {
    /* #swagger.tags = ['Books']
       #swagger.description = 'Get all books' */
    try {
        const result = await mongodb.getDatabase().collection('books').find();
        const books = await result.toArray();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve books', error: err });
    }
};

const getSingle = async (req, res) => {
    /* #swagger.tags = ['Books']
       #swagger.description = 'Get a book by ID' */
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('books').findOne({ _id: bookId });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve Book', error: err });
    }
};

const addBook = async (req, res) => {
    /* #swagger.tags = ['Books']
       #swagger.description = 'Add a new book' */
    try {
        // Extract fields from request body
        const { title, author, genre, publishedDate, pages, language, ISBN } = req.body;

        // Create a new Book object
        const newBook = {
            title,
            author,
            genre,
            publishedDate,
            pages,
            language,
            ISBN
        };
        const response = await mongodb.getDatabase().collection('books').insertOne(newBook);
        if (response.acknowledged) {
            res.status(201).json({
                message: 'Book added successfully',
                bookId: response.insertedId
            });
        } else {
            res.status(500).json({ message: 'Failed to add book' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Some error occurred while adding the book', error: err });
    }
};

const updateBook = async (req, res) => {
    /* #swagger.tags = ['Books']
       #swagger.description = 'Update a book by ID' */
    try {
        const bookId = new ObjectId(req.params.id); // Convert ID string to ObjectId
        const { title, author, genre, publishedDate, pages, language, ISBN } = req.body; // Extract fields from request body

        const updatedBook = {
            title,
            author,
            genre,
            publishedDate,
            pages,
            language,
            ISBN
        };

        const response = await mongodb.getDatabase().collection('books').updateOne(
            { _id: bookId }, // Filter to find the book by its ID
            { $set: updatedBook } // Update with the new book data
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Book updated successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        console.error('Failed to update book:', err);
        res.status(500).json({ message: 'Failed to update book', error: err });
    }
};


const deleteBook = async (req, res) => {
    /* #swagger.tags = ['Books']
       #swagger.description = 'Delete a book by ID' */
    try {
        const bookId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('books').deleteOne({ _id: bookId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Some error occurred while deleting the book', error: err });
    }
};

module.exports = { getBooks, getSingle, addBook, updateBook, deleteBook };



