const { User } = require("../models/user");
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { errorResponse } = require("../errors-Handler/client-error");
const { successResponse } = require("../success-Handler/client_success");
//const saltRounds = bcrypt.genSaltSync(10)

const createUser = async (req, res) =>{
    const {user, email, password} = req.body;
//Ensuring the user enters all the field
    if (!user || !email || !password) 
    return res.status(400).json([{'message': 'All the field are required'}])
    //checking for existing user
    const userExist = await User.findOne({userName: user})
    if (userExist)
    // return errorResponse("Username already existing", 400)
    return res.status(200).json([{'Message': 'Username already existing'}])
    
    try {
    const hashPwd = await bcrypt.hash(password, 10)

    console.log('hashed Password:',hashPwd)

    const newUser = {
        "userName": user,
        "Email": email,
        "Password": hashPwd
    }
        const result = await User.create(newUser);
         console.log('result:',result, newUser)
         return successResponse(res, "Your account has been created succesfully", 201 )
    } catch(err){
       //return errorResponse(err.message, 409)
        console.log(err)
    }
}

// User login Function

const userLogin = async (req, res) => {
    const {user,password} = req.body;
    try {
        if (!user || !password){
            res.status(500).json({message: "Username or password required"});
        }    
        
    const findUser = await User.findOne({userName: user});

    if (!findUser) {
         res.status(200).json({message: 'User not found'})
    } else {
        const verifyPassword = await bcrypt.compare(password, findUser.Password )

        console.log(password, findUser.Password)
        console.log(verifyPassword)

        if (!verifyPassword){
        //    return errorResponse('Invalid password', 400)
             res.status(401).json({message: 'Invalid password'})
        } else {
            const token = jsonwebtoken.sign({user: findUser.userName, id: findUser._id}, process.env.SECRET_JWT)
            //console.log(process.env.SECRET_JWT)
            return successResponse(res, "logged in successfully", 200,)

        }
    }
    } catch (err){
        console.log(err)
        res.status(500).json({err})
    }
    
    // return res.status(200).json([{'Message': 'Username already existing'}])
}




module.exports = {createUser, userLogin}
