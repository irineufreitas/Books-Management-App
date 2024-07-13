
const { getDatabase } = require('../data/database');

const getAuthorCollection = () => {
    const db = getDatabase();
    return db.collection('authors');
};

module.exports = { getAuthorCollection };
