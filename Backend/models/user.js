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

// const userLogin = async (req, res) => {
//     const {user,password} = req.body;
//     try {
//         if (!user || !password){
//             res.status(500).jsom({message: "Username or password required"});
//         }
    
//     const findUser = await User.findOne({userName: user});

//     if (findUser) {
//         const verifyPassword = bycript.compareSync(user, User.Password)
//         if (verifyPassword) {
//             const token = jsonwebtoken.sign(user, secret)
//             console.log(token)
//             res.status(200).json({Message: token})
//         }else {
//             res.status(500).json({message: 'Invalid password'})
//         }
//     }else {
//         res.status(500).json({message: 'User not found'})
//     } 
//     } catch (err){
//         console.log(err)
//         res.status(500).json({err})
//     }
    
//     // return res.status(200).json([{'Message': 'Username already existing'}])
// }