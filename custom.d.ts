declare module 'express-promise-router';

declare namespace Express {
   export interface Request {
      userId?: number;
   }
}