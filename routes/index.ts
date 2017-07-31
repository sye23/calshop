import * as express from 'express-promise-router';
const router = express();
import sample from './sample';

router.use('/sample', sample);


export { router };
