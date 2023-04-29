const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:{
        street:String,
        city:String,
        state:String,
        country:String,
        zip:String
    }
})


const UserModal=mongoose.model("users",userSchema);


module.exports={UserModal}