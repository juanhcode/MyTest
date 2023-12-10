const {Router} = require('express');
const { check } = require("express-validator");
const authControllers = require('../../controllers/auth.controller');
const router = Router();

const {
    validateFields
} = require('../../middlewares/validate-fields')

router.post('', 
    [
        check("correo", "El correo es obligatorio").not().isEmpty(),
        check("correo", "El correo no es valido").isEmail(),
        check("contrasenia", "La contraseña es obligatoria").not().isEmpty(),
        validateFields
    ],
authControllers.login);

module.exports = router;