const { DataTypes } = require('sequelize');
const db = require('../connection');
const CasoPrueba = require('./CasoPrueba');

const SeguimientoError = db.define('seguimiento_de_error', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    error_priorizado: {
        type: DataTypes.STRING
    },
    nombre_error: {
        type: DataTypes.STRING,
        allowNull: false
    },
    caso_de_prueba_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CasoPrueba,
            key: 'id'
        }
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
)

SeguimientoError.belongsTo(CasoPrueba,{foreignKey:'caso_de_prueba_id'});

module.exports = SeguimientoError