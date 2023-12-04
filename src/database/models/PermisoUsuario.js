const { DataTypes } = require('sequelize');
const db = require('../connection');
const Usuario = require('./Usuario');
const Permiso = require('./Permiso');

const PermisoUsuario = db.define('permiso_usuario', {
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    permiso_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
},
    {
        timestamps: false,
        freezeTableName: true
    }
)

PermisoUsuario.belongsTo(Usuario,{foreignKey: 'id'});
PermisoUsuario.belongsTo(Permiso,{foreignKey: 'id'})

module.exports = PermisoUsuario