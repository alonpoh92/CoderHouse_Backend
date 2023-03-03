const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    SERVER_PORT: process.env.SERVER_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD
}