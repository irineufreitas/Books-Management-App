const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfBirth: Date,
    nationality: String
});

module.exports = mongoose.model('Author', authorSchema);
