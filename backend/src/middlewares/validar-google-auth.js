const { response } = require('express');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('232542879112-ekuhdvg72eavori0esvln4bodcqsfgo2.apps.googleusercontent.com');

const validarGoogleAuth = async (req, res = response, next) => {

    let token = '';
    token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se ha proporcionado un token valido'
        });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.lenth);
    }

    try {
        console.log('token google ', token);
    } catch (error) {
        console.log(err);
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });
    }
}
module.exports = {
    validarGoogleAuth
}
