import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'

function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, process.env.AUTH_SECRET, (err: any, decoded: any) => {
            if(err) {
                res.status(403).send({error: "Token is no longer valid"});
                return;
            } else {
                req.userId = decoded.userId;
                next();
            }
        });
    } else {
        res.status(403).send({error: "No token"});
    }

}


export {
    checkToken
};