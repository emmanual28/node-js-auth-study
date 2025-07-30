const express = require('express')
const authMiddleware = require('../middileware/auth-middlewra')
const adminMiddileware = require('../middileware/admin-middileware')
const MalterMiddileware  = require('../middileware/multer-middileware')
const {uploadImage,fetchImagesController,deleteImagecontroller} = require('../controllers/image-controler')
const router = express.Router()

//upload the image 
router.post('/upload',authMiddleware,adminMiddileware,MalterMiddileware.single('image'),uploadImage)



router.delete('/:id',authMiddleware,adminMiddileware,deleteImagecontroller)



// get all image 
  router.get('/get',authMiddleware,fetchImagesController)
module.exports = router

// //{
//     "username": "renjini",
//     "email": "renjini@example.com",
//     "password": "12345678",
//     "role": "admin"
//   //