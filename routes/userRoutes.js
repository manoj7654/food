const express = require("express");
const userRouter = express.Router();

const { UserModal } = require("../modals/userModal");
// const { useRouteMatch } = require("react-router-dom");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const { reset } = require("nodemon");
require("dotenv").config()




userRouter.get("/", (req, res) => {
  res.send("hello from users");
});

userRouter.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    address: { street, city, state, country, zip },
  } = req.body;
  const result = await UserModal.find({ email });
  if (result.length > 0) {
    return res.json("User already exists");
  } else {
    try {
      bcrypt.hash(password, 5, async (err, secure_password) => {
        if (err) {
          console.log(err);
        } else {
          const user = new UserModal({
            name,
            email,
            password:secure_password,
            address: { street, city, state, country, zip },
          });
          await user.save();
          res.status(201).send("User registration successfull");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        let user=await UserModal.find({email});
        if(user.length>0){
            bcrypt.compare(password, user[0].password, async (err, result) => {
                // console.log(user)
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key);
                    res.status(201).json({"message":"Login successfull","token":token})
                }else{

                    res.send("Wrong credential")
                }
            }) 
            
        }else{
            res.send("Wrong credential")
        }
    } catch (error) {
       
        console.log(error)
    }
})


userRouter.patch("/user/:id/reset",async(req,res)=>{
    const Id=req.params.id;
    const password1=req.body.password;
    const body=req.body;
     try {
         if(password1!=undefined){
            bcrypt.hash(password1,5,async(err,secure_password)=>{
                if(err){
                    res.json({"msg":"error from hassing password in edit password "})
                }else{
                  body.password=secure_password;
                  let result=await UserModal.findByIdAndUpdate({_id:Id},body);
                  console.log(result)
                  res.send({"message":"password updated succefully"})
                }
            })
         }else{
            await UserModal.findByIdAndUpdate({_id:Id},body);
            res.json("successfully updated password")
         }
     } catch (error) {
        console.log(error)
     }
})










module.exports = { userRouter };
