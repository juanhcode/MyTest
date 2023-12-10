const seguimientoError = require('../database/models/SeguimientoError');
const crearSeguimiento = async (nuevoSeguimiento)=>{
    const seguimientoCreado = await seguimientoError.create(nuevoSeguimiento);
    return seguimientoCreado;
}

const deleteSeguimiento = async(seguimientoId)=>{
    const seguimientoDeleted = await seguimientoError.destroy({
        where:{
            id:seguimientoId
        }
    });
    return seguimientoDeleted;
}

const validationSeguimientoExistsById = async (id) => {
    const seguimiento = await seguimientoError.findByPk(id);
    return seguimiento;
}


const updateSeguimiento = async(id,seguimiento)=>{
    const seguimientoUpdated = await seguimientoError.update(seguimiento,{
        where:{
            id,
        }
    })
    return seguimientoUpdated;
}

const getAllSeguimientosByCaso = async(idCaso)=>{
    const casos = await seguimientoError.findAll({
        where:{
            caso_de_prueba_id:idCaso,
        }
    })
    return casos;
}

module.exports = {
    crearSeguimiento,
    deleteSeguimiento,
    validationSeguimientoExistsById,
    updateSeguimiento,
    getAllSeguimientosByCaso
}