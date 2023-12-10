const manageServices = require('../services/manage.service');

const getUserXProject = async (req, res) => {
    const getAll = await manageServices.getUserXProject();
    res.json(getAll);
}

const getProjectsByUser = async (req, res) => {
    const {id} = req.params
    const getAllProjectsByUser = await manageServices.getProjectsByUserID(id);
    res.json(getAllProjectsByUser);
}

const createManageRelation = async (req, res) => {
    const {body} = req;
    try {
        await manageServices.createManage(body);
        res.status(201).json({
            msg: 'Usuario y proyecto relacionado con exito'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const deleteManageRelation = async (req,res) => {
    const {usuario_id, proyecto_id} = req.params;
    try {
        await manageServices.deleteManage(usuario_id, proyecto_id)
        res.status(200).json({
            msg: `Usuario ${usuario_id.correo} ha sido eliminado del proyecto ${proyecto_id.nombre}.`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

module.exports = {
    getUserXProject,
    getProjectsByUser,
    createManageRelation,
    deleteManageRelation
}