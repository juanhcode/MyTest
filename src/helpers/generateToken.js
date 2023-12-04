const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenSign = async (usuario)=>{
    const {id, nombre, correo, foto, rol} = usuario;
    return jwt.sign(
        {
            id,
            nombre,
            correo,
            foto,
            rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"6h"
        }
    );
}

module.exports = {
    tokenSign
}