const { Router } = require('express');
const router = Router();

const { getProducts, postProducts, getIDProducts, putProducts, deleteProducts} = require('../controllers/products.controller')


router.route('/')
    .get(getProducts)
    .post(postProducts)
    


router.route('/:id')
    .get(getIDProducts)
    .put(putProducts)
    .delete(deleteProducts)



module.exports = router;