const { body, param, validationResult } = require('express-validator');

const validateBook = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('publishedDate').isDate().withMessage('Published date must be a valid date'),
    body('pages').isInt({ min: 1 }).withMessage('Pages must be a positive number'),
    body('language').notEmpty().withMessage('Language is required'),
    body('ISBN').notEmpty().withMessage('ISBN is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateAuthor = [
    body('name').notEmpty().withMessage('Name is required'),
    body('birthdate').isDate().withMessage('Birthdate must be a valid date'),
    body('nationality').notEmpty().withMessage('Nationality is required'),
    body('biography').notEmpty().withMessage('Biography is required'),
    body('awards').isArray().withMessage('Awards must be an array'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateId = [
    param('id').isMongoId().withMessage('Invalid ID format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateBook, validateAuthor, validateId };
