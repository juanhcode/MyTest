const {Router} = require('express');
const router = Router();
const permisoController = require('../../controllers/permiso.controller');
router.post('/',permisoController.crearPermiso);
module.exports = router;