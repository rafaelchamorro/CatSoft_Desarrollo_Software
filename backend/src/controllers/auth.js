const { response } = require('express');

const validarUsuarioGoogle = async (req, resp = response) =>{
    resp.json({
        ok: true,
        msg: 'Validar usuario logueado con google'
    });
}