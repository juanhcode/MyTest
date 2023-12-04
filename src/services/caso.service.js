const Caso = require('../database/models/CasoPrueba');
const faker = require('@faker-js/faker');
const crearCaso = async (nuevoCaso)=>{
    const casoCreado = await Caso.create(nuevoCaso);
    return casoCreado;
}

module.exports = {
    crearCaso,
}