const reportServices = require('../services/report.service');

const getReportsXTestCase = async (req, res) => {
    const get = await reportServices.getReportXTestCase();
    res.json(get);
}

const createReport = async (req,res) => {
    const {body} = req;

    try {
        const report = await reportServices.createReport(body);
        res.status(201).json({
            report,
            msg: 'Informe creado con exito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        }) 
    }
}

const updateReport = async (req,res) => {
    const {id} = req.params;
    const {body} = req;

    try {
        await reportServices.updateReport(body, id);
        res.status(200).json({
            msg: 'Informe actualizado con exito'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const deleteReport = async (req,res) => {
    const {id} = req.params;
    
    try {
        await reportServices.deleteReport(id);
        res.status(200).json({
            msg: `Informe con el id ${id} ha sido eliminado`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

module.exports = {
    createReport,
    getReportsXTestCase,
    updateReport,
    deleteReport
}