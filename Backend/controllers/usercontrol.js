// const { User } = require("../models/user");
// const bycript = require('bcryptjs')
// const saltRounds = bycript.genSaltSync(12)
// const jsonwebtoken = require('jsonwebtoken')
// const secret = "secret"

// const createUser = async (req, res) =>{
//     const {user, email, password} = req.body;
// //Ensuring the user enters all the field
//     if (!user || !email || !password) 
//     return res.status(200).json([{'message': 'All the field are required'}])
//     //checking for existing user
//     const userExist = await User.findOne({userName: user}).exec()
//     if (userExist)
//     return res.status(200).json([{'Message': 'Username already existing'}])

//     try {
//         const result = await User.create({
//             "userName": user,
//             "Email": email,
//             "Password": bycript.hashSync(password, saltRounds)
//         });
//          console.log(result)
//          res.status(200).json([{'Message': `Success ${user} has been created`}])
//         // .then(rs => {
//         //     console.log(rs)
//     } catch(err){
//         console.log(err)
//     }
// }
// // User login Function

// const userLogin = async (req, res) => {
//     const {user, password} = req.body;
    

// }


// // const userLogin = async (req, res) => {
// //     const user = req.body.userName;
// //     const password = req.body.Password
// //     User.findOne({
// //         where:{
// //             userName: user
// //         }
// //     }).then(rs => {
// //     if (rs){
// //         const passwordVerification = bycript.compareSync(password, rs.dataValues.password)
// //         if (passwordVerification == true){
// //             const token = jsonwebtoken.sign(rs.dataValues,secret)
// //             console.log(token)
// //             res.status(200).json({message: token})
// //         }else{
// //             res.status(200).json({message: "Invalid Password"})
// //         }

// //     }else{
// //         res.status(200).json({message: "Password Invalid"})
// //     }
// //     }).catch(err => {
// //         console.log(err)
// //     })
// // }

// module.exports = {createUser, userLogin}
