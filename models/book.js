const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    authorId: { type: String, required: true },
    genre: String,
    publishedDate: Date,
    pages: Number,
    language: String,
    ISBN: String
});

module.exports = mongoose.model('Book', bookSchema);
