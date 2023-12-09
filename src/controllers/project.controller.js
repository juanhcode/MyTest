const projectServices = require('../services/project.service.js');

const getProjects = async (req, res) => {
    const {page = 0, size = 5} = req.query;

    let options = {
        limit: +size,
        offset: (+page) * (+size)
    }

    const pagination = await projectServices.getWithPagination(options);

    res.json({
        total: pagination.count,
        projects: pagination.rows
    })
};

const createProject = async(req,res) => {
    const {body} = req;

    try {
        const project = await projectServices.createProject(body);
        res.status(201).json({
            project,
            msg: 'Proyecto creado con exito'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const updateProject = async(req,res) => {

    const {id} = req.params;
    const {body} = req; 
    console.log(id);

    try {
        await projectServices.updateProject(body, id);
        res.status(200).json({
            msg: 'Proyecto actualizado con exito'
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const deleteProject = async(req,res) => {
    const {id} = req.params;

    try {
        await projectServices.deleteProject(id);
        res.status(200).json({
            msg: `Proyecto con el id ${id} ha sido eliminado.`
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
}