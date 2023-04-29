const express=require("express");
const resutrantRouter=express.Router()

const {ResturantModal}=require("../modals/resturantModal");
const { UserModal } = require("../modals/userModal");

resutrantRouter.get("/res",(req,res)=>{
    res.send("hello from resturants")
})


resutrantRouter.post("/resturants",async(req,res)=>{
 
    const body=req.body;
    try {
        let menu=new ResturantModal(body);
        await menu.save()
        res.json("Data added")
    } catch (error) {
        console.log(error)
    }

})
resutrantRouter.post("/resturants",async(req,res)=>{
 const Id=req.param.id
    const body=req.body;
    try {
        let menu=new ResturantModal({Id,body});
        await menu.save()
        res.json("Data added")
    } catch (error) {
        console.log(error)
    }

})

resutrantRouter.get("/resturants",async(req,res)=>{
   
       try {
        let result=await ResturantModal.find();
         res.send(result)
       } catch (error) {
           console.log(error)
       }
   
   })

   resutrantRouter.post("/resturants/:id/menu",async(req,res)=>{
      const Id=req.body.id
      const body=req.body;
      let menu=await ResturantModal.findOne({"_id":Id});
      let result=menu._id
    try {
        if(Id==result){
            const newData=new UserModal(body);
            await newData.save();
            res.json("Menu added")

        }else {
            res.json("Something went wrong")
        }
       
    } catch (error) {
        console.log(error)
    }

})



module.exports={resutrantRouter}