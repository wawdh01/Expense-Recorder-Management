const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    mbNum: {type: Number, required: true},
    password: { type: String, required: true }
});

const User = mongoose.model("user", userSchema);

module.exports = User;