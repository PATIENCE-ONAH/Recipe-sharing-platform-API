const express = require('express');
const { createUser, userLogin } = require('../controllers/usercontrol');

const routeManager = express.Router();

routeManager.post('/register', createUser);
routeManager.post('/Auth', userLogin)




module.exports = {routeManager}