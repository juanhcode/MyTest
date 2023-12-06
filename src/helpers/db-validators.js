const Usuario = require('../database/models/Usuario');
const Proyecto = require('../database/models/Proyecto');
const ResultadoPrueba = require('../database/models/ResultadoPrueba');

//==================Validaciones de usuario=============================

const userByIDExists = async (id) => {
    const userExists = await Usuario.findByPk(id)
    return userExists;
}

const userByIDExistsMiddleware = async (id) => {
    const userExists = await Usuario.findByPk(id)
    if (!userExists) {
        throw new Error (`El usuario con id: ${id}  no se encuentra en la BD`);
    }
}

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

const emailExists = async(email) => {
    const emailValidation = await Usuario.findOne({
        where: {
            correo: email
        }
    })
    return emailValidation;
}

//==========================================================================

//===================Validaciones de proyecto===============================

const projectByIDExists = async (id) => {
    const projectExists = await Proyecto.findByPk(id)
    if (!projectExists) {
        throw new Error (`El proyecto con id: ${id}  no se encuentra en la BD`);
    }
}

//==========================================================================

//====================Validaciones de resultado de prueba===================
const testResultByIDExists = async (id) => {
    const testResultExists = await ResultadoPrueba.findByPk(id)
    return testResultExists;
}

const testResultByIDExistsMiddleware = async (id) => {
    const testResultExists = await ResultadoPrueba.findByPk(id)
    if (!testResultExists) {
        throw new Error (`El resultado de prueba con id: ${id}  no se encuentra en la BD`);
    }
}

//==========================================================================

module.exports = {
    userByIDExists,
    userByIDExistsMiddleware,
    duplicatedEmail,
    emailExists,
    projectByIDExists,
    testResultByIDExistsMiddleware,
    testResultByIDExists
}