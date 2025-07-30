const express = require('express')
const AdminRoute = express.Router()
const adminuser = require("../schema /userschema")
const authMiddileware = require("../middileware/auth-middlewra")
const adminMIddileware = require("../middileware/admin-middileware")
 
AdminRoute.post('/admin',authMiddileware,adminMIddileware, (req,res) => {
res.json({
    message : "welcome to admin route ",
    admin : req.userInfo.username 
})
})
module.exports = AdminRoute ;
