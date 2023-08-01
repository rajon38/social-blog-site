const createError = require('http-errors')
const userModel=require('../Models/User_model');
const { hashPassword, comparePassword } = require('../helper/auth');
const jwt =require("jsonwebtoken");
const OTPSModel = require("../Models/OTP_model");
<<<<<<< HEAD
=======
const Post = require('../Models/Blog_model')
>>>>>>> 42add93a4678b389250aa93f14f0077dda756cf8
const SendEmailUtility = require("../utility/SendEmailUtility");
require("dotenv").config();


// create a new user
exports.registerController=async(req,res)=>{
    try {
<<<<<<< HEAD
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
=======
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
>>>>>>> 42add93a4678b389250aa93f14f0077dda756cf8

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

<<<<<<< HEAD

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
=======
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
                const {email, phonenumber, Followers, Following, password, ...others} = item._doc;
                return others
            })
        )

        res.status(200).json(filteruser)
    } catch (error) {
        return res.status(500).json("Internal server error")
>>>>>>> 42add93a4678b389250aa93f14f0077dda756cf8
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
