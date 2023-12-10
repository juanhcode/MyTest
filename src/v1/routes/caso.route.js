const {Router} = require('express');
const router = Router();
const casoController = require('../../controllers/caso.controller');
const checkAuth = require('../../middlewares/auth');
const verficarPermisos = require('../../middlewares/verificarPermisos');
router.post('/',[checkAuth],casoController.crearCaso);
router.delete('/:id',[checkAuth],casoController.deleteCaso);
router.put('/:id',[checkAuth],casoController.updateCaso);
router.get('/:id',[checkAuth],casoController.getAllCasos);


module.exports = router;