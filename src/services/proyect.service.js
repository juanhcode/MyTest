const Proyecto = require('../database/models/Proyecto');

const getWithPagination =  async (options)=> {
    const { count, rows } = await Proyecto.findAndCountAll({ options});
    return {count, rows};
}

const createProject = async (newProject) => {
    const projectCreated = new Proyecto(newProject);
    await projectCreated.save();
    return projectCreated;
}

const updateProject = async (project, id) => {
    const projectUpdated = await Proyecto.update(project, {
        where: {
            id: id
        }
    })
    return projectUpdated;
}

const deleteProject = async (id) => {
    const projectDeleted = await Proyecto.destroy({
        where: {
            id: id
        }
    })
    return projectDeleted;
}

module.exports = {
    getWithPagination,
    createProject,
    updateProject,
    deleteProject
}