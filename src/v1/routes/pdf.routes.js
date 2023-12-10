const {Router} = require('express');
const router = Router();
const checkAuth = require('../../middlewares/auth');
const { check } = require("express-validator");
const pdfController = require('../../controllers/pdf.controller')
const { 
    reportByIDExistsMiddleware
} = require('../../helpers/db-validators')

router.get('/:id',[
    checkAuth,
    check('id').custom(reportByIDExistsMiddleware)
], pdfController.buildPdf)

module.exports = router;    