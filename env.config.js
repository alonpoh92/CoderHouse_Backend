require('dotenv').config();

module.exports = {
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  SESSION_SECRET: process.env.SESSION_SECRET || '',
}