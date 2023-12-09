const {Router} = require('express');
const { check } = require("express-validator");
const router = Router();
const reportController = require('../../controllers/report.controller')
const checkAuth = require('../../middlewares/auth');
const hasRol = require ('../../middlewares/validate-rol')
const {validateFields} = require('../../middlewares/validate-fields')
const { 
    reportByIDExistsMiddleware
} = require('../../helpers/db-validators')

router.get('', [
    checkAuth
], reportController.getReportsXTestCase);

router.post('', [
    checkAuth,
    hasRol('Administrador'),
    validateFields
], reportController.createReport)

router.put('/:id', [
    checkAuth,
    check("id").custom(reportByIDExistsMiddleware),
    hasRol('Administrador'),
    validateFields
], reportController.updateReport)

router.delete('/:id', [
    checkAuth,
    check('id').custom(reportByIDExistsMiddleware),
    hasRol('Administrador'),
    validateFields
], reportController.deleteReport)

module.exports = router