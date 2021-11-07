const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, required: true, validate: [isEmail, 'Please enter a valid email']},
    userState: { type: String, require: true, default: 'pendiente'},
    rol: { type: String, require: true}
});

module.exports = model('User', UserSchema);
