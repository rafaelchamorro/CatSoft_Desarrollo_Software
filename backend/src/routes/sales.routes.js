const express = require('express');
const router = express.Router();

const { getSales, postSales, getIDSales, putSales, deleteSales } = require('../controllers/sales.controller')


router.route('/')
    .get(getSales)
    .post(postSales)


router.route('/:id')
    .get(getIDSales)
    .put(putSales)
    .delete(deleteSales)


module.exports = router;