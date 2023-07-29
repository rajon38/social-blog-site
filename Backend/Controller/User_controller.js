const createError = require('http-errors')
const userModel=require('../Models/User_model');
const { hashPassword, comparePassword } = require('../helper/auth');
const jwt =require("jsonwebtoken");
const OTPSModel = require("../Models/OTP_model");
const Post = require('../Models/Blog_model')
const SendEmailUtility = require("../utility/SendEmailUtility");
require("dotenv").config();


// create a new user
exports.registerController=async(req,res)=>{
    try {
        // 1. destructure name, email, password from req.body
        const{firstName,lastName,username,profile,phoneNumber,email,password}=req.body;
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
        if(!profile){
            return res.send({message:"profile is required"})
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
            firstName,lastName,username,email,phoneNumber,profile,password:hashedPassword
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
exports.ProfileUpdate = async (req, res) => {
    try {
        // Assuming you're using the 'requireSignIn' middleware to populate 'req.user'
        const data = await userModel.updateOne({ _id: req.user._id },req.body);
        if (!data) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }
        return res.status(200).json({ status: "success", data: data });
    } catch (error) {
        return res.status(500).json({ status: "fail", message: "Error in fetching profile details", error: error.toString() });
    }
}


//ProfileDetails
exports.ProfileDetails = async (req, res) => {
    try {
        // Assuming you're using the 'requireSignIn' middleware to populate 'req.user'
        const data = await userModel.findOne({ _id: req.user._id });
        if (!data) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }
        return res.status(200).json({ status: "success", data: data });
    } catch (error) {
        return res.status(500).json({ status: "fail", message: "Error in fetching profile details", error: error.toString() });
    }
}


//varify Email
exports.RecoverVerifyEmail = async (req, res) => {
    try {
        // Email Account Query
        const email = req.params.email;
        const OTPCode = Math.floor(100000 + Math.random() * 900000);

        // Database First process
        const userCount = await userModel.countDocuments({ email: email });

        if (userCount > 0) {
            // OTP Insert

            // Database Second process
            await OTPSModel.create({ email: email, otp: OTPCode });

            // Email Send
            const sendEmailResult = await SendEmailUtility(email, `Your PIN Code is= ${OTPCode}`, "Inventory PIN Verification");

            return res.status(200).json({ status: "success", data: sendEmailResult });
        } else {
            return res.status(404).json({ status: "fail", data: "No User Found" });
        }
    } catch (error) {
        return res.status(500).json({ status: "fail", data: error.toString() });
    }
};


//verifyOTP
exports.RecoverVerifyOTP = async (req, res) => {
    try {
        const email = req.params.email;
        const OTPCode = req.params.otp;
        const status = 0;
        const statusUpdate = 1;

        // Database First Process
        const OTPCount = await userModel.aggregate([
            { $match: { email: email, otp: OTPCode, status: status } },
            { $count: "total" }
        ]);

        if (OTPCount.length > 0) {
            // Second Process
            const OTPUpdate = await userModel.updateOne(
                { email: email, otp: OTPCode, status: status },
                { email: email, otp: OTPCode, status: statusUpdate }
            );

            return res.json({ status: "success", data: OTPUpdate });
        } else {
            return res.json({ status: "fail", data: "Invalid OTP Code" });
        }
    } catch (error) {
        return res.status(500).json({ status: "fail", data: error.toString() });
    }
};




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

//Following
exports.Following = async (req, res) => {
    try {
        if (req.params.id !== req.body.user) {
            const user = await userModel.findById(req.params.id);
            const otheruser = await userModel.findById(req.body.user);

            if (!user) {
                return res.status(404).json("User not found");
            }

            if (!otheruser) {
                return res.status(404).json("Other user not found");
            }

            if (!user.Followers.includes(req.body.user)) {
                await user.updateOne({ $push: { Followers: req.body.user } });
                await otheruser.updateOne({ $push: { Following: req.params.id } });
                return res.status(200).json("User has followed");
            } else {
                await user.updateOne({ $pull: { Followers: req.body.user } });
                await otheruser.updateOne({ $pull: { Following: req.params.id } });
                return res.status(200).json("User has Unfollowed");
            }
        } else {
            return res.status(400).json("You can't follow yourself");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
};


//Fetch post from following
exports.FollowingPost = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        const followersPost = await Promise.all(
            user.Following.map((item)=>{
                return Post.find({user:item})
            })
        )
        const userPost = await Post.find({user:user._id});

        res.status(200).json(userPost.concat(...followersPost));
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}


//get user to follow
exports.FollowUser = async (req,res)=>{
    try {
        const allUser = await userModel.find();
        const user = await userModel.findById(req.params.id);
        const followinguser = await Promise.all(
            user.Following.map((item)=>{
                return item;
            })
        )
        let UserToFollow = allUser.filter((val)=>{
            return !followinguser.find((item)=>{
                return val._id.toString()===item;
            })
        })

        let filteruser = await Promise.all(
            UserToFollow.map((item)=>{
                const {email , phonenumber , Followers , Following , password , ...others} = item._doc;
                return others
            })
        )

        res.status(200).json(filteruser)
    } catch (error) {

    }
}