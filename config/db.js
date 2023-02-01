const mongoose= require("mongoose");
const config =require("config");
const db = config.get("mongoURI");
mongoose.set('strictQuery', false);

const connectDB =async()=>{
    try{
        await mongoose.connect(db);
        console.log("db connected");
        useCreateIndex:true;
    } catch(err){
        console.error(err.message);
    }
}

module.exports = connectDB;