declare module 'express-promise-router';

declare module 'express-cache-controller';

declare namespace Express {
   export interface Request {
      userId?: number;
   }
}