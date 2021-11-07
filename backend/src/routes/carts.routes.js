const { Router } = require('express');
const router = Router();

const { getCarts, postCarts, getIDCarts, putCarts, deleteCarts} = require('../controllers/carts.controller')


router.route('/')
    .get(getCarts)
    .post(postCarts)
    


router.route('/:id')
    .get(getIDCarts)
    .put(putCarts)
    .delete(deleteCarts)

module.exports = router;