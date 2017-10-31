
import * as express from 'express-promise-router';
const authRouter = express();
import login from './login';

authRouter.use('/login', login);


export { authRouter }

