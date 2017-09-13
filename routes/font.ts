import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import {Request, Response} from 'express';

router.get('/getFonts', async(req : Request, res : Response) => {
    let response = await db.font_repo.getFonts();
    res.json(response)
})

export default router