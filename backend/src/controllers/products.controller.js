const productsCtrl = {};

const Product = require('../models/product');

productsCtrl.getProducts = (async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

productsCtrl.postProducts = (async (req,res) => {
    const { codeID, description, price, stock } = req.body;
    const products =new Product({codeID, description, price, stock});
    await products.save();
    res.json({status: 'Product Save'});
});

productsCtrl.getIDProducts = (async (req, res) => {
    const products = await Product.findById(req.params.id);
    res.json(products);
});

productsCtrl.putProducts = (async (req,res) =>{
    const { codeID, description, price, stock } = req.body;
    const newProduct = {codeID, description, price, stock}
    await Product.findByIdAndUpdate(req.params.id, newProduct);
    res.json({status: 'Product Update'});
});

productsCtrl.deleteProducts = (async (req,res) =>{
    await Product.findByIdAndRemove(req.params.id);
    res.json({status: 'Product Deleted'});
});

module.exports = productsCtrl;