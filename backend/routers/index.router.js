import express from 'express'
import userRouter from './userRouter.js';
import bookingRouter from './bookingRouter.js';

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use('/booking', bookingRouter);

export default mainRouter
