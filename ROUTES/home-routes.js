const express = require('express') 
const Homerouter = express.Router() 
const authMiddileware = require("../middileware/auth-middlewra")
const user = require('../schema /userschema')
Homerouter.get('/welcome',authMiddileware,(req,res,) => {
       const{username,id,role} = req.userInfo;
       res.json({
              message: "Welcome to the protected route!",
              user : {username,id,role}
       })
})
module.exports =  Homerouter
;

 