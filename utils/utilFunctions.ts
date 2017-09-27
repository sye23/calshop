import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

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

function sendEmail(htmlMessage : any, from: any) {
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: 'thecalshop@gmail.com',
        subject: `New Order From: ${from}`,
        html: htmlMessage
    };

    transporter.sendMail(mailOptions, (err : any, info : any) => {
        if (err) {
            console.log(err)
        }
        
    });
    return 'sent';
}

function createRandomToken(amountOfBytes : number) {
    return crypto
        .randomBytes(amountOfBytes)
        .toString('hex');
}

function comparePassword(password: string, enteredPassword: string) {
    return bcrypt.compare(enteredPassword, password);
}

export {sendEmail, createRandomToken, comparePassword}