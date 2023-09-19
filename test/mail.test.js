require('dotenv').config();
let myToken = 'dy42NkNoS-eqhGS50UDPSd:APA91bHbAgJWBHSV9wix5b5F8CPqjgChMG3yqPhYpjPXzth6PIfWmV-6-nSYK4PVTJDfQZP1rL6fY3X3afWT-EcfBuBb_B-i1LJ28-ZYiv_tU97MCVrePXuQf7xwBnRxE8EKCN540DLK'

const {pushTemple, etpl} = require('./../services');
const {Notify, EmailNote} = require("../core/core.notify");
const {sendMailWithAttatchment} = require("../services/services.pdfmailer");

// let note = {
//     title: "Debit Alert",
//     body: `Your transfer of NGN${data.data?.amount.toLocaleString()} to ${data.data.full_name} of ${data.data.bank_name} was successful`,
//     channelId: 'channelId'
// };

// Notify(bid, note.title, note.body, etpl.TransactionEmail, `NGN${data.data?.amount.toLocaleString()}`, 0)
let msg =" <span>Someone (hopefully you) tried to delete your Mongoro account on Friday May 19, 2023 at 15:00GMT. You can complete your account deletion with the OTP below:</span>"

EmailNote('jaysage73@gmail.com', 'Sage', msg, etpl.LoginEmail, '')


// sendMailWithAttatchment('jfsage73@gmail.com','New File Mail Test','<h1>Worked</h1>', 'New-mail-1','public/documents/1690224185691-paramount_contract_1_.docx.pdf')