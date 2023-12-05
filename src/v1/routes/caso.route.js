const {Router} = require('express');
const router = Router();
const casoController = require('../../controllers/caso.controller');

router.post('/',casoController.crearCaso);
router.delete('/:id',casoController.deleteCaso);
router.put('/:id',casoController.updateCaso);
router.get('/:id',casoController.getAllCasos);


module.exports = router;