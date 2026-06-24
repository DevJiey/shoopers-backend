require('dotenv').config();
const mongoose = require('mongoose');

let connectionPromise;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log('Connected to MongoDB');
                return mongoose.connection;
            })
            .catch((err) => {
                connectionPromise = null;
                console.log('Connection error:', err);
                throw err;
            });
    }

    return connectionPromise;
};

module.exports = connectDB;
