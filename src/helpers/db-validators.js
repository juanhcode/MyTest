const Usuario = require('../database/models/Usuario');

const duplicatedEmail = async (email = '') => {
    const emailExists = await Usuario.findOne({
        where: {
            correo: email
        }
    });

    if(emailExists){
        throw new Error (`El correo ${email} ya esta registrado`);
    }
}

module.exports = {
    duplicatedEmail
}