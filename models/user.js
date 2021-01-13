const mongoose = require('mongoose');

var User = mongoose.model('User', {
    firstName : { type: String },
    lastName : { type: String },
    email : { type: String },
    password : { type: String },
    passwordConfirm : { type: String }
});

module.exports = { User };