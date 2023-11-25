const { DataTypes } = require('sequelize');
const db = require('../connection');
const Usuario = require('./Usuario');


const CasoPrueba = db.define('casoPrueba', {
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
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
)

CasoPrueba.belongsTo(Usuario, {foreignKey:'id'});

module.exports = CasoPrueba