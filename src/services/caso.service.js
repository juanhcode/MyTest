const Caso = require('../database/models/CasoPrueba');
const crearCaso = async (nuevoCaso)=>{
    const casoCreado = await Caso.create(nuevoCaso);
    return casoCreado;
}

const deleteCaso = async(casoId)=>{
    const casoDeleted = await Caso.destroy({
        where:{
            id:casoId
        }
    });
    return casoDeleted;
}

module.exports = {
    crearCaso,
    deleteCaso
}