import express from "express";
import authRouter from "./authEndpoints";
import questionRouter from "./questionEndpoints";

const router: express.Router = express.Router()
router.use('/auth', authRouter);
router.use('/question', questionRouter);

export default router;