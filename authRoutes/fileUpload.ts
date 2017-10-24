import * as utils from '../utils/utilFunctions';
import * as express from 'express-promise-router';
const router = express();
import { Request, Response } from 'express';
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'
import * as Loki from 'lokijs'


const DB_NAME = 'db.json';
const COLLECTION_NAME = 'list';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: utils.fileFilter });
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });


router.post('/', upload.single('file'), async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        utils.cleanFolder(UPLOAD_PATH);
        const col = await utils.loadCollection(COLLECTION_NAME, db);
        const data = col.insert(req.file);

        db.saveDatabase();
        res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
    } catch (err) {
        res.sendStatus(400);
    }
})

export default router; 