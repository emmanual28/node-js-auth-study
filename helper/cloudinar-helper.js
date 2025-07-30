const cloudinary = require('../CONFIG/cludinar')


const uploadtocloudinary = async(filePath)=>{
try {
    const result = await cloudinary.uploader.upload(filePath);
    return { 
        url  : result.secure_url,
        publicId : result.public_id

    }




} catch (error) {
    console.error('error while upload to cludinary ', error);
     throw new Error ('Error while upload the image ')
}
}

module.exports = {
    uploadtocloudinary
}