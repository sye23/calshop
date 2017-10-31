import * as utils from '../utils/utilFunctions';
import * as express from 'express-promise-router';
const router = express();
import { Request, Response } from 'express'; 
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';


const routeToPublic = path.join(__dirname, '../uploads');
const maxSize = 5242880;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, routeToPublic)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage: storage ,
                        limits: { fileSize: maxSize }
                        });


router.post('/', upload.array('files', 5), (req: Request, res: Response) => {

    res.json(req.files);
})

export default router; 