
const { getDatabase } = require('../data/database');

const getBookCollection = () => {
    const db = getDatabase();
    return db.collection('books');
};

module.exports = { getBookCollection };
