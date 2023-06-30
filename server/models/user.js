const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "this field is required"],
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "this field is required"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "this field is required"],
    },

}); 
const User = mongoose.model('User', UserSchema )

module.exports = {User}

