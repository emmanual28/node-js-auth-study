const Image  = require('../schema /image')
const {uploadtocloudinary}   = require('../helper/cloudinar-helper')
const fs= require('fs')
const cludinary =require('../CONFIG/cludinar')
const uploadImage = async(req,res) =>{
    try {
      // check if the file is missing in the req object 
      
      if(!req.file){
        return res.status(400).json({
            success :  false ,
            message : 'file is required please an image  '
        })
      }

      // upload to cloudinary 
      const {url,publicId} = await uploadtocloudinary(req.file.path)
      // store the image url and public id along with the uplaoded user id in databse 
    const newlyUploadedImage = new Image({
        url,
        publicId,
        uploadedBy : req.userInfo.id,

    })
    console.log("userInfo in controller:", req.userInfo);

   await newlyUploadedImage.save()



   // delete the file from the local storage 
   fs.unlinkSync(req.file.path)
   


   res.status(201).json({
    success : true ,
    message : 'image uplaod to cluoudianary ', 
    image : newlyUploadedImage
   })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success :  false ,
            message : 'some thing went wrong try again'
        })
        
    }
}

 // fetch the images for all user 
 const fetchImagesController = async(req,res)=>{
try {

    //sorting for page laod 
    const page = parseInt(req.query.page) || 1 // curent page 
    const limit = parseInt(req.query.limit) || 2; // limit of images 
    const skip = (page - 1) * limit; // is use to skip the field 

    const SortBy = req.query.sortBy || 'createdAt';
     const sortOder = req.query.sortOder === 'asc' ? 1 : -1
      const totalimages = await Image.countDocuments()
        const totalpages = await Math.ceil(totalimages/limit)

       const sortobj = {};
       sortobj[SortBy] = sortOder







   const images = await Image.find().sort(sortobj).skip(skip).limit(limit);


   if(images){
    res.status(200).json({
     success : true ,
     data : images,
     currentpage : page,
     totalpages : totalpages,
     totalimages : totalimages
    })
   }
} catch (error) {
    console.log(error);
    res.status(500).json({
        success :  false ,
        message : 'some thing went wrong try again'
    })
 }
}
 

const deleteImagecontroller = async(req,res)=>{
    try {
       const getCurretIdofimage = req.params.id ;
       const userId  = req.userInfo.id;
       const image = await Image.findById(getCurretIdofimage)
  if(!image) {
    return res.status(404).json({
        success : false ,
        message : " image is not found   "
        
    })
  }
  //  if we need to check the image is uploaded by the current user who is trying to delte this image 
  if(image.uploadedBy.toString() !== userId){
    return res.status(404).json({
        success : false ,
        message : "  you are not able to delte becuse you cannot delte because you have not uoploded it    "
        
    })
  }

  // delete this image first from cludinary storage 
  await cludinary.uploader.destroy(image.publicId);
  //delte image from mongo db data base
   await Image.findByIdAndDelete(getCurretIdofimage)
res.status(200).json({
    success :  true ,
    message : 'image detele suceesfully '
})




    } catch (error) {
        res.status(500).json({
            success :  false ,
            message : 'some thing went wrong try again'
        })
    }
}



module.exports ={
    uploadImage,fetchImagesController,deleteImagecontroller
}