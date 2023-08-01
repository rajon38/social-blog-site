const express = require('express');
<<<<<<< HEAD
const { registerController, loginController, ProfileDetails, ProfileUpdate, RecoverResetPass, RecoverVerifyEmail, RecoverVerifyOTP } = require('../Controller/User_controller');
=======
const { registerController, loginController, ProfileDetails, ProfileUpdate, RecoverResetPass, RecoverVerifyEmail, RecoverVerifyOTP, Following, FollowingPost, FollowUser } = require('../Controller/User_controller');
>>>>>>> 42add93a4678b389250aa93f14f0077dda756cf8
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');




const userRouter= express.Router();



userRouter.post('/register',registerController);
userRouter.post("/login", loginController);
userRouter.get("/profile",requireSignIn,ProfileDetails);
userRouter.post("/update",requireSignIn,ProfileUpdate);
userRouter.get("/varifyEmail/:email",RecoverVerifyEmail);
userRouter.get("/verifyOTP/:email/:otp",RecoverVerifyOTP);
userRouter.post("/resetPass", RecoverResetPass);

<<<<<<< HEAD
userRouter.get("/auth-check", requireSignIn, (req, res) => {
    res.json({ ok: true });
});
userRouter.get("/admin-check", requireSignIn, isAdmin, (req, res) => {
    res.json({ ok: true });
});

=======

userRouter.put("/following/:id",requireSignIn,Following)
userRouter.get("/all/user/:id",FollowUser);
userRouter.get("/flw/:id",requireSignIn,FollowingPost)

userRouter.get("/auth-check", requireSignIn, (req, res) => {
    res.json({ ok: true });
});
userRouter.get("/admin-check", requireSignIn, isAdmin, (req, res) => {
    res.json({ ok: true });
});

>>>>>>> 42add93a4678b389250aa93f14f0077dda756cf8
module.exports = userRouter;