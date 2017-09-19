import * as express from 'express-promise-router';
const router = express();
import * as db from '../repo';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserLogin } from '../types/login';

router.post('/', async (req: Request, res: Response) => {
    let loginInfo: UserLogin = req.body.login;
    let login = await db.login_repo.userLogin(loginInfo);
    if(login  === 'error'){
        res.status(403).send('Invalid Login Credentials');
    } else {
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
            phone: login.phone,
            email: login.email
        });
    }
    
        
});

export default router;