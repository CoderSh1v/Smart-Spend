import {app} from "./app.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

mongoose.connect(process.env.MONGO_URI).catch((e)=>{
    console.log(e)
})


app.listen(process.env.PORT)