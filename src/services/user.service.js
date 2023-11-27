const Usuario = require('../database/models/Usuario');
const bcrypt = require('bcrypt');

const createUser = async(newUser) => {
    const usuarioCreated = new Usuario(newUser);
    const salt = bcrypt.genSaltSync();
    usuarioCreated.contrasenia = bcrypt.hashSync(newUser.contrasenia, salt);
    await usuarioCreated.save();
    return usuarioCreated;
}

module.exports = {
    createUser
}