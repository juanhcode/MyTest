const { DataTypes } = require('sequelize');
const db = require('../connection');
const Usuario = require('./Usuario');
const Proyecto = require('./Proyecto');

const Gestiona = db.define('gestiona', {
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
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

Gestiona.belongsTo(Usuario,{foreignKey:'usuario_id'});
Gestiona.belongsTo(Proyecto,{foreignKey:'proyecto_id'});

module.exports = Gestiona