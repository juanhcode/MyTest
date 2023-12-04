const casoServicio = require('../services/caso.service.js');

const crearCaso = async(req,res)=>{
    const {nombre,descripcion,pasos_a_seguir,prioridades,fecha_inicio,fecha_limite,datos_de_prueba,expectativas,proyecto_id} = req.body;
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
        await casoServicio.crearCaso(nuevoCaso);
        res.status(201).json({
            msg:"caso de prueba creada con exito"
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor',
            error: error
        })
    }
}

module.exports = {
    crearCaso,
}