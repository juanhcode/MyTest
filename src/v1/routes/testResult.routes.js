const {Router} = require('express');
const { check } = require("express-validator");
const router = Router();
const testResultController = require('../../controllers/testResult.controller');
const checkAuth = require('../../middlewares/auth');
const hasRol = require ('../../middlewares/validate-rol')
const {validateFields} = require('../../middlewares/validate-fields')
const { 
    testResultByIDExistsMiddleware
} = require('../../helpers/db-validators')

router.get('', [
    checkAuth
], testResultController.getTestResultXTestCase);

router.post('', [
    checkAuth,
    hasRol('Administrador'),
    validateFields
], testResultController.createTestResult)

router.put('/:id', [
    checkAuth,
    check("id").custom(testResultByIDExistsMiddleware),
    hasRol('Administrador'),
    validateFields
], testResultController.updateTestResult)

router.delete('/:id', [
    checkAuth,
    check('id').custom(testResultByIDExistsMiddleware),
    hasRol('Administrador'),
    validateFields
], testResultController.deleteTestResult)

module.exports = router