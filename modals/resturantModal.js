const mongoose=require("mongoose");

const resturantSchema=mongoose.Schema({
    name:String,
    address:{
        street:String,
        city:String,
        state:String,
        country:String,
        zip:String
    },
    menu:[{
        name:String,
        description:String,
        price:Number,
        image:String
    }]
})

const ResturantModal=mongoose.model("resturants",resturantSchema);


module.exports={ResturantModal}