import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import {Request, Response} from 'express';

router.get('/getDesigns', async(req : Request, res : Response) => {
    let response = await db.design_repo.getDesigns();
    res.json(response)
})

export default router