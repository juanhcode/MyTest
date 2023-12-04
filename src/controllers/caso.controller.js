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


const deleteCaso = async (req, res) => {

    const {id} = req.params;

    const casoExists = await libroServices.validationBookExistsById(id)
    if(!bookExists){
        return res.status(404).json({
            msg: `No existe el libro con el id ${id}`
        })
    }
    
    await libroServices.deleteBook(id);
    res.json({
        msg: `Libro con el id ${id} ha sido eliminado.`
    });
}

module.exports = {
    crearCaso,
}