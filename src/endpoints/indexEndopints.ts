import express from "express";
import authRouter from "./authEndpoints";
import questionRouter from "./questionEndpoints";
import testRouter from "./testEndpoints";
import testLogRouter from "./testLogEndpoints";

const router: express.Router = express.Router()
router.use('/auth', authRouter);
router.use('/question', questionRouter);
router.use('/test', testRouter);
router.use('/testLog', testLogRouter);

export default router;