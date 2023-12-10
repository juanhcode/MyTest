const casoServicio = require('../services/caso.service.js');

const crearCaso = async (req, res) => {
    const { nombre, descripcion, pasos_a_seguir, prioridades, fecha_inicio, fecha_limite, datos_de_prueba, expectativas, proyecto_id } = req.body;
    const nuevoCaso = {
        nombre,
        descripcion,
        pasos_a_seguir,
        prioridades,
        fecha_inicio,
        fecha_limite,
        datos_de_prueba,
        expectativas,
        proyecto_id
    }
    try {
        const caso = await casoServicio.crearCaso(nuevoCaso);
        res.status(201).json({
            caso,
            msg: "caso de prueba creada con exito"
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor',
            error: error
        })
    }
}


const deleteCaso = async (req, res) => {

    const { id } = req.params;
    const casoExists = await casoServicio.validationCasoExistsById(id);
    if (!casoExists) {
        return res.status(404).json({
            msg: `No existe el caso con el id ${id}`
        })
    }
    await casoServicio.deleteCaso(id);
    res.status(200).json({
        msg: `Caso con el id ${id} ha sido eliminado.`
    });
}

const updateCaso = async (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, pasos_a_seguir, prioridades, fecha_inicio, fecha_limite, datos_de_prueba, expectativas, proyecto_id } = req.body;
    const nuevoCaso = {
        nombre,
        descripcion,
        pasos_a_seguir,
        prioridades,
        fecha_inicio,
        fecha_limite,
        datos_de_prueba,
        expectativas,
        proyecto_id
    }
    const casoExists = await casoServicio.validationCasoExistsById(id);
    if (!casoExists) {
        return res.status(404).json({
            msg: `No existe el caso con el id ${id}`
        })
    }
    await casoServicio.updateCaso(id, nuevoCaso);
    res.status(200).json({
        msg: `Caso con el id ${id} ha sido actualizado.`
    });
}

const getAllCasos = async (req, res) => {
    const id = req.params.id;
    try {
        const allCasos = await casoServicio.getAllCasosByProject(id);
        if(allCasos.length > 0){
            res.status(200).json(allCasos);
        }else{
            res.status(200).json({ error: 'No hay casos de prueba para este proyecto' });
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los casos de prueba' });
    }
}

module.exports = {
    crearCaso,
    deleteCaso,
    updateCaso,
    getAllCasos
}