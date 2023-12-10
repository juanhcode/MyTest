const CasoPrueba = require('../database/models/CasoPrueba');
const ResultadoPrueba = require('../database/models/ResultadoPrueba');

const createTestResult = async (newTestResult) => {
    const testResultCreation = new ResultadoPrueba(newTestResult)
    await testResultCreation.save();
    return testResultCreation
}

const getTestResultsXTestCase = async () => {
    const get = await ResultadoPrueba.findAll({
        include: CasoPrueba
    })
    return get
}

const updateTestResult = async (test, id) => {
    const testResultUpdated = await ResultadoPrueba.update(test, {
        where: {
            id: id
        }
    })
    return testResultUpdated;
}

const deleteTestResult = async (id) => {
    const testResultDeleted = await ResultadoPrueba.destroy({
        where: {
            id: id
        }
    })
    return testResultDeleted;
}

module.exports = {
    createTestResult,
    getTestResultsXTestCase,
    updateTestResult,
    deleteTestResult
}