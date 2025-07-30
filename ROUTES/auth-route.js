const express = require('express');
const {registerUser,loginuser,changePasswor} = require('../controllers/auth-controler')
const Router = express.Router();
 const authMiddileware = require('../middileware/auth-middlewra')
 
Router.post('/login',loginuser) 
Router.post('/Register',registerUser) 
Router.post('/changepasswrod',authMiddileware,changePasswor) 
module.exports = Router ;
