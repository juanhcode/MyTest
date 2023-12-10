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

const deletePermisoUsuario = async(usuarioId)=>{
    const permisoUsuarioDeleted = await PermisoUsuario.destroy({
        where:{
            usuario_id:usuarioId
        }
    });
    return permisoUsuarioDeleted;
}


module.exports = {
    crearPermisoUsuario,
    getPermisosByUsuario,
    deletePermisoUsuario
}