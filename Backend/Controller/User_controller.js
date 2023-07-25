const createError = require('http-errors')
const userModel=require('../Models/User_model');
const { hashPassword, comparePassword } = require('../helper/auth');
const jwt =require("jsonwebtoken");
const OTPSModel = require("../Models/OTP_model");
const SendEmailUtility = require("../utility/SendEmailUtility");
require("dotenv").config();


// create a new user
exports.registerController=async(req,res)=>{
    try {
       // 1. destructure name, email, password from req.body
       const{firstName,lastName,username,phoneNumber,email,password}=req.body;
       // 2. all fields require validation
       if(!firstName.trim()){
          return res.send({message:"firststName is required"})
       }
       if(!lastName.trim()){
          return res.send({message:"lastName is required"})
       }
        if(!username.trim()){
            return res.send({message:"lastName is required"})
        }
       if(!email){
          return res.send({message:"email is required"})
       }
       if(!phoneNumber){
        return res.send({message:"Phone numeber is required"})
       }
       if(!password){
          return res.send({message:"password is required"})
       }
     
     
       // check user
       const existingUser=await userModel.findOne({email})
       // check existing user
       if(existingUser){
          return res.status(200).send({
             success:false,
             message:"Already exists please login",
 
          })
       }
       // hashed password
       const hashedPassword=await hashPassword(password)
       // save
       const user=await new userModel({
        firstName,lastName,username,email,phoneNumber,password:hashedPassword
       }).save();
       res.status(201).send({
          success:true,
          message:"register complete",
          user
       })
    } catch (error) {
       console.log(error);
       res.status(500).send({
          success:false,
          message:"Error in registration",
          error
       })
    }
 }

 // login controller
exports.loginController = async(req,res)=>{
    try {
       const {email,password} =req.body;
       // validation
       if(!email || !password){
         return res.status(404).send({
             success:false,
             message:"invalid email or password",
             
          })   
 
       }
       // check user
       const user=await userModel.findOne({email})
       if(!user){
          return res.status(404).send({
             success:false,
             message:"invalid email"
          })
       }
       const match= await comparePassword(password,user.password)
       if(!match){
         return res.status(200).send({
             success:false,
             message:"invalid email or password"
          })
       }
          // token
          const token =  jwt.sign({_id:user._id},process.env.JWT_SECRET,{
             expiresIn:"7d"
          })
          // send response
          res.status(200).send({
             success:true,
             message:"login successful",
             user:{
                name:user.name,
                email:user.email,
                
                role:user.role
             },
             token
            
          })
       
    } catch (error) {
       console.log(error);
       res.status(500).send({
          success:false,
          message:"Error in login",
          error
       })
    } 
 }


 //ProfileUpdate
exports.ProfileUpdate=async (req, res) => {
    try {
        let data = await userModel.updateOne({email: req.headers['email']}, req.body)
        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error.toString()}
    }
}



//ProfileDetails
exports.ProfileDetails=async (req, res) => {
    try {
        let data = await userModel.findOne({ email: req.headers['email'] });
        return { status: "success", data: data };
    } catch (error) {
        return { status: "fail", data: error.toString() };
    }
}


//varify Email
exports.RecoverVerifyEmail=async (req,res)=>{

    try {
        // Email Account Query
        let email = req.params.email;
        let OTPCode = Math.floor(100000 + Math.random() * 900000)

        // Database First process
        let UserCount = (await userModel.aggregate([{$match: {email: email}}, {$count: "total"}]))

        if(UserCount.length>0){
            // OTP Insert

            // Database Second process
            await OTPSModel.create({email: email, otp: OTPCode})

            // Email Send
            let SendEmail = await SendEmailUtility(email,"Your PIN Code is= "+OTPCode,"Inventory PIN Verification")

            return {status: "success", data: SendEmail}
        }
        else{
            return {status: "fail", data: "No User Found"}
        }
    }catch (error) {

        return {status: "fail", data: error.toString()}
    }

}


//verifyOTP
exports.RecoverVerifyOTP=async (req,res)=>{

    try {
        let email = req.params.email;
        let OTPCode = req.params.otp;
        let status=0;
        let statusUpdate=1;


        //Database First Process
        let OTPCount = await userModel.aggregate([{$match: {email: email, otp: OTPCode, status: status}}, {$count: "total"}])

        if (OTPCount.length>0) {

            // Second Process
            let OTPUpdate = await userModel.updateOne({email: email, otp: OTPCode, status: status}, {email: email, otp: OTPCode, status: statusUpdate})
            return {status: "success", data: OTPUpdate}

        } else {

            return  {status: "fail", data: "Invalid OTP Code"}
        }
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }

}


//resetPass
exports.RecoverResetPass=async (req,res)=>{

    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass =  req.body['password'];
    let statusUpdate=1;

    try {
        // Database First Process
        let OTPUsedCount = await OTPSModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}, {$count: "total"}])

        if (OTPUsedCount.length>0) {
            // Database Second Process
            let PassUpdate = await userModel.updateOne({email: email},{password: NewPass})
            return {status: "success", data: PassUpdate}
        }

        else {
            return {status: "fail", data: "Invalid Request"}
        }
    }


    catch (e) {
        return {status: "fail", data: e.toString()}
    }

}
