const {Router} = require('express');
const router = Router();
const permisoUsuarioController = require('../../controllers/permisoUsuario.controller');
const checkAuth = require('../../middlewares/auth');
router.post('/',permisoUsuarioController.crearPermisoUsuario);
router.get('/:id',permisoUsuarioController.getAllPermisosByUser);
router.delete('/:id',[checkAuth],permisoUsuarioController.deletePermisoUsuario);
module.exports = router;