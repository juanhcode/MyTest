const {
  emailExists
} = require('../helpers/db-validators')
const bcrypt = require('bcrypt');

const { tokenSign } = require("../helpers/generateToken");

const login = async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;
    const emailValidation = await emailExists(
      correo
    );
    if (!emailValidation) {
      return res.status(404).json({
        msg: "No existe usuario con el correo: " + correo,
      });
    }
    const passwordValidation = bcrypt.compareSync(
      contrasenia,
      emailValidation.contrasenia
    );

    if (!passwordValidation) {
      return res.status(401).json({
        msg: "Contraseña incorrecta",
      });
    }
    //Generar JWT
    const token = await tokenSign(emailValidation);

    res.json({
      token,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador(algo salio mal)",
    });
  }
};


module.exports = {
  login
};
