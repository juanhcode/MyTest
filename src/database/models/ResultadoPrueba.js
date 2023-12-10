const { DataTypes } = require('sequelize');
const db = require('../connection');
const CasoPrueba = require('./CasoPrueba');

const ResultadoPrueba = db.define('resultado_prueba', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    casos_no_ejecutados: {
        type: DataTypes.STRING
    },
    fallos: {
        type: DataTypes.STRING
    },
    exitos: { 
        type: DataTypes.STRING
    },
    foto: {
        type: DataTypes.STRING
    },
    registros: {
        type: DataTypes.STRING
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
        timestamps: false,
        freezeTableName: true
    }
)

ResultadoPrueba.belongsTo(CasoPrueba,{foreignKey:'caso_de_prueba_id'});

module.exports = ResultadoPrueba