

import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import User from "@/models/userModel"



export const sendEmail = async ({email, emailType, userId} : any)=>{

  const hashedToken =await bcryptjs.hash(userId.toString(),10)



    try{

      if(emailType === "VERIFY"){

        await User.findByIdAndUpdate(userId, {
          $set:{
          verifyToken : hashedToken,
          verifyTokenExpiry :Date.now() + 3600000
          }
        })

        
      }else if(emailType === "RESET"){

        await User.findByIdAndUpdate(userId,{
           $set:{
          forgotPasswordToken : hashedToken,
          forgotPasswordTokenExpiry :Date.now() + 3600000
           }
        })

      

      }


      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b2fe0ffd5b1267",
          pass: "c5acdb27032d51"
        }
      });

      const mailOptions = {

        from: 'ankit@213.in', 
        to: email, 
        subject: emailType === 'VERIFY' ? "verify your email" : "Reset your password", 
   
        html: `<p>click <a href = "${process.env.DOMAIN}/verifyemail?token=${
          hashedToken}">here </a> to ${emailType==="VERIFY"? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD"}
         OR COPY ANDPASTE BELOW LINK IN YOUR BROWSER .<br> 
         ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`,
      }

      const mailResponse = await transport.sendMail(mailOptions)

      return mailResponse
    }catch(error : any){

    throw new Error(error.message)

    }


}