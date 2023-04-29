const express=require("express");
const app=express();

require("dotenv").config()

const {connection}=require("./config/db")
const {userRouter}=require("./routes/userRoutes")
const {resutrantRouter}=require("./routes/resturantRoutes")
app.use(express.json())

app.use("/api",userRouter)
app.use("/api",resutrantRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to Db")
    } catch (error) {
        console.log("Something went wrong")
    }
    console.log(`Server is running on port no ${process.env.port}`)
})