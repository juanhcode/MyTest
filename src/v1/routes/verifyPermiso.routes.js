const {Router} = require('express');
const router = Router();
const checkAuth = require('../../middlewares/auth');
const verificarPermisos = require('../../middlewares/verificarPermisos');
router.get('/',[checkAuth,verificarPermisos(['Prueba'])],(req,res)=>{
    res.json({msg:"Hola"});
});
module.exports = router;