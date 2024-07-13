

const { getDatabase } = require('../data/database');
const bcrypt = require('bcrypt');

const getUserCollection = () => {
    const db = getDatabase();
    return db.collection('users');
};

const createUser = async (userData) => {
    const { username, email, password, googleId } = userData;

    try {
        if (!password || typeof password !== 'string') {
            throw new Error('Invalid password');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            username,
            email,
            password: hashedPassword,
            googleId,
            createdAt: new Date()
        };

        const collection = getUserCollection();
        await collection.insertOne(user);
    } catch (err) {
        throw new Error(`Error creating user: ${err.message}`);
    }
};

const findUserByEmail = async (email) => {
    const collection = getUserCollection();
    return collection.findOne({ email });
};

module.exports = { createUser, findUserByEmail };
