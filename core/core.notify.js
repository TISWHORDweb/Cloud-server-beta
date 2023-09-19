

const {emailTemple} = require("../services");
const {useAsync} = require("./index");
const path = require('path');
const {utils, errorHandle} = require("../core");
const url = require('url');




exports.EmailNote = async (email, name, body, subject, otp) => {
    try {
        await new emailTemple(email)
            .who(name)
            .body(body)
            .btnText(!!otp ? otp : "")
            .subject(subject).send().then(r => console.log(r));
    } catch (e) {
        console.log("Error sending:", e);
        return e
    }
}

// exports.sendMail = async(req,res) => {
//     try {
        
//         var email = req.body.email;
//         var filename = req.file.filename;
//         var mailSubject = 'Invoice';
//         var content = '<p>The file below is the invoice you requested for</p>';
//         var filePath = req.file.path
//         console.log(filePath);

//         const transport = nodemailer.createTransport({
//             service:EMAIL_HOST,
//             port:587,
//             secure:false,
//             requireTLS:true,
//             auth:{
//                 user:EMAIL_USER,
//                 pass:EMAIL_PASS
//             }
//         });

//         const mailOptions = {
//             from:EMAIL_USER,
//             to:"ebatimehin@gmail.com",
//             subject:mailSubject,
//             html:content,
//             attachments: [{
//                 filename: filename,
//                 path: filePath,
//                 contentType: 'application/pdf'
//             }],
//         }

//         transport.sendMail(mailOptions, function(error, info){
//             if(error){
//                 console.log(error);
//             }
//             else{
//                 console.log('Mail sent successfully:- ', info.response);
//             }
//         });

//         return res.json(utils.JParser('Message Sent Successfully!', !!filePath, filePath))

//     } catch (e) {
//         console.log(e)
//         console.log(e.message)
//         throw new errorHandle(e.message, 400);
//     }

// }