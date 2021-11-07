const { Router } = require('express');
const {  validarUsuarioGoogle } = require('../controllers/auth');
const { validarGoogleAuth } = require('../middlewares/validar-google-auth');
const router = Router();


router.post('/google/login', function(req, res){
    validarGoogleAuth, validarUsuarioGoogle
});


module.exports = router;
