import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import {Request, Response} from 'express';
import * as findRemoveSync from 'find-remove';
import * as path from 'path';
import * as rimraf from 'rimraf';


router.post('/', async(req : Request, res : Response) => {
    let dir = req.body.path;
    console.log('directory:  ', dir)

    rimraf(dir,()=>console.log('deleted'))
   
    res.json('file deleted')
})

export default router