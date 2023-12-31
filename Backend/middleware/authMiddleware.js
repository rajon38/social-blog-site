const jwt =require("jsonwebtoken");
const userModel=require('../Models/User_model');

// protecting routes
exports.requireSignIn=(req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader;
        jwt.verify(token , process.env.JWT_SECRET , (err , user)=>{
            if(err) return res.status(400).json("Some error occured");
            req.user = user;
            next();
        } )
    }else{
        return res.status(400).json("Access token is not valid")
    }
}

// admin access
exports.isAdmin=async(req,res,next)=>{
  try {
   const user=await userModel.findById(req.user._id);
   if(user.role!==1){
      return res.status(401).send({
         success:false,
         message:"unAuthorizeD ACCESS"
      })
   }else{
      next()
   }
  } catch (error) {
   console.log(error);
   res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  } 
}