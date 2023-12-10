const { DataTypes } = require('sequelize');
const db = require('../connection');

const Permiso = db.define('permiso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
)

module.exports = Permiso    