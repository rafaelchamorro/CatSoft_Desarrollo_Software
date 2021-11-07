const { Router } = require('express');
const router = Router();

const { getUsers, postUsers, getIDUsers, putUsers, deleteUsers } = require('../controllers/users.controller')


router.route('/')
    .get(getUsers)
    .post(postUsers)


router.route('/:id')
    .get(getIDUsers)
    .put(putUsers)
    .delete(deleteUsers)


module.exports = router;