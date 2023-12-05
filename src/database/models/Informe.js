const { DataTypes } = require('sequelize');
const db = require('../connection');

const Informe = db.define('informe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    estadistica_de_errores: {
        type: DataTypes.STRING
    },
    metricas_de_calidad: {
        type: DataTypes.STRING
    },
    cobertura_de_pruebas: {
        type: DataTypes.STRING
    },
    caso_prueba_id: {
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

Informe.belongsTo(CasoPrueba,{foreignKey:'caso_prueba_id'});

module.exports = Informe