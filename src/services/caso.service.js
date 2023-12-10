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

const updateCaso = async(id,caso)=>{
    const casoUpdated = await Caso.update(caso,{
        where:{
            id,
        }
    })
    return casoUpdated;
}

const validationCasoExistsById = async (id) => {
    const caso = await Caso.findByPk(id);
    return caso;
}

const getAllCasosByProject = async(idProject)=>{
    const casos = await Caso.findAll({
        where:{
            proyecto_id:idProject,
        }
    })
    return casos;
}

module.exports = {
    crearCaso,
    deleteCaso,
    validationCasoExistsById,
    updateCaso,
    getAllCasosByProject
}