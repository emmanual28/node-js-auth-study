const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, uniqueName); // ✅ MUST call cb()
    }
})

///  file fiter function 
const checkFilefilter  = (req,file,cb) =>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    } 
    else {
        cb(new Error('not an image uplaod only the image '))
    }
}


module.exports = multer({
    storage: storage ,
    fileFilter : checkFilefilter ,
    limits :{
        fileSize : 5*1024 *1024 
    }
})