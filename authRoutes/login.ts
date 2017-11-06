import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserLogin } from '../types/login';
import * as path from 'path';
import * as tmp from 'tmp';

router.post('/', async (req: Request, res: Response) => {
    let loginInfo: UserLogin = req.body.login;
    let login = await db.login_repo.userLogin(loginInfo);
    if(login  === 'error' || login === undefined){
        res.status(403).send('Invalid Login Credentials');
    } else {
        const routeToPublic = path.join(__dirname, '../uploads');
        
        let tmpobj = tmp.dirSync({ dir:routeToPublic,mode: 0o750, prefix: 'myTmpDir_' });
        let tokenObj = {
            userId: login.id
        };
        const token = jwt.sign(tokenObj, process.env.AUTH_SECRET, {
            expiresIn: "6h"
        });
        res.json({
            success: true,
            token,
            roll: 'user',
            firstName: login.firstName,
            lastName: login.lastName,
            company: login.company,
            phone: login.phone,
            email: login.email,
            userDir: tmpobj.name
        });
    }
    
        
});

export default router; 