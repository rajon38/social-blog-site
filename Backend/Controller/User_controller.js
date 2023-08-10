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
        const{firstName,lastName,username,profile,phoneNumber,email,status,password}=req.body;
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
            firstName,lastName,username,email,phoneNumber,profile,status,password:hashedPassword
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
            data:{
                email:user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                phoneNumber: user.phoneNumber,
                profile: user.profile,
                status: user.status,
                role:user.role,
                Followers: user.Followers,
                Following: user.Following,
                password: user.password
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
// exports.ProfileUpdate = async (req, res) => {
//     try {
//         // Assuming you're using the 'requireSignIn' middleware to populate 'req.user'
//         const data = await userModel.updateOne({ _id: req.user._id },req.body);
//         if (!data) {
//             return res.status(404).json({ status: "fail", message: "User not found" });
//         }
//         return res.status(200).json({ status: "success", data: data });
//     } catch (error) {
//         return res.status(500).json({ status: "fail", message: "Error in fetching profile details", error: error.toString() });
//     }
// }

// profile update controller
exports.ProfileUpdate = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have the user's ID from authentication

        // Updateable fields from req.body
        const { firstName, lastName, username, phoneNumber, profile, status, newPassword } = req.body;

        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // Update profile information
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.username = username || user.username;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.profile = profile || user.profile;
        user.status = status || user.status;

        // Update password if newPassword is provided
        if (newPassword) {
            const hashedPassword = await hashPassword(newPassword);
            user.password = hashedPassword;
        }

        // Save the updated user
        const updatedUser = await user.save();

        res.status(200).send({
            success: true,
            message: "Profile updated successfully",
            data: {
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                username: updatedUser.username,
                phoneNumber: updatedUser.phoneNumber,
                profile: updatedUser.profile,
                status: updatedUser.status,
                role: updatedUser.role,
                Followers: updatedUser.Followers,
                Following: updatedUser.Following
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error updating profile",
            error
        });
    }
};



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


exports.RecoverVerifyEmail=async (req,res)=> {
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000)

    try {
        // Email Account Query
        let UserCount = (await userModel.aggregate([{$match: {email: email}}, {$count: "total"}]))
        let ExpireIn = new Date().getTime() + 180 * 1000
        if (UserCount.length > 0) {
            // OTP Insert
            let CreateOTP = await OTPSModel.create({email: email, otp: OTPCode, expireIn: ExpireIn})
            // Expire Otp Time
            // Email Send
            let SendEmail = await SendEmailUtility(email, "Your PIN Code is= " + OTPCode, "Task Manager PIN Verification")
            res.status(200).json({status: "success", data: SendEmail})
        } else {
            res.status(200).json({status: "fail", data: "No User Found"})
        }

    } catch (e) {
        res.status(200).json({status: "fail", data: e})
    }
}

exports.RecoverVerifyOTP = async (req, res) => {
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status = 0;
    let statusUpdate = 1;

    try {
        let OTPCount = await OTPSModel.aggregate([
            {$match: {email: email, otp: OTPCode, status: status}},
            {$count: "total"},
        ]);

        console.log(OTPCount.length + "TEST>>>>>>>>");

        if (OTPCount.length > 0) {
            console.log("TEST>>>>>>>>rrrrr");

            let OTPObject = await OTPSModel.findOne({email: email, otp: OTPCode, status: status});

            if (new Date().getTime() <= OTPObject.expireIn) {
                let OTPUpdate = await OTPSModel.updateOne(
                    {email: email, otp: OTPCode, status: status},
                    {
                        email: email,
                        otp: OTPCode,
                        status: statusUpdate,
                    }
                );

                res.status(200).json({status: "success", data: OTPUpdate});
            } else {
                res.status(204).json({status: "fail", data: "OTP Code expired"});
            }
        } else {
            res.status(204).json({status: "fail", data: "Invalid OTP Code"});
        }
    } catch (e) {
        res.status(400).json({status: "fail", data: e});
    }
};


exports.RecoverResetPass = async (req, res) => {

    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass = req.body['password'];
    let statusUpdate = 1;

    try {
        let OTPUsedCount = await OTPSModel.aggregate([{
            $match: {
                email: email,
                otp: OTPCode,
                status: statusUpdate
            }
        }, {$count: "total"}])

        if (OTPUsedCount.length > 0) {
            let PassUpdate = await userModel.updateOne({email: email}, {
                password: NewPass
            })
            res.status(200).json({status: "success", data: PassUpdate})
        } else {
            res.status(400).json({status: "fail", data: "Invalid Request"})
        }
    } catch (e) {
        res.status(400).json({status: "fail", data: e})
    }
}


//Following
exports.Following = async (req, res) => {
    try {
        if (req.params.id !== req.user._id) {
            const user = await userModel.findById(req.params.id);
            const currentUser = await userModel.findById(req.user._id);

            if (!user) {
                return res.status(404).json("User not found");
            }

            if (!currentUser) {
                return res.status(404).json("Other user not found");
            }

            if (!user.Followers.includes(req.body.user)) {
                await user.updateOne({$push: {Followers: req.user._id}});
                await currentUser.updateOne({$push: {Following: req.params.id}});
                return res.status(200).json("User has followed");
            } else {
                await user.updateOne({$pull: {Followers: req.user._id}});
                await currentUser.updateOne({$pull: {Following: req.params.id}});
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
            user.Following.map((item) => {
                return Post.find({user: item})
            })
        )
        const userPost = await Post.find({user: user._id});

        res.status(200).json(userPost.concat(...followersPost));
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}


//get user to follow
exports.FollowUser = async (req, res) => {
    try {
        const allUser = await userModel.find();
        const user = await userModel.findById(req.params.id);
        const followinguser = await Promise.all(
            user.Following.map((item) => {
                return item;
            })
        )
        let UserToFollow = allUser.filter((val) => {
            return !followinguser.find((item) => {
                return val._id.toString() === item;
            })
        })

        let filteruser = await Promise.all(
            UserToFollow.map((item) => {
                const {email, phoneNumber, Followers, Following, password, ...others} = item._doc;
                return others
            })
        )

        res.status(200).json(filteruser)
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

exports.PostUserDetails = async(req , res)=>{
    try {
        const user = await userModel.findById(req.params.id);
        if(!user){
            return res.status(400).json("User not found")
        }
        const {email , password , phoneNumber , ...others}=user._doc;
        res.status(200).json(others);
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}