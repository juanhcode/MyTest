const Permiso = require('../database/models/Permiso');
const crearPermiso = async (nuevoPermiso)=>{
    const permisoCreado = await Permiso.create(nuevoPermiso);
    return permisoCreado;
}

module.exports = {
    crearPermiso
}