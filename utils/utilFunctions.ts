import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import * as del from 'del';
import * as fs from 'fs'; 
import * as path from 'path';

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

    const directory = path.join(__dirname, '../uploads');

    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    let mailOptions: any = {
        from: process.env.EMAIL_USERNAME,
        to: 'shalomeisenbach@gmail.com',
        subject: `New Order From: ${from}`,
        html: htmlMessage,
        attachments: setAttachments()
    };

    transporter.sendMail(mailOptions, (err : any, info : any) => {
        if (err) {
            console.log(err)
        }
        
    });
    setTimeout(function() {
        clearDir(directory);
    }, 5000);
    return 'sent';
}

let clearDir = (directory: any)=>{
    fs.readdir(directory, (err, files) => {
       if (err) throw err;
       for (const file of files) {
           fs.unlink(path.join(directory, file), err => {
           if (err) throw err;
           });
       }
   })
   
}

let setAttachments = ()=>{
    const directory = path.join(__dirname, '../uploads');
    let fileList = fs.readdirSync(directory);
    let attachment: any = [];

    fileList.map((f:any, index: any)=>{
        attachment.push({   filename: f,
            path: path.join(directory , f)
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


const loadCollection = function (colName: any, db: Loki): Promise<LokiCollection<any>> {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colName) || db.addCollection(colName);
            resolve(_collection);
        })
    });
}
const fileFilter = function (req: any, file: any, cb: any) {

    if (!file.originalname.match(/\.(pdf|xml|xlsx|xlsm|xltx|xltm|csv|txt|doc|docx)$/)) {
        return cb(new Error('Try a different file type'), false);
    }
    cb(null, true);
};


const cleanFolder = function (folderPath: any) {
    // delete files inside folder but not the folder itself
    del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

export {
    sendEmail, 
    createRandomToken, 
    comparePassword, 
    loadCollection, 
    fileFilter, 
    cleanFolder
}