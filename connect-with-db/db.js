const mongoose  =  require('mongoose');
const CoonectToDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGOOSEFILE);
        console.log("mongose conenct succes full ");
        
    } catch (error) {
        console.log("connection filed with mongoosse",error);
         process.exit(1);

    }
}
module.exports = CoonectToDb;
