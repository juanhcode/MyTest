const Gestiona = require('../database/models/Gestiona')
const Proyecto = require('../database/models/Proyecto')
const Usuario = require('../database/models/Usuario')

const getUserXProject = async () => {
    const userXproject = await Gestiona.findAll({
        include: [
            {model: Usuario},
            {model: Proyecto}
        ]
    })
    return userXproject;
}

const createManage = async (newManage) => {
    const manageCreation = new Gestiona(newManage)
    await manageCreation.save();
    return manageCreation
}

const deleteManage = async (user_id, project_id) => {
    const manageDeleted = await Gestiona.destroy({
        where: {
            usuario_id: user_id,
            proyecto_id: project_id
        }
    })
    return manageDeleted;
}

module.exports = {
    getUserXProject,
    createManage,
    deleteManage
}