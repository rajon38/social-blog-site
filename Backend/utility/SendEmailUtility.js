var nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
<<<<<<< HEAD
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
=======
        host: 'mail.rashedul.dev',
        port: 25,
        secure: false,
        auth: {
            user: "info@rashedul.dev",
            pass: '!170174Rajon'
>>>>>>> 42add93a4678b389250aa93f14f0077dda756cf8
        },tls: {
            rejectUnauthorized: false
        },
    });

<<<<<<< HEAD
    let mailOptions = {
        from: 'Inventory <info@teamrabbil.com>',
=======

    let mailOptions = {
        from: 'Inventory Manager Rashedul <info@rashedul.dev>',
>>>>>>> 42add93a4678b389250aa93f14f0077dda756cf8
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

<<<<<<< HEAD
   return  await transporter.sendMail(mailOptions)
=======

    return  await transporter.sendMail(mailOptions)
>>>>>>> 42add93a4678b389250aa93f14f0077dda756cf8

}
module.exports=SendEmailUtility