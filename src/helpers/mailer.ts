import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';




export const sendEmail = async({email,emailType, userId}:any) => {

try {
    const hashedToken =  await bcryptjs.hash(userId.toString(),10);
              
    if(emailType === "VERIFY") {
        await  User.findByIdAndUpdate(userId,
            {verifyToken:hashedToken,
            verifyTokenExpiry:Date.now() + 2400000
            });
    }
    else if(emailType === "RESET") {
        await  User.findByIdAndUpdate(userId,
            {forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry:Date.now() + 2400000
            });
    }



    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_SECRET
        }
      });


      const mailOptions = {
        from:'kushwahankit410@gmail.com',
        to:email,
        subject: emailType === "VERIFY" ? "verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
      }

      const mailresponse = await transporter.sendMail(mailOptions);
      return mailresponse;
    
} catch (error:any) {
    throw new Error(error.message);
}






}
