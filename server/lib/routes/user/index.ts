import me from './me';
import express from 'express';
const userRouter = express.Router();

userRouter.get('/me', me);

export { userRouter };
