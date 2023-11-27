const userServices = require('../services/user.service');

const creationUser = async(req,res) => {
    const {body} = req;

    try {
        const usuarioCreated = await userServices.createUser(body)
        res.status(201).json({
            msg: `Usuario: ${usuarioCreated.nombre} ha sido creado correctamente`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

module.exports = {
    creationUser
}