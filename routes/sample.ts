import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import {Request, Response} from 'express';

router.get('/sample', async(req : Request, res : Response) => {
    let response = await db.sample.getSample(req.id);
    res.json(response)
})

export default router