import * as express from 'express-promise-router';
const router = express();
import items from './items';
import color from './color';
import design from './design';
import font from './font';
import paper from './paper';
import size from './size';
import sendOrder from './sendOrder';
import fileUpload from './fileUpload';
import logout from './logout';


router.use('/items', items);
router.use('/color', color);
router.use('/design', design);
router.use('/font', font);
router.use('/paper', paper);
router.use('/size', size);
router.use('/sendOrder', sendOrder);
router.use('/fileUpload', fileUpload);
router.use('/logout', logout);



export { router };
