function verificarPermisos(permisos) {
    return (req, res, next) => {
        const usuario = req.usuario;
        const permisosUsuario = req.miInformacion.permisos;
        if (!usuario) {
            return res.status(401).json({ mensaje: 'No autorizado' });
        }

        const tienePermisos = permisos.some(permiso => permisosUsuario.includes(permiso));


        if (!tienePermisos) {
            return res.status(403).json({ mensaje: 'Permiso denegado' });
        }

        next();
    };
}

module.exports = verificarPermisos