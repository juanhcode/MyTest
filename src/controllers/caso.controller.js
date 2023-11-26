const casoServicio = require('../services/caso.service');

const crearCaso = async(req,res)=>{
    const {nombre,descripcion,pasos_a_seguir,prioridades,fecha_inicio,fecha_limite,datos_de_prueba,expectativas,usuario_id} = req.body;
    const nuevoCaso = {
        nombre,
        descripcion,
        pasos_a_seguir,
        prioridades,
        fecha_inicio,
        fecha_limite,
        datos_de_prueba,
        expectativas,
        usuario_id
    }
    try {
        const casoCreado = await casoServicio.crearCaso(nuevoCaso);
        res.status(201).json(casoCreado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor',
            error: error
        })
    }
}

module.exports = {
    crearCaso,
}