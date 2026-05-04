const mongoose = require("mongoose")

const connectDB = async  () => {
    try {
        await  mongoose.connect ("mongodb://127.0.0.1:27017/ProductDB");
        console.log("mongodb Connected");
    }catch(error){
        console.log("mongodb Connection failed" , error.message);
        process.exit(1);
    }
};
module.exports = connectDB;