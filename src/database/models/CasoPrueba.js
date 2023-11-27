const { DataTypes } = require('sequelize');
const db = require('../connection');
const Proyecto = require('./Proyecto');


const CasoPrueba = db.define('caso_de_prueba', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING
    },
    pasos_a_seguir: {
        type: DataTypes.STRING
    },
    prioridades: {
        type: DataTypes.STRING
    },
    fecha_inicio: {
        type: DataTypes.DATE
    },
    fecha_limite: {
        type: DataTypes.DATE
    },
    datos_de_prueba: {
        type: DataTypes.STRING
    },
    expectativas: {
        type: DataTypes.STRING
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Proyecto,
            key: 'id'
        }
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
)

CasoPrueba.belongsTo(Proyecto, {foreignKey:'id'});

module.exports = CasoPrueba