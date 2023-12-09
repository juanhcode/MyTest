const testResultServices = require('../services/testResult.service');

const getTestResultXTestCase = async (req, res) => {
    const getAll = await testResultServices.getTestResultsXTestCase();
    res.json(getAll);
}

const createTestResult = async(req,res) => {
    const {body} = req;

    try {
        const testResult = await testResultServices.createTestResult(body);
        res.status(201).json({
            testResult,
            msg: 'Resultado de prueba creado con exito'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const updateTestResult = async(req,res) => {

    const {id} = req.params;
    const {body} = req; 

    try {
        await testResultServices.updateTestResult(body, id);
        res.status(200).json({
            msg: 'Resultado de prueba actualizado con exito'
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const deleteTestResult = async(req,res) => {
    const {id} = req.params;

    try {
        await testResultServices.deleteTestResult(id);
        res.status(200).json({
            msg: `Resultado de prueba con el id ${id} ha sido eliminado.`
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

module.exports = {
    createTestResult,
    getTestResultXTestCase,
    updateTestResult,
    deleteTestResult
}