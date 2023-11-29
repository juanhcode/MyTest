const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(
    process.env.POSTGRESQL_ADDON_DB,
    process.env.POSTGRESQL_ADDON_USER,
    process.env.POSTGRESQL_ADDON_PASSWORD,
    {
        host: process.env.POSTGRESQL_ADDON_HOST,
        dialect: 'postgres',
        loggin: false,
        port: process.env.POSTGRESQL_ADDON_PORT
    }
)

module.exports = db;