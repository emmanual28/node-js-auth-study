const user = require('../schema /userschema')
const bcrypt = require('bcryptjs');
const jwttoken = require("jsonwebtoken")


const registerUser = async (req,res) =>{
     const {username,email,password,role} = req.body;
     try {
          const findExisitingUser = await user.findOne({username,email});
          if (findExisitingUser) {
            return res.status(400).json({
              message: "Email already exists",
              result: "Failed"
            });
          }
 const hashedPassword  =  await bcrypt.hash(password ,10);
 const newUer = await user.create({username,email,password : hashedPassword ,role}) 
     res.status(201).json({
        message  : 'New user created ' ,
         date : newUer
     })
          
          
     } catch (e) {
        console.log("error while creating the user ");
          console.log(e);
           
     } }

     const loginuser = async (req,res) =>{
        const {password,email} = req.body
        try {
            const exixtingUser = await user.findOne({ email })
            if(!exixtingUser) {
                return res.status(400).json({
                    message : "user not found || in valid credential ",

            })
                
            }
            const ismach = await bcrypt.compare( password,exixtingUser.password)
            if(!ismach){
                return res.status(400).json({
                    message : 'password incorrect ' ,
                  

                })
                              
            } 
            const token =jwttoken.sign(
             {
                id : exixtingUser._id ,
                role : exixtingUser.role,
                username : exixtingUser.username,
                
             },process.env.JWT_SECRET,{
                expiresIn : "1h"
             }

            )
              return res.status(200).json({
                message : "login succes full",
                token,
                user : {
                    id : exixtingUser.id,
                    username : exixtingUser.username,
                    password : exixtingUser.password,
                    role : exixtingUser.role
                }
        })

        } catch (err) {
            console.error("Login error:", err);
            return res.status(500).json({ message: "Server error" });
          }
          
     
}
// we creating a methord to change the password for the user that already login 
   

 const changePasswor = async(req,res)=>{
  try {
    const userId = req.userInfo.id
     

    //extract old and new password
    const {oldpassword,newPassword} = req.body
         
    // find the user who change the password 

    const User =  await user.findById(userId) 
     if(!User) {
      res.status(400).json({
        success : false ,
        message : "this is not a register user"
      })
     }
     //  check the old password is orrect or not  
     const ispasswordMatch = await bcrypt.compare(oldpassword,User.password);
     if(!ispasswordMatch){
      res.status(400).json({
        success : false ,
        message : "the old password that you enter is not right "
      })
     }
    // hash the  new password and store it 
    const salt = await bcrypt.genSalt(10);

    const Newhasedpassword = await bcrypt.hash(newPassword ,salt)


    // upadate the user password 

     User.password = Newhasedpassword;

     await User.save();
     res.status(200).json({ message: 'Password changed successfully' });


  } catch (error) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
 }

 

module.exports = {registerUser,loginuser,changePasswor};
