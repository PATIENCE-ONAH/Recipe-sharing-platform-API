const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "this field is required"],
        lowercase: true,
        unique: true
    },
    Email: {
        type: String,
        required: [true, "this field is required"],
        lowercase: true,
        unique: true
    },
    Password: {
        type: String,
        required: [true, "this field is required"],
        lowercase: true,
        unique: true
    },

}); 


const User = mongoose.model('User', UserSchema )


module.exports = {User}
