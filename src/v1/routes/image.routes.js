const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const imageControllers = require('../../controllers/image.controller');
const { verifyFile } = require('../../middlewares/verify-file');
const { allowedCollections } = require('../../helpers/allowedCollections');
const { validateFields } = require('../../middlewares/validate-fields');

router.put('/:collection/:id', [
    verifyFile,
    check('collection').custom( c => allowedCollections (c, ['user', 'testResult'])),
    validateFields
], imageControllers.updateImageCloudinary)

module.exports = router;