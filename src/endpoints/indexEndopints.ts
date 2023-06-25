import express from "express";
import authRouter from "./authEndpoints";
import questionRouter from "./questionEndpoints";
import testRouter from "./testEndpoints";

const router: express.Router = express.Router()
router.use('/auth', authRouter);
router.use('/question', questionRouter);
router.use('/test', testRouter);

export default router;