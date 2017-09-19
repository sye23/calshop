import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import {Request, Response} from 'express';

router.get('/getSize/:id', async(req : Request, res : Response) => {  
    let id = req.params.id;    

    let response = await db.size_repo.getSize(id);
    res.json(response)
})

export default router