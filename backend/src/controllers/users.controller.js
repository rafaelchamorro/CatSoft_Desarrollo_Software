const usersCtrl = {};

const User = require('../models/user');

usersCtrl.getUsers = (async (req, res) => {
    const users = await User.find();
    res.json(users);
});

usersCtrl.postUsers = (async (req,res) => {
    const { name, email, userState, rol } = req.body;
    const users =new User({name, email, userState, rol});
    await users.save();
    res.json({status: 'User Save'});
});

usersCtrl.getIDUsers = (async (req, res) => {
    const users = await User.findById(req.params.id);
    res.json(users);
});

usersCtrl.putUsers = (async (req,res) =>{
    const { name, email, userState, rol } = req.body;
    const newUser = {name, email, userState, rol}
    await User.findByIdAndUpdate(req.params.id, newUser);
    res.json({status: 'User Update'});
});

usersCtrl.deleteUsers = (async (req,res) =>{
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'User Deleted'});
});

module.exports = usersCtrl;