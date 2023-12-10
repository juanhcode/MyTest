const seguimientoService = require('../services/seguimiento.service');

const crearSeguimiento = async (req, res) => {
    const { error_priorizado, nombre_error, caso_de_prueba_id} = req.body;
    const nuevoSeguimiento = {
        error_priorizado,
        nombre_error,
        caso_de_prueba_id
    }
    try {
        const seguimiento = await seguimientoService.crearSeguimiento(nuevoSeguimiento);
        res.status(201).json({
            seguimiento,
            msg: "Seguimiento creado con exito"
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor',
            error: error
        })
    }
}


const deleteSeguimiento = async (req, res) => {

    const { id } = req.params;
    const seguimientoExists = await seguimientoService.validationSeguimientoExistsById(id);
    if (!seguimientoExists) {
        return res.status(404).json({
            msg: `No existe el seguimiento con el id ${id}`
        })
    }
    await seguimientoService.deleteSeguimiento(id);
    res.status(200).json({
        msg: `Seguimiento con el id ${id} ha sido eliminado.`
    });
}

const updateSeguimiento = async (req, res) => {
    const id = req.params.id;
    const { error_priorizado, nombre_error, caso_de_prueba_id} = req.body;
    const nuevoSeguimiento = {
        error_priorizado,
        nombre_error,
        caso_de_prueba_id
    }
    const casoExists = await seguimientoService.validationSeguimientoExistsById(id);
    if (!casoExists) {
        return res.status(404).json({
            msg: `No existe el seguimiento con el id ${id}`
        })
    }
    await seguimientoService.updateSeguimiento(id, nuevoSeguimiento);
    res.status(200).json({
        msg: `Seguimiento con el id ${id} ha sido actualizado.`
    });
}

const getAllSeguimientos = async (req, res) => {
    const id = req.params.id;
    try {
        const allCasos = await seguimientoService.getAllSeguimientosByCaso(id);
        if(allCasos.length > 0){
            res.status(200).json(allCasos);
        }else{
            res.status(200).json({ error: 'No hay seguimientos para este caso' });
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los seguimientos' });
    }
}

module.exports = {
    crearSeguimiento,
    deleteSeguimiento,
    updateSeguimiento,
    getAllSeguimientos
}