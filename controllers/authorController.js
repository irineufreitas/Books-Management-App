const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllAuthors = async (req, res) => {
    /* #swagger.tags = ['Authors']
       #swagger.description = 'Get all authors' */
    try {
        const result = await mongodb.getDatabase().collection('authors').find();
        const authors = await result.toArray();
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve authors', error: err });
    }
};

const getSingleAuthor = async (req, res) => {
    /* #swagger.tags = ['Authors']
       #swagger.description = 'Get an author by ID' */
    try {
        const authorId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('authors').findOne({ _id: authorId });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve author', error: err });
    }
};

const addAuthor = async (req, res) => {
    /* #swagger.tags = ['Authors']
       #swagger.description = 'Add a new author' */
    try {
        // Extract fields from request body
        const { name, birthdate, nationality, biography, awards } = req.body;

        // Create a new Author object
        const newAuthor = {
            name,
            birthdate,
            nationality,
            biography,
            awards
        };

        const response = await mongodb.getDatabase().collection('authors').insertOne(newAuthor);
        if (response.acknowledged) {
            res.status(201).json({
                message: 'Author added successfully',
                authorId: response.insertedId
            });
        } else {
            res.status(500).json({ message: 'Failed to add author' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Some error occurred while adding the author', error: err });
    }
};

const updateAuthor = async (req, res) => {
    /* #swagger.tags = ['Authors']
       #swagger.description = 'Update an author by ID' */
    try {
        const authorId = new ObjectId(req.params.id); // Convert ID string to ObjectId
        const { name, birthdate, nationality, biography, awards } = req.body; // Extract fields from request body

        const updatedAuthor = {
            name,
            birthdate,
            nationality,
            biography,
            awards
        };

        const response = await mongodb.getDatabase().collection('authors').updateOne(
            { _id: authorId }, // Filter to find the author by its ID
            { $set: updatedAuthor } // Update with the new author data
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Author updated successfully' });
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    } catch (err) {
        console.error('Failed to update author:', err);
        res.status(500).json({ message: 'Failed to update author', error: err });
    }
};

const deleteAuthor = async (req, res) => {
    /* #swagger.tags = ['Authors']
       #swagger.description = 'Delete an author by ID' */
    try {
        const authorId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('authors').deleteOne({ _id: authorId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Author deleted successfully' });
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Some error occurred while deleting the author', error: err });
    }
};

module.exports = { getAllAuthors, getSingleAuthor, addAuthor, updateAuthor, deleteAuthor };
