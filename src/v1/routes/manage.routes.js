const {Router} = require('express');
const { check } = require("express-validator");
const router = Router();
const manageController = require('../../controllers/manage.controller');
const checkAuth = require('../../middlewares/auth');
const hasRol = require ('../../middlewares/validate-rol')
const {validateFields} = require('../../middlewares/validate-fields')
const { 
    projectByIDExists,
    userByIDExistsMiddleware
} = require('../../helpers/db-validators')

router.get('', [
    checkAuth
], manageController.getUserXProject);

router.post('', [
    checkAuth,
    check('usuario_id','el id del usuario es obligatorio').not().isEmpty(),
    check('proyecto_id','el id del proyecto es obligatorio').not().isEmpty(),
    check('usuario_id').custom(userByIDExistsMiddleware),
    check('proyecto_id').custom(projectByIDExists),
    hasRol('Administrador'),
    validateFields
], manageController.createManageRelation)

router.delete('/:usuario_id/:proyecto_id', [
    checkAuth,
    check('usuario_id').custom(userByIDExistsMiddleware),
    check('proyecto_id').custom(projectByIDExists),
    hasRol('Administrador'),
    validateFields
], manageController.deleteManageRelation)

module.exports = router