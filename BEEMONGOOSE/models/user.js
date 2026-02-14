const mongoose = require('mongoose');

const  userSchema = new  mongoose.Schema({
    name: {
        type: String ,
        required: [true  , "name is required"]
    },
    email: {
        type: String ,
        required: [true , "email is required"],
        unique: true
    },
    mobile: {
        type: String ,
        required: [true , "mobile number is valid"],
        unique: true
    }

    
})
module.exports = mongoose.model('user ' , userSchema)