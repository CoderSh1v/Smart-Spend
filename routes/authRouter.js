import express from "express"
import { User } from "../models/user.js"
import jwt from "jsonwebtoken"
const auth = express.Router();

//REGISTER ROUTE
auth.post("/register",async(req,res) => {
    const {name , email , password} = req.body || {};
    if(!name || !email || !password){
        return res.status(401).json({message : "User not created as one or more fields are missing"});
    }
    const credentials = {
        name : name,
        email : email,
        password : password
    }
    await User.create(credentials)
    res.status(201).json({success : "true"});
  })
  
  //LOGIN ROUTE
  auth.post("/login",async(req,res)=>{
    const {email,password}= req.body || {};
    // basic input check
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }
    
  const user = await User.findOne({ email });

  // same response for email OR password failure
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
  const token = jwt.sign({userId : user._id},process.env.JWT_Secret,{expiresIn: '1d'})
  
  return res.status(200).json({
    success: true,
    token
  });    
})


export {auth} 