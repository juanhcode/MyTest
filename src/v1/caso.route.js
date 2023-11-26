const {Router} = require('express');
const router = Router();
const casoController = require('../controllers/caso.controller');

router.post('/',casoController.crearCaso);

module.exports = router;