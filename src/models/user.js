const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String},
    birthdate: {type: Date},
    email: {type: String}
}, {
    collection: 'user'
});

module.exports = mongoose.model('User', UserSchema);