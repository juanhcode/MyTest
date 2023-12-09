const { verifyToken } = require('../helpers/verify-jwt');
const { userByIDExists } = require('../helpers/db-validators')
const { getPermisosByUsuario } = require('../services/permisoUsuario.service');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        const userExists = await userByIDExists(tokenData.id);
        if (!userExists) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en la BD'
            });
        }
        if (tokenData.correo) {
            const permisosUser = await getPermisosByUsuario(tokenData.id);
            const nombresDePermisos = permisosUser.map(item => item.dataValues.permiso.nombre);
            req.miInformacion = {
                permisos: nombresDePermisos || []
            };
            req.usuario = userExists;
            next();
        } else {
            res.status(401);
            res.send({ error: "Token no valido" });
        }
    } catch (error) {
        console.log(error)
        res.status(401);
        res.send({ error: "Sin autorizacion" })
    }
}

module.exports = checkAuth