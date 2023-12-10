const {Router} = require('express');
const router = Router();
const seguimientoController = require('../../controllers/seguimiento.controller');
const checkAuth = require('../../middlewares/auth');
router.post('/',[checkAuth],seguimientoController.crearSeguimiento);
router.delete('/:id',seguimientoController.deleteSeguimiento);
router.put('/:id',seguimientoController.updateSeguimiento);
router.get('/:id',seguimientoController.getAllSeguimientos);
module.exports = router;