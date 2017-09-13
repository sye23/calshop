import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import {Request, Response} from 'express';

router.get('/getItems', async(req : Request, res : Response) => {
    let response = await db.items_repo.getItems();
    res.json(response)
})

export default router