const permisoServicio = require('../services/permiso.service');

const crearPermiso = async (req, res) => {
    const { nombre} = req.body;
    const Permiso = {
        nombre
    }
    try {
        const caso = await permisoServicio.crearPermiso(Permiso);
        res.status(201).json({
            caso,
            msg: "Permiso creado con exito"
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor',
            error: error
        })
    }
}

module.exports = {
    crearPermiso
}