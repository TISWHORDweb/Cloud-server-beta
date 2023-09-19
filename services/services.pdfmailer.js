const nodemailer = require('nodemailer');
const { useAsync } = require('../core');
const { EMAIL_HOST, EMAIL_USER, EMAIL_PASS } = process.env;

exports.sendMailWithAttatchment = (email, mailSubject, content, filename,filePath)=>{

    try {
        
        const transport = nodemailer.createTransport({
            host:EMAIL_HOST,
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:EMAIL_USER,
                pass:EMAIL_PASS
            }
        });

        const mailOptions = {
            from:EMAIL_USER,
            to:email,
            subject:mailSubject,
            html:content,
            attachments: [{
                filename: filename,
                path: file,
                contentType: 'application/pdf'
            }],
        }

        transport.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }
            else{
                console.log('Mail sent successfully:- ', info.reponse);
            }
        });

    } catch (error) {
        console.log(error.message);
    }

}
