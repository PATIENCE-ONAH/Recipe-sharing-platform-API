const express = require('express');
const {getAllUser, createUser, userLogin, updateUser } = require('../controllers/usercontrol');

const routeManager = express.Router();

routeManager.get('/getusers', getAllUser)
routeManager.post('/register', createUser);
routeManager.post('/auth', userLogin)
routeManager.put('/update/:id', updateUser)




module.exports = {routeManager}