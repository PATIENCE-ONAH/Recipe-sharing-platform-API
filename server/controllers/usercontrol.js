const mongoose = require('mongoose')
const { User } = require("../models/user");
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { errorResponse } = require("../errors-Handler/client-error");
const { successResponse } = require("../success-Handler/client_success");
// const ObjectId = mongoose.Types.ObjectId;
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
        }    
        
    const findUser = await User.findOne({username: user});

    if (!findUser) {
        //throw new Error('User not found')
        return errorResponse(res, 'User not found', 404)
    } else {
        const verifyPassword = await bcrypt.compare(password, findUser.password )
        // console.log(password, findUser.Password)

        if (!verifyPassword){
           return errorResponse(res,'Invalid password', 401)
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
        const {id} = req.params;
        const {user, email, password} = req.body;
        console.log('Received ID:', id); 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse(res, 'Invalid user ID', false, 400);
        }
        // const userId =  mongoose.Types.ObjectId(id);
    const userUpdate = await User.findById({_id:id});
        console.log(id)
        console.log(userUpdate)
        if (!userUpdate) {
            return errorResponse(res, 'User not found', 404)
          //return res.status(404).json({ message: 'User not found' });
        }
        userUpdate.username = user
        userUpdate.email = email
        userUpdate.password = password
        await userUpdate.save()
        
        // await User.findByIdAndUpdate({_id: userId}, {username, email, password})
        return successResponse(res, "updated successfully", 200,)
        // res.status(200).json({message: "success"});
    } catch(error) {
        return  errorResponse(res, error.message,false, 500)
        // res.status(500).json([{'message': 'server error'}])
    }
}



module.exports = {getAllUser, createUser, userLogin, updateUser}
