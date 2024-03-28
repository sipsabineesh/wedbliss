import nodemailer from 'nodemailer'

export const  sendEmail = async(email,message) => {
 
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sipsabineesh@gmail.com',
            pass: 'bfqn ugjt gzmw kblg'
        }
    });
     
    let mailDetails = {
        from: 'info@wedbliss.com',
        to: 'sipsabineesh@gmail.com',
        subject: 'OTP',
        text:message
    };
    console.log(mailDetails) 
   const info = mailTransporter.sendMail(mailDetails, function (err, data) {
        console.log(info)
        if (err) {
             console.log('Error Occurs' + err.message)
        } else {
             console.log('Email sent successfully')
        }
   });
}  