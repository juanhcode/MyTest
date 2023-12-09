const Permiso = require('../database/models/Permiso');
const PermisoUsuario = require('../database/models/PermisoUsuario');
const crearPermisoUsuario = async (nuevoPermisoUusario) => {
    const casoCreado = await PermisoUsuario.create(nuevoPermisoUusario);
    return casoCreado;
}

const getPermisosByUsuario = async (idUsuario) => {
    const getAllPermisos = await PermisoUsuario.findAll({
        where:{
            usuario_id:idUsuario
        },
        include: [
            {
                model: Permiso,
                attributes: ['nombre'],
            }
        ]
    })
    return getAllPermisos;
}


module.exports = {
    crearPermisoUsuario,
    getPermisosByUsuario
}