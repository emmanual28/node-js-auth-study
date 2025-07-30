const express = require('express');
const dotenv = require('dotenv');
 const CoonectToDb =  require("./connect-with-db/db")
 const authRouter = require('./ROUTES/auth-route') 
const Homerouter = require("./ROUTES/home-routes")
const AdminRoute = require('./ROUTES/adminroute') 
const uploadImage = require('./ROUTES/image')
// const authMiddileware = require('./middileware/auth-middlewra')
// connection with db 
dotenv.config(); 
CoonectToDb();


const app = express();
const PORT = process.env.PORT || 3006;
app.use(express.json()); 
app.use('/api/auth',authRouter)
app.use('/api/auth',Homerouter)
app.use('/api/auth',AdminRoute)
app.use('/api/image',uploadImage)
// authMiddileware()
app.listen(PORT ,()=>{
    console.log(`server is connected to port ${PORT}`);
    
})


app.use(express.json());