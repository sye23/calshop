
import * as express from 'express-promise-router';
const authRouter = express();
import login from './login';
import fileUpload from './fileUpload';

authRouter.use('/login', login);
authRouter.use('/fileUpload', fileUpload)


export { authRouter }

