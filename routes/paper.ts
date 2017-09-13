import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import {Request, Response} from 'express';

router.get('/getPaper/:id', async(req : Request, res : Response) => {
    let id = req.params.id;

    let response = await db.paper_repo.getPaper(id);
    res.json(response)
})

export default router


