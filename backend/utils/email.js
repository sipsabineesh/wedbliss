import nodemailer from 'nodemailer'

export const  sendEmail = async(email,subject,message) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sipsabineesh@gmail.com',
            pass: 'bfqn ugjt gzmw kblg'
        }
    });
     
    let mailDetails = {
        from: 'info@wedbliss.com',
        to: email,//'sipsabineesh@gmail.com',
        subject: subject,
        text:message
    };
    console.log(mailDetails) 
   const info = mailTransporter.sendMail(mailDetails, function (err, data) {
        console.log(info)
        if (err) {
             console.log('Error Occurs' + err.message)
        } else {
            return
        }
   });
}  