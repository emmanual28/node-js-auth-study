

const isadminuser  = (req,res,next) =>{
    if(req.userInfo .role !== 'admin'){
     return res.status(404).json({
        messge  : " acces denied only admin user can acees this page  ",
        sucess : false,

     })
    }
    next();
}
module.exports = isadminuser;