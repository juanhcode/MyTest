const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(
    process.env.POSTGRESQL_ADDON_DB,
    process.env.POSTGRESQL_ADDON_USER,
    process.env.POSTGRESQL_ADDON_PASSWORD,
    {
        host: process.env.POSTGRESQL_ADDON_HOST,
        dialect: 'postgres',
        logging: false,
        port: 50013
    }
)

module.exports = db;