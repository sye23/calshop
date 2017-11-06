declare module 'express-promise-router';

declare module 'express-cache-controller';

declare module 'find-remove';

declare module 'rimraf';

declare namespace Express {
   export interface Request {
      userId?: number;
   }
}