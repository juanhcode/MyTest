const {Router} = require('express');
const { check } = require("express-validator");
const router = Router();
const projectController = require('../../controllers/project.controller');
const checkAuth = require('../../middlewares/auth');
const hasRol = require ('../../middlewares/validate-rol')
const {validateFields} = require('../../middlewares/validate-fields')
const { projectByIDExists } = require('../../helpers/db-validators')

router.get('', [
    checkAuth
], projectController.getProjects)

router.post('' , [
    checkAuth,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    hasRol('Administrador'),
    validateFields
], projectController.createProject)

router.put('/:id', [
    checkAuth,
    check("id").custom(projectByIDExists),
    hasRol('Administrador'),
    validateFields
], projectController.updateProject)

router.delete('/:id', [
    checkAuth,
    check("id").custom(projectByIDExists),
    hasRol('Administrador'),
    validateFields
], projectController.deleteProject)

module.exports = router