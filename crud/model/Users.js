const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName : String,
    lastName : String,
    age : Number,
    city: String
})

module.exports = mongoose.model('Users', UserSchema);
