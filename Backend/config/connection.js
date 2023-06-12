// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const uri = process.env.ATLAS_URI//"mongodb+srv://Ifypat:PIOpio@recipe-sharing-platform.mhskzmm.mongodb.net/"

const dbConnection = () => {
    mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => {
        console.log("Db connected")
    }).catch(err =>{
        console.log(err)
    })
}



module.exports = { dbConnection}

