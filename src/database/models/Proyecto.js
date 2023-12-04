const { DataTypes } = require('sequelize');
const db = require('../connection');

const Proyecto = db.define('proyecto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps:false,
        freezeTableName: true
    }
)

module.exports = Proyecto