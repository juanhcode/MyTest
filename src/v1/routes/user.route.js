const {Router} = require('express');
const router = new Router();
//Paquete para validar el email enviado en el body
const { check } = require("express-validator");

const {
    duplicatedEmail
} = require('../../helpers/db-validators')

const {
    validateFields
} = require('../../middlewares/validate-fields')

const userController = require('../../controllers/user.controller');

router.post('',
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("contrasenia", "La contrasenia es obligatoria y mas de 6 caracteres").isLength({
            min: 6,
        }),
        check("correo", "El correo no es valido").isEmail(),
        check("correo").custom(duplicatedEmail),
        validateFields
    ],
    userController.creationUser
);

module.exports = router;