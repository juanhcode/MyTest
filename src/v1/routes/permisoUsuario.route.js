const {Router} = require('express');
const router = Router();
const permisoUsuarioController = require('../../controllers/permisoUsuario.controller');
router.post('/',permisoUsuarioController.crearPermisoUsuario);
router.get('/:id',permisoUsuarioController.getAllPermisosByUser);
module.exports = router;