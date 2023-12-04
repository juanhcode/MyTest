const { response } = require("express")

//Obteniendo los roles que llegan desde el archivo /routes/user.js
const hasRol = (...rols) => {
    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        if (!rols.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${rols}`
            })
        }

        next();
    }
}

module.exports = hasRol