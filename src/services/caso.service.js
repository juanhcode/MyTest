const Caso = require('../database/models/CasoPrueba');

const crearCaso = async (nuevoCaso)=>{
    console.log(nuevoCaso);
    const casoCreado = await Caso.create(nuevoCaso);
    return casoCreado;
}

module.exports = {
    crearCaso,
}