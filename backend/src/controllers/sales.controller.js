const salesCtrl = {};

const Sale = require('../models/sale');

salesCtrl.getSales = (async (req, res) => {
    const sales = await Sale.find();
    res.json(sales);
});

salesCtrl.postSales = (async (req,res) => {
    const { saleDate, clientID, clientName, seller, saleState, total } = req.body;
    const sales =new Sale({ saleDate, clientID, clientName, seller, saleState, total});
    await sales.save();
    res.json({status: 'Sale Save'});
});

salesCtrl.getIDSales = (async (req, res) => {
    const sales = await Sale.findById(req.params.id);
    res.json(sales);
});

salesCtrl.putSales = (async (req,res) =>{
    const { saleDate, clientID, clientName, seller, saleState, total } = req.body;
    const newSale = { saleDate, clientID, clientName, seller, saleState, total}
    await Sale.findByIdAndUpdate(req.params.id, newSale);
    res.json({status: 'Sale Update'});
});

salesCtrl.deleteSales = (async (req,res) =>{
    await Sale.findByIdAndRemove(req.params.id);
    res.json({status: 'Sale Deleted'});
});

module.exports = salesCtrl;