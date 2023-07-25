const express = require('express');
const { registerController, loginController, ProfileDetails, ProfileUpdate, RecoverResetPass, RecoverVerifyEmail, RecoverVerifyOTP } = require('../Controller/User_controller');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');




const userRouter= express.Router();



userRouter.post('/register',registerController);
userRouter.post("/login", loginController);
userRouter.get("/profile",requireSignIn,ProfileDetails);
userRouter.post("/update",requireSignIn,ProfileUpdate);
userRouter.get("/varifyEmail/:email",RecoverVerifyEmail);
userRouter.get("/verifyOTP/:email/:otp",RecoverVerifyOTP);
userRouter.post("/resetPass", RecoverResetPass);

userRouter.get("/auth-check", requireSignIn, (req, res) => {
    res.json({ ok: true });
});
userRouter.get("/admin-check", requireSignIn, isAdmin, (req, res) => {
    res.json({ ok: true });
});

module.exports = userRouter;