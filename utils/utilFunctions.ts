import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs'; 
import * as path from 'path';
import * as findRemoveSync from 'find-remove';

function verifyEmail(emailAddress : string, htmlMessage : string) : string {
    let error = 'hello';
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: emailAddress,
        subject: 'verify account',
        html: htmlMessage
    };

    transporter.sendMail(mailOptions, (err : any, info : any) => {
       
        if (err) {}

    });
    if (error) {
        return 'error';
    } else {
        return 'sent';
    }

}

function sendEmail(htmlMessage : any, from: any, path:any) {

    const directory = path;

    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    let mailOptions: any = {
        from: process.env.EMAIL_USERNAME,
        to: 'thecalshop@gmail.com',
        subject: `New Order From: ${from}`,
        html: htmlMessage,
        attachments: setAttachments(directory)
    };

    transporter.sendMail(mailOptions, (err : any, info : any) => {
        if (err) {
        }
        
    });
    setTimeout(function() {
        clearDir(directory);
    }, 3000);
    return 'sent';
}

function sendEmailReceipt(htmlMessage : any, to: any) {
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        let mailOptions: any = {
            from: process.env.EMAIL_USERNAME,
            to: to,
            subject: `Order Confirmation From The Calligraphy Shop`,
            html: htmlMessage,
        };
    
        transporter.sendMail(mailOptions, (err : any, info : any) => {
            if (err) {
            }
            
        });
       
        return 'sent'; 
    }

let clearDir = (directory: any)=>{
    var result = findRemoveSync(directory, {files: ['*.*']});
    
}

let setAttachments = (path:any)=>{
    const directory = path;
    let fileList = fs.readdirSync(directory);
    let attachment: any = [];

    fileList.map((f:any, index: any)=>{
        attachment.push({   filename: f,
            path: directory +'/'+f
        })
    })
      return attachment;  
}


function createRandomToken(amountOfBytes : number) {
    return crypto
        .randomBytes(amountOfBytes)
        .toString('hex');
}

function comparePassword(password: string, enteredPassword: string) {
    return bcrypt.compare(enteredPassword, password);
}


const fileFilter = function (req: any, file: any, cb: any) {

    if (!file.originalname.match(/\.(pdf|xml|xlsx|xlsm|xltx|xltm|csv|txt|doc|docx)$/)) {
        return cb(new Error('Try a different file type'), false);
    }
    cb(null, true);
};



export {
    sendEmail, 
    sendEmailReceipt,
    createRandomToken, 
    comparePassword, 
    fileFilter
}