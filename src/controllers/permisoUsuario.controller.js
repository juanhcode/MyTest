const permisoUsuarioServicio = require('../services/permisoUsuario.service');

const crearPermisoUsuario = async (req, res) => {
    const { usuario_id,permiso_id} = req.body;
    const PermisoUsuario = {
        usuario_id,
        permiso_id
    }
    try {
        const caso = await permisoUsuarioServicio.crearPermisoUsuario(PermisoUsuario);
        res.status(201).json({
            caso,
            msg: "creado el permiso del usuario con exito"
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor',
            error: error
        })
    }
}

const getAllPermisosByUser = async (req, res) => {
    const id = req.params.id;
    try {
        const allPermisosByUser = await permisoUsuarioServicio.getPermisosByUsuario(id);
        if(allPermisosByUser.length > 0){
            const nombresDePermisos = allPermisosByUser.map(item => item.permiso.nombre);
            res.status(200).json(nombresDePermisos);
        }else{
            res.status(200).json({ error: 'No hay permisos para el usuario' });
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los permisos del usuario' });
    }
}


const deletePermisoUsuario = async (req, res) => {
    const { id } = req.params;
    await permisoUsuarioServicio.deletePermisoUsuario(id);
    res.status(200).json({
        msg: `Permiso de usuario ha sido eliminado.`
    });
}

module.exports = {
    crearPermisoUsuario,
    getAllPermisosByUser,
    deletePermisoUsuario
}