const { User } = require("../models/user");
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { errorResponse } = require("../errors-Handler/client-error");
const { successResponse } = require("../success-Handler/client_success");
//const saltRounds = bcrypt.genSaltSync(10)

const getAllUser = async (req, res) => {
    try {
        const getUsers = await User.find()
        res.status(200).json(getUsers)
    } catch(err){
        res.status(400).json([{'message': 'server error'}])
    }
};

const createUser = async (req, res) =>{
    try {
    const {user, email, password} = req.body;
//Ensuring the user enters all the field
    if (!user || !email || !password)
    //throw new Error('All the fields are required')
    return errorResponse(res, 'All the fields are required', 400) 
    
    //checking for existing user
    const userExist = await User.findOne({username: user})
    if (userExist)
    // throw new Error('Username already existing')
    return errorResponse(res, "Username already existing", 409)    
    
    const hashPwd = await bcrypt.hash(password, 10)

    //console.log('hashed Password:',hashPwd)

    const newUser = {
        "username": user,
        "email": email,
        "password": hashPwd
    }
        const result = await User.create(newUser);
         console.log('result:',result, newUser)
         return successResponse(res, "Your account has been created succesfully", 201 )
    } catch(error){
        console.log(error.message)
        return errorResponse(res, error.message,false, 500);
               
    }
}

// User login Function

const userLogin = async (req, res) => {
    const {user,password} = req.body;
    try {
        if (!user || !password){
            return errorResponse(res, 'Email or Password required', 400)
            // throw new Error('Username or password required')
            //res.status(500).json({message: "Username or password required"});
        }    
        
    const findUser = await User.findOne({username: user});

    if (!findUser) {
        //throw new Error('User not found')
        return errorResponse(res, 'User not found', 404)
        //res.status(400).json({message: 'User not found'})
    } else {
        const verifyPassword = await bcrypt.compare(password, findUser.password )
        // console.log(password, findUser.Password)

        if (!verifyPassword){
           return errorResponse(res,'Invalid password', 401)
            //  res.status(401).json({message: 'Invalid password'})
        } else {
            const token = jsonwebtoken.sign({user: findUser.username, id: findUser._id}, process.env.SECRET_JWT)
            //console.log(process.env.SECRET_JWT)
            return successResponse(res, "logged in successfully",{token}, 200,)

        }
    }
    } catch (error){
      return  errorResponse(res, error.message,false, 500)
        // console.log(err)
    }
    
}

const updateUser = async (req, res) =>{
    try{
        const {userId} = req.params
        const {user, email, password} = req.body
        const userUpdate = await User.findById(userId);
        console.log(userId)
        if (!userUpdate) {
          return res.status(404).json({ message: 'User not found' });
        }
        userUpdate.userName = user
        userUpdate.Email = email
        userUpdate.Password = password
        await userUpdate.Update()
    
        // await User.findByIdAndUpdate({_id: userId}, {userName, Email, Password})
        res.status(200).json({message: "success"});
    } catch(error) {
        res.status(400).json([{'message': 'server error'}])
    }
}



module.exports = {getAllUser, createUser, userLogin, updateUser}
