const cartsCtrl = {};

const Cart = require('../models/cart');

cartsCtrl.getCarts = (async (req, res) => {
    const carts = await Cart.find();
    res.json(carts);
});

cartsCtrl.postCarts = (async (req,res) => {
    const { ProductID, unit, unitPrice, productDescription, saleID } = req.body;
    const carts =new Cart({ProductID, unit, unitPrice, productDescription, saleID});
    await carts.save();
    res.json({status: 'Cart Save'});
});

cartsCtrl.getIDCarts = (async (req, res) => {
    const carts = await Cart.findById(req.params.id);
    res.json(carts);
});

cartsCtrl.putCarts = (async (req,res) =>{
    const { ProductID, unit, unitPrice, productDescription, saleID } = req.body;
    const newCart = {ProductID, unit, unitPrice, productDescription, saleID}
    await Cart.findByIdAndUpdate(req.params.id, newCart);
    res.json({status: 'Cart Update'});
});

cartsCtrl.deleteCarts = (async (req,res) =>{
    await Cart.findByIdAndRemove(req.params.id);
    res.json({status: 'Cart Deleted'});
});

module.exports = cartsCtrl;